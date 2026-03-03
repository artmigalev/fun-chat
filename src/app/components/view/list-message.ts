import { Component } from "../component";
import Message from "@components/message/message";
import { Message as IMassage } from "@/types/interfaces/message.interface";

export class ViewMessages extends Component {
  #item: Component;
  constructor(messages: [] | IMassage[]) {
    super({
      tag: "md-list",
      className: "list-msg",
    });
    this.#item = new Component({
      tag: "md-list-item",
      className: "list-msg-item",
    });

    if (messages.length > 0) {
      const items = this.renderItemsWithMsgs(messages, this.#item);
      this.appendChildren(items);
    } else {
      const span = new Component({
        tag: "span",
        className: "empty-msg",
        text: "Нет сообщений",
      });
      this.append(span);
    }
  }

  renderItemsWithMsgs(msgs: IMassage[], item: Component): Component[] {
    if (msgs.length === 0) console.log("messages empty");
    return msgs.map((message) => {
      item.getNode().innerHTML = "";
      item.append(new Message(message));
      return item;
    });
  }

  renderHistory(history: IMassage[]) {
    if (history.length > 0) {
      this.removeChildren();
      const items = this.renderItemsWithMsgs(history, this.#item);
      this.appendChildren(items);
    }
    return;
  }
}
