import { MessageService, MessageState } from "@/app/api/services/message.service";
import { Component } from "@/app/components/component";
import { ControlPanel } from "@/app/components/panel/control-panel";
import { ViewMessages } from "@/app/components/view/list-message";
import { Message } from "@/types/interfaces/message.interface";

export class ChatComponent extends Component {
  #messageService: MessageService = MessageService.getInstance();

  #historyMessages: Message[] = [];
  #controlPanel: ControlPanel;
  #viewMessages: ViewMessages;

  constructor() {
    super({ className: "chat" });
    this.#historyMessages = this.#messageService.getHistory();
    this.#messageService.subscribe(this.messageHandleUpdate);

    this.#viewMessages = new ViewMessages(this.#historyMessages);
    this.#controlPanel = new ControlPanel();

    this.appendChildren([this.#viewMessages, this.#controlPanel]);
  }

  private messageHandleUpdate = (state: MessageState) => {
    console.log(state);

    this.#historyMessages = state.history;
    this.#viewMessages.renderHistory(this.#historyMessages);
  };
}
