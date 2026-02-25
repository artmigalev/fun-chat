import { Component } from "src/app/components/component";
import { Profile } from "../profile/profile";
import logoutBtn from "@assets/svg/logout-icon.svg?raw";
import UserService from "@/app/api/services/user.service";
import { AuthenticationService } from "@/app/api/services/auth.service";
import { UserType } from "@/app/enum/user.enum";
import Router from "@/app/router/router";
import { Routes } from "@/app/enum/routes.enums";
import { User } from "@/types/interfaces/user.interface";

export default class Header extends Component {
  #title: Component;
  #btnLogout: Component;
  #userService: UserService;
  #authService: AuthenticationService;
  #router: Router;

  constructor(user: User | null) {
    const profile = new Profile(user);

    const logout = new Component({ className: "btn-logout" });
    logout.setHTML(logoutBtn);
    logout.getNode().firstElementChild?.setAttribute("height", "100%");
    logout.getNode().firstElementChild?.setAttribute("width", "100%");

    const container = new Component({ className: "header-container" });

    container.append(profile);
    container.append(logout);

    const title = new Component({ tag: "h2", className: "header-title" });

    super({ tag: "header", className: "header" }, title, container);

    this.#authService = AuthenticationService.getInstance();
    this.#userService = UserService.getInstance();
    this.#router = Router.getInstance();
    this.#title = title;
    this.#btnLogout = logout;
    this.#btnLogout.addListener("click", this.logout);
    // this.#profile = profile;

    this.#title.setText("Fun Chat");
  }

  logout = async () => {
    const user = this.#userService.getUser();
    if (user) {
      const response = await this.#authService.logout(user);
      localStorage.clear();
      if (response.type === UserType.USER_LOGOUT) {
        this.#userService.userDestroy();
      }
      this.#router.navigate(Routes.LOGIN);
    }
    localStorage.clear();
    this.#router.navigate(Routes.LOGIN);
  };
}
