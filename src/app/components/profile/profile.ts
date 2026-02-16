import { Component } from "@components/component";
// import userAvatarProfile from "@assets/svg/avatar_profile-user.svg";
import avatarSvg from "@assets/svg/avatar_profile-user.svg?raw";

export class Profile extends Component {
    #avatar = new Component({
        className: "display-avatar",
    });

    constructor(active: boolean) {
        super({ className: "profile" });
        this.#avatar.setHTML(avatarSvg);
        this.#avatar.getNode().firstElementChild?.setAttribute("height", "100%");
        this.#avatar.getNode().firstElementChild?.setAttribute("width", "100%");

        if (active) this.#avatar.getNode().style.color = "var(--md-sys-color-primary)";

        this.appendChildren([this.#avatar]);
    }
}
