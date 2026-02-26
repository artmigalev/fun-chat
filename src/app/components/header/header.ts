import { Component } from "src/app/components/component";
import { Profile } from "../profile/profile";
import logoutBtn from "@assets/svg/logout-icon.svg?raw";
import UserService from "@/app/api/services/user.service";
import { AuthenticationService } from "@/app/api/services/auth.service";
import { UserType } from "@/app/enum/user.enum";
import Router from "@/app/router/router";
import { Routes } from "@/app/enum/routes.enums";
import {
  User,
  UserLogoutResponse,
  UserLogoutResponseError,
} from "@/types/interfaces/user.interface";
import { NotificationService } from "@/app/api/services/notyfication.service";

export  class Header extends Component {
  #title: Component;
  #btnLogout: Component;
  #userService: UserService;
  #authService: AuthenticationService;
  #router: Router;
  #notify: NotificationService;

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
    this.#notify = NotificationService.getInstance();
    this.#notify.subscribe(this.handleNotify);
    this.#authService = AuthenticationService.getInstance();
    this.#userService = UserService.getInstance();
    this.#router = Router.getInstance();
    this.#title = title;
    this.#btnLogout = logout;
    this.#btnLogout.addListener("click", this.logout);
    // this.#profile = profile;

    this.#title.setText("Fun Chat");
  }

  private handleNotify = (event: MessageEvent["type"], data: UserLogoutResponse | UserLogoutResponseError) =>  {
    const { user } = data.payload as UserLogoutResponse["payload"];
    const { error } = data.payload as UserLogoutResponseError["payload"];
    switch (event) {
      case UserType.USER_LOGOUT: {
        this.#userService.toggleStatus(user.isLogined);
        this.#router.navigate(Routes.LOGIN);
        break;
      }

      case UserType.ERROR: {
        throw new Error(error);
        break;
      }
      default: {

        break;
      }
    }
  }

  logout = async () => {
    const user = this.#userService.getUser() as User;
    await this.#authService.logout(user);
  };
}
