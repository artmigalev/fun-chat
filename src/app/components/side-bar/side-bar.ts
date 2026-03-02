import UserService from "@/app/api/services/user.service";
import { Component } from "../component";
import { UserList } from "../users-list/users-list";
import { NotificationService } from "@/app/api/services/notyfication.service";
import { UserType } from "@/app/enum/user.enum";
import {
  GeneralUserResponse,
  User,
  UserExternalLoginRequest,
  UserExternalLogoutRequest,
} from "@/types/interfaces/user.interface";

export default class SideBar extends Component {
  #userList: UserList;
  #userService: UserService;
  #notify: NotificationService;
  constructor() {
    super({ tag: "aside", className: "side-bar" });
    

    this.#userService = UserService.getInstance();
    const users = this.#userService.getUsers();
    this.#notify = NotificationService.getInstance();
    this.#notify.subscribe(this.handleNotify);
    this.#userList = new UserList(users);
    this.append(this.#userList);
  }
  private handleNotify = (event: MessageEvent["type"], data: GeneralUserResponse) => {
    let users: User[];
    const { user } = data.payload as
      | UserExternalLoginRequest["payload"]
      | UserExternalLogoutRequest["payload"];
    switch (event) {
      case UserType.USER_EXTERNAL_LOGIN: {
        this.#userService.updateUsers(user);

        users = this.#userService.getUsers();
        console.log(users, user);
        this.render(users);
        break;
      }
      case UserType.USER_EXTERNAL_LOGOUT: {
        this.#userService.updateUsers(user);
        users = this.#userService.getUsers();
        this.render(users);

        break;
      }

      default: {
        break;
      }
    }
  }
  render(users: User[]) {
    this.removeChildren();
    this.#userList.removeChildren();
    this.#userList.updateUsersList(users);
    this.append(this.#userList);
  }
}
