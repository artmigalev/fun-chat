import { Component } from "../component";
import Message from "@components/message/message";
import { Message as IMassage } from "@/types/interfaces/message.interface";

export class ViewMessages extends Component {
  constructor(messages: [] | IMassage[]) {
    super({
      tag: "md-list",
      className: "list-msg",
    });

    if (messages.length > 0) {
      this.renderHistory(messages);
    } else {
      const span = new Component({
        tag: "span",
        className: "empty-msg",
        text: "Нет сообщений",
      });
      this.append(span);
    }
  }

  renderHistory(history: IMassage[]) {
    this.removeChildren();
    const items = history.map((message) => {
      const item = new Component({
        tag: "md-list-item",
        className: "list-msg-item",
      });

      item.getNode().innerHTML = "";
      item.append(new Message(message));
      return item;
    });
    this.appendChildren(items);
  }
}
