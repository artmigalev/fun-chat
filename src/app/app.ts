import { Component } from "./components/component";
import { AuthenticationPage } from "./pages/authentication/auth-page";
// import Home from "./pages/home/home";

export class App extends Component {
    // #home: Home;
    constructor() {
        // const home = new Home();
        const loginPage = new  AuthenticationPage();
        super({ tag: "div", className: "app" },loginPage, );
        // this.#home = home;
    }

    render(page: Component) {
        this.append(page);
    }
}
