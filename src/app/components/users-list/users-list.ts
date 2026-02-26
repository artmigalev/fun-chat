import { Component } from "../component";
import { User } from "@/types/interfaces/user.interface";
import { UserItemComponent } from "../user-item/user-item";

export class UserList extends Component {
  #listItems: Component[];

  constructor(users: User[] = []) {
    super({
      tag: "md-list",
      className: "users-list",
      styles: {
        display: "flex",
        "flex-direction": "column",
        gap: "5px",
      },
    });

    const items = this.generateList(users);
    this.#listItems = items;
    this.appendChildren(this.#listItems);
    // this.#listItems = this.getChild();
  }

  updateUsersList(users: User[]) {
    this.#listItems = this.generateList(users);
    this.removeChildren();
    this.appendChildren(this.#listItems);
  }
  addUserWithUsers(user: Component) {
    this.#listItems = [...this.#listItems, user];
    this.removeChildren();
    this.appendChildren(this.#listItems);
  }

  generateList(users: User[]): Component[] {
    return users.map((user) => {
      const item = new Component({
        tag: "md-list-item",
        className: "user-item",
      });
      item.append(new UserItemComponent(user));
      return item;
    });
  }
}
