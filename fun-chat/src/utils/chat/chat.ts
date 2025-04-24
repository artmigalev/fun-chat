// import { Component } from "@/component/component";
import Message from "../message/message";
import { Component } from "@/component/component";

const chat = {
    tag: "div",
    className: "history-chat",
};

export default class Chat extends Component {
    constructor(msg?: Message) {
        super(chat);
        if (msg) {
            this.append(msg);
        }
    }
    initHistory() {}
}
