import { Component } from "@/component/component";
import { INode } from "@/interface";
import "./message.scss";
import Chat from "../chat/chat";

const message: INode = {
    tag: "div",
    className: "msg-container",
};

const text: INode = {
    tag: "span",
    className: "msg-text",
};

export default class Message extends Component {
    parent;
    constructor(str: string, addresser: string, parent: Chat) {
        super(message);
        this.parent = parent;
        this.setAddresser(addresser);
        this.setMessage(str);
        this.parent = parent;
    }
    setMessage(str: string) {
        const msg = new Component(text);
        msg.setText(str);
        this.append(msg);
    }
    setAddresser(str: string) {
        const addresser = new Component({
            tag: "span",
            className: "msg-addresser",
        });
        addresser.setText(str);
        this.append(addresser);
    }
    send() {
        this.parent.append(this);
    }
}
