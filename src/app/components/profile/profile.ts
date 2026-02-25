import { Component } from "@components/component";
// import userAvatarProfile from "@assets/svg/avatar_profile-user.svg";
import { User } from "@/types/interfaces/user.interface";

export class Profile extends Component {
    // #userService :UserService

    constructor(user: User | null) {
        super({ className: "profile" });
        const name = new Component({ tag: "span", className: "user-name" });
        name.setText(user?.login || 'No Name')

        this.append(name)
    }
}
