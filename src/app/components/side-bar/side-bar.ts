import UserService, { UserState } from "@/app/api/services/user.service";
import { Component } from "../component";
import { UserList } from "../users-list/users-list";
import { User } from "@/types/interfaces/user.interface";

export default class SideBar extends Component {
  #userList: UserList;
  #userService: UserService;
  constructor() {
    super({ tag: "aside", className: "side-bar" });

    this.#userService = UserService.getInstance();
    this.#userService.subscribe(this.handleNotify);
    this.#userList = new UserList([]);
    this.append(this.#userList);
  }
  private handleNotify = (state: UserState) => {
    if (!state) this.#userService.unSubscribe(this.handleNotify);
    const clients = [...state.users.unauthorized, ...state.users.authenticated].filter((user) => {
      if (user.isLogined) {
        return user;
      }
      if (!user.isLogined) {
        const isactive = state.users.authenticated.some(
          (activeUSer) => activeUSer.login === user.login,
        );
        if (!isactive) {
          return user;
        }
      }
    });

    const clientsChat = clients.filter((chatUser) => chatUser.login !== state.user?.login);

    const mapUSers = new Map();

    for (const user of clients) {
      mapUSers.set(user.login, user);
    }

    this.render(clientsChat);
  };
  render(users: User[]) {
    this.removeChildren();
    if (users.length === 0) {
      const plug = new Component({
        tag: "span",
        className: "plug",
        text: "No Users",
      });
      this.append(plug);
      return;
    }
    this.#userList.removeChildren();
    this.#userList.updateUsersList(users);
    this.append(this.#userList);
  }
}
