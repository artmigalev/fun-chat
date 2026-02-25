import { User } from "@/types/interfaces/user.interface";
import { Component } from "../component";

export class UserItemComponent extends Component {
  #user: Component;
  #statusComponent: Component;

  constructor(user: User) {
    super({ className: "user-container" });
    this.#user = new Component({ tag: "span", className: "user-name", text: user.login });
    this.#statusComponent = new Component({ className: "user-status" });
    if (user.isLogined) {
      this.#statusComponent.toggleClass("online");
    }
    this.appendChildren([this.#user, this.#statusComponent]);
  }

  // setStatus() {
  //   this.getChild()[1].destroy()
  //   this.#statusComponent.toggleClass("online");
  //   this.append(this.#statusComponent)

  // }
}
