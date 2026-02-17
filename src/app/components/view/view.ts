import { IMassage } from "@/types/interfaces";
import { Component } from "../component";
import Message from "@components/message/message";

export class View extends Component {
    // #item: Component;
    constructor(messages: [] | IMassage[]) {
        const item = new Component({
            tag: "md-list-item",
            className: "list-msg-item",
        });
        super(
            {
                tag: "md-list",
                className: "list-msg",
            },
            item,
        );
        // this.#item = item;
        const items = this.renderItemsWithMsgs(messages, item);
        this.appendChildren(items);
    }

    renderItemsWithMsgs(msgs: IMassage[], item: Component): Component[] {
        if (msgs.length === 0) console.log("messages empty");
        return msgs.map((message) => {
            item.getNode().innerHTML = "";
            item.append(new Message(message));
            return item;
        });
    }
}
