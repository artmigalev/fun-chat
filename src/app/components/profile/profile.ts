import { Component } from "@components/component";
// import userAvatarProfile from "@assets/svg/avatar_profile-user.svg";
import { User } from "@/types/interfaces/user.interface";

export class Profile extends Component {
  // #userService :UserService

  constructor(user: User | null) {
    super({ className: "profile" });
    this.render(user);
  }

  render(user: User | null) {
    this.removeChildren();
    const name = new Component({ tag: "span", className: "user-name" });

    if (user) {
      name.setText(user.login);
    } else {
      name.setText("No Name");
    }
    this.append(name);
  }
}
