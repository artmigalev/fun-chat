import { Component } from "./components/component";
import Home from "./pages/home/home";

export class App extends Component {
    // #home: Home;
    constructor() {
        const home = new Home();
        super({ tag: "div", className: "app" }, home);
        // this.#home = home;
    }

    render(page: Component) {
        this.append(page);
    }
}
