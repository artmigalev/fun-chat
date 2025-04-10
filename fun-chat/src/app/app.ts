import { Component } from "@/component/component";
import { INode } from "@/interface";
import Authorization from "@/pages/Authorization/Authorization";
import Home from "@/pages/home/Home";
import './app.scss'
const app: INode = {
    tag: "div",
    className: "app",
};
export default class App extends Component {
    authorization;
    home;
    constructor() {
        super(app);
        this.authorization = new Authorization();
        this.home = new Home();
        this.append(this.authorization)

    }

    start() {
        document.body.appendChild(this.getNode()());
    }
}
