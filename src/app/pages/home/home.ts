import UserService from "@/app/api/services/user.service";
import { ChatLayout } from "@/app/layouts/chat/chat";
import { Component } from "src/app/components/component";
import Header from "src/app/components/header/header";

export default class HomePage extends Component {
    #header: Header;
    #chat: ChatLayout;
    #userService: UserService

    constructor() {
        console.log('instanceof home');
        super({ className: "home" });
        this.#userService = UserService.getInstance()
        const user = this.#userService.getUser()
        this.#header = new Header(user)
        this.#chat = new ChatLayout()
        this.appendChildren([this.#header,this.#chat])


    }
}
