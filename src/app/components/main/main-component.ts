import { Component } from "../component";
import SideBar from "../side-bar/side-bar";
import { ChatComponent } from "@/app/layouts/chat/chat";

export class MainComponent extends Component {
  #chat: ChatComponent;
  #users: SideBar;

  constructor() {
    super({ className: "main",  });

    this.#chat = new ChatComponent();
    this.#users = new SideBar();
    this.appendChildren([this.#users, this.#chat]);
    // this.#msg = msg
  }
}
