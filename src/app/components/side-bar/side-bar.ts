import UserService from "@/app/api/services/user.service";
import { Component } from "../component";
import { UserList } from "../users-list/users-list";

export default class SideBar extends Component {
  #userList: UserList;
  #userService:UserService
  constructor() {
    super({ tag: "aside", className: "side-bar" });
    this.#userService = UserService.getInstance()
    const users = this.#userService.getUsers()
    this.#userList = new UserList(users);
    this.append(this.#userList);
  }
}
