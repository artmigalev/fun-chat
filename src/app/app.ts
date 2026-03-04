import UserService from "./api/services/user.service";
import { Component } from "./components/component";
import Router from "./router/router";
import { Routes } from "./enum/routes.enums";

export class App extends Component {
  #router: Router;
  #userService: UserService;
  constructor() {
    super({ tag: "div", className: "app", attrs: { id: "app" } });
    this.#router = Router.init(this);
    this.#userService = UserService.getInstance();
  }

  async init() {
    await this.#userService.init();
    this.loadPage();
  }

  loadPage() {

    const user = this.#userService.getUser()
    if (user?.isLogined) {
      this.#router.navigate(Routes.HOME);
    } else {
      this.#router.navigate(Routes.LOGIN);
    }
  }

  render(page: Component) {
    this.append(page);
  }
}
