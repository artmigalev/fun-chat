import { Component } from "../component";
import { UserList } from "../users-list/users-list";

export default class SideBar extends Component {
    #userList: UserList;

    constructor() {
        super({ tag: "aside", className: "side-bar" });
        this.#userList = new UserList(["Tom", "Jon"]);
        this.append(this.#userList);
    }
}
