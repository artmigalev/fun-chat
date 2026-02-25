import { User } from "@/types/interfaces/user.interface";
import UserService from "./api/services/user.service";
import { Component } from "./components/component";
import Router from "./router/router";
import { Routes } from "./enum/routes.enums";
import { checkingUserWithLS } from "./utils/user.guard";
// import WS from "./ws/ws";
// import Home from "./pages/home/home";

export class App extends Component {
  #router: Router;
  // #socket: WS;
  #user: User | null = null;
  #userService: UserService;
  constructor() {
    super({ tag: "div", className: "app", attrs: { id: "app" } });
    console.log("instance App");
    this.#router = Router.init(this);
    this.#userService = UserService.getInstance();
  }

  async init() {
    await this.#userService.init();
    const id = checkingUserWithLS();
    this.#user = this.#userService.getUser();
    this.loadPage(id);
  }

  loadPage(id: string | null) {
    if (id) {
      this.#router.navigate(Routes.HOME);
    } else {
      this.#router.navigate(Routes.LOGIN);
    }
  }

  render(page: Component) {
    this.append(page);
  }
}
