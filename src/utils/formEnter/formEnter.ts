import { Component } from "@/component/component";
import { INode } from "@/interface";
import Input from "../inputs/input";
import Message from "../message/message";
import Main from "@/pages/home/main/main";

const form: INode = {
    tag: "form",
    className: "form-input",
};

export default class FormEnter extends Component {
    input: Input;
    parent: Main;
    constructor(parent: Main) {
        super(form);
        this.input = new Input("chat");
        this.input.toggleClass("input-set");
        this.parent = parent;
        this.append(this.input);
        this.addListener("submit", this.msgCreated.bind(this));
    }

    msgCreated(e: Event) {
        e.preventDefault();
        const chat = this.parent.chat;
        const text = this.input.getNode()() as HTMLInputElement;
        const msg = new Message(text.value, "artmigalev", chat);
        text.value = "";
        msg.send();
    }
}
