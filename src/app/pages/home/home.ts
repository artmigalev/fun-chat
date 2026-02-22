import { ChatLayout } from "@/app/layouts/chat/chat";
import Router from "@/app/router/router";
import { Component } from "src/app/components/component";
import Header from "src/app/components/header/header";

export default class HomePage extends Component {
    // #header: Header;
    // #chat: ChatLayout;
    #router:Router
    constructor(router:Router) {
        console.log('instanceof home');
        const header = new Header();
        const chat = new ChatLayout();
        super({ className: "home" }, header, chat);

        this.#router =router
        // this.#header = new Header();
        // this.#chat = chat;
    }
}
