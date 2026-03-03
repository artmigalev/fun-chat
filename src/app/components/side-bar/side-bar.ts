import UserService, { UserState } from "@/app/api/services/user.service";
import { Component } from "../component";
import { UserList } from "../users-list/users-list";
import {
  User,
} from "@/types/interfaces/user.interface";

export default class SideBar extends Component {
  #userList: UserList;
  #userService: UserService;
  constructor() {
    super({ tag: "aside", className: "side-bar" });

    this.#userService = UserService.getInstance();
    this.#userService.subscribe(this.handleNotify);
    const users = this.#userService.getUsers();
    this.#userList = new UserList(users);
    this.append(this.#userList);
  }
  private handleNotify = (state: UserState) => {
    const clientsChat = state.users.filter((chatUser)=> chatUser.login !== state.user?.login )

    this.render(clientsChat);

  };
  render(users: User[]) {
    this.removeChildren();
    this.#userList.removeChildren();
    this.#userList.updateUsersList(users);
    this.append(this.#userList);
  }
}
