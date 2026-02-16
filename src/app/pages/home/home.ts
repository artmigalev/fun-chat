import { ChatLayout } from "@/app/layouts/chat/chat";
import { Component } from "src/app/components/component";
import Header from "src/app/components/header/header";

export default class Home extends Component {
    #header: Header;
    #chat :ChatLayout;

    constructor() {
        const header = new Header();
        const chat = new ChatLayout()
        super({ className: "home" }, header, chat);
        this.#header = new Header();
        this.#chat = chat
    }
}
