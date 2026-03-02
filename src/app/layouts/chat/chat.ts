import { MessageService } from "@/app/api/services/message.service";
import { NotificationService } from "@/app/api/services/notyfication.service";
import UserService from "@/app/api/services/user.service";
import { Component } from "@/app/components/component";
import { ControlPanel } from "@/app/components/panel/control-panel";
import { ViewMessages } from "@/app/components/view/list-message";

export class ChatComponent extends Component {
  #notify: NotificationService = NotificationService.getInstance();
  #userService: UserService = UserService.getInstance();
  #messageService: MessageService = MessageService.getInstance();

  #historyMessages: [] = [];
  #controlPanel: ControlPanel;
  #viewMessages: ViewMessages;

  constructor() {
    super({ className: "chat" });
    this.#historyMessages = this.#messageService.getHistory();
    this.#viewMessages = new ViewMessages([]);
    this.#controlPanel = new ControlPanel();

    this.appendChildren([this.#viewMessages, this.#controlPanel]);

    // this.#notify.subscribe(this.handleNotify);
  }

  // private handleNotify = (event: MessageEvent['type'], data: MessageEvent['data']) => {

  //   switch (event) {
  //     case MsgType.MSG_SEND: {
  //       break;
  //     }
  //     case "user": {

  //     }
  //   }
  // }
}
