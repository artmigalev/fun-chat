import UserService from "@/app/api/services/user.service";
import { MainComponent } from "@/app/components/main/main-component";
import { FooterComponent } from "@/app/components/footer/footer";
import { Component } from "src/app/components/component";
import { Header } from "src/app/components/header/header";

export default class HomePage extends Component {
  #userService: UserService;
  #header: Header;
  #main: MainComponent;
  #footer: FooterComponent;

  constructor() {
    console.log("instanceof home");
    super({ className: "home" });
    this.#userService = UserService.getInstance();
    const user = this.#userService.getUser();
    this.#header = new Header(user);
    this.#main = new MainComponent();
    this.#footer = new FooterComponent();
    this.appendChildren([this.#header, this.#main, this.#footer]);
  }
}
