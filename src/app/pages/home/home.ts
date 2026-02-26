import UserService from "@/app/api/services/user.service";
import { FooterComponent } from "@/app/components/footer/footer";
import { ChatLayout } from "@/app/layouts/chat/chat";
import { Component } from "src/app/components/component";
import {Header} from "src/app/components/header/header";

export default class HomePage extends Component {
  #userService: UserService;
  #header: Header;
  #chat: ChatLayout;
  #footer: FooterComponent;

  constructor() {
    console.log("instanceof home");
    super({ className: "home" });
    this.#userService = UserService.getInstance();
    const user = this.#userService.getUser();
    this.#header = new Header(user);
    this.#chat = new ChatLayout();
    this.#footer = new FooterComponent();
    this.appendChildren([this.#header, this.#chat, this.#footer]);
  }
}
