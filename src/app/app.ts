import { Component } from "./components/component";
import Home from "./pages/home/home";

export class App extends Component {
    constructor() {
        super({ tag: "div", className: "app" }, new Home());
    }
}
