import { Component } from "src/app/components/component";
import { Profile } from "../profile/profile";

export default class Header extends Component {
    #title: Component;
    // #profile: Profile;

    constructor() {
        const profile = new Profile(false);
        const title = new Component({ tag: "h2", className: "header-title" });

        super({ tag: "header", className: "header" }, title, profile);
        this.#title = title;
        // this.#profile = profile;

        this.#title.setText("Fun Chat");
    }
}
