import { MsgType } from "@/app/enum/message.enum";
import {
  Message,
  MessageHistoryFromUserResponse,
  MessageHistoryFromUserResponseError,
} from "@/types/interfaces/message.interface";
import { User } from "@/types/interfaces/user.interface";
import { v4 as uuidv4 } from "uuid";
import WS from "./ws";
import { GeneralRequest } from "@/types/interfaces/api.interfaces";
import UserService from "./user.service";

export class MessageService {
  static #instance: MessageService;
  #socket: WS;
  // #notificationService: NotificationService;
  #userService: UserService;

  #historyMessages: [] = [];
  // #errorMessages: [] = [];

  private constructor() {
    this.#socket = WS.getInstance();
    // this.#notificationService = NotificationService.getInstance()
    this.#userService = UserService.getInstance();
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
  getHistory() {
    return this.#historyMessages;
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
      this.#historyMessages = response.payload.messages;
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
