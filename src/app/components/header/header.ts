import { Component } from "src/app/components/component";
import { Profile } from "../profile/profile";
import logoutBtn from "@assets/svg/logout-icon.svg?raw";
import UserService, { UserState } from "@/app/api/services/user.service";
import { AuthenticationService } from "@/app/api/services/auth.service";
import Router from "@/app/router/router";

import { Routes } from "@/app/enum/routes.enums";

export class Header extends Component {
  #title: Component;
  #btnLogout: Component;
  #userService: UserService;
  #authService: AuthenticationService;
  #router: Router;
  #profile: Profile;


  constructor() {
    const logout = new Component({ className: "btn-logout" });
    logout.setHTML(logoutBtn);
    logout.getNode().firstElementChild?.setAttribute("height", "100%");
    logout.getNode().firstElementChild?.setAttribute("width", "100%");

    const container = new Component({ className: "header-container" });
    container.append(logout);

    const title = new Component({ tag: "h2", className: "header-title" });
    super({ tag: "header", className: "header" }, title, container);

    this.#userService = UserService.getInstance();
    this.#authService = AuthenticationService.getInstance();
    this.#userService.subscribe(this.handleUserUpdate);
    this.#router = Router.getInstance();

    this.#title = title;
    this.#btnLogout = logout;
    this.#btnLogout.addListener("click", this.logout);
    this.#profile = new Profile(this.#userService.getUser());
    container.append(this.#profile);

    this.#title.setText("Fun Chat");
  }

  private handleUserUpdate = (state: UserState) => {
    this.#profile.render(state.user);
  };

  logout = async () => {
    const user = this.#userService.getUser();
    if (user) {
      console.log(user);
      
      await this.#authService.logout(user);
      this.#router.navigate(Routes.LOGIN);
    }
  };
}
