import { MsgType } from "@/app/enum/message.enum";
import {
  Message,
  MessageHistoryFromUserResponse,
  MessageHistoryFromUserResponseError,
  MessageSendUserResponse,
} from "@/types/interfaces/message.interface";
import { User } from "@/types/interfaces/user.interface";
import { v4 as uuidv4 } from "uuid";
import WS from "./ws";
import { GeneralRequest, GeneralResponse } from "@/types/interfaces/api.interfaces";
import UserService from "./user.service";
import { NotificationService } from "./notyfication.service";

export type MessageState = {
  message: Message | null;
  history: Message[];
};

type MessageClbk = (state: MessageState) => void;

export class MessageService {
  static #instance: MessageService;
  #socket: WS;
  #userService: UserService;
  #notify: NotificationService;

  #state: MessageState = {
    message: null,
    history: [],
  };

  #subscribers: MessageClbk[] = [];

  private constructor() {
    this.#userService = UserService.getInstance();
    this.#socket = WS.getInstance();
    this.#notify = NotificationService.getInstance();
    this.#notify.subscribe(this.handleNotify);
    this.init();
  }

  private init() {
    const user = this.#userService.getUser();
    if (user) this.getHistoryByUser();
  }

  static getInstance() {
    if (!MessageService.#instance) {
      MessageService.#instance = new MessageService();
    }
    return MessageService.#instance;
  }
  subscribe(callback: MessageClbk) {
    this.#subscribers.push(callback);
  }
  unsubscribe(callback: MessageClbk) {
    this.#subscribers = this.#subscribers.filter(
      (listenerCallback) => listenerCallback !== callback,
    );
  }

  notifySubscribers() {
    const state = this.#state;
    for (const subscriber of this.#subscribers) {
      subscriber(state);
    }
  }

  private handleNotify = (event: GeneralResponse["type"], data: GeneralResponse["payload"]) => {
    switch (event) {
      case MsgType.MSG_SEND: {
        const { message } = data as MessageSendUserResponse["payload"];
        this.addToHistory(message);

        break;
      }

      // case "MSG_EDIT":
      // case "MSG_DELETE":
      // case "MSG_COUNT_NOT_READED_FROM_USER":
      case MsgType.MSG_FROM_USER: {
        const { messages } = data as MessageHistoryFromUserResponse["payload"];

        this.updateHistory(messages);

        break;
      }
      // case "MSG_READ":
      default: {
        break;
      }
    }

    this.notifySubscribers();
  };

  // changedStatusMessage
  addToHistory(message: Message) {
    this.#state.history.push(message);
  }

  updateHistory(history: Message[]) {
    this.#state.history = [...history];
  }

  getHistory() {
    return this.#state.history;
  }
  private async getHistoryByUser() {
    const user = this.#userService.getUser();

    if (!user) throw new Error("User not found");

    const request = {
      id: uuidv4(),
      type: MsgType.MSG_FROM_USER,
      payload: {
        user: {
          login: user?.login,
        },
      },
    };

    const response = await this.#socket.sendRequest<
      MessageHistoryFromUserResponse | MessageHistoryFromUserResponseError
    >(request);
    if (response.type === MsgType.ERROR) {
      // throw new Error(response.payload.error);
    }
    if (response.type === MsgType.MSG_FROM_USER) {
      this.#state.history = response.payload.messages;
    }
  }

  async sendingMessageByUser(text: Message["text"], userLogin: User["login"]) {
    const message: GeneralRequest = {
      id: uuidv4(),
      type: MsgType.MSG_SEND,
      payload: {
        message: {
          to: userLogin,
          text,
        },
      },
    };

    await this.#socket.sendRequest(message);
  }
}
