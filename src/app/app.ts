import { Component } from "@/component/component";
import { INode, IUser } from "@/interface";
import Authorization from "@/pages/Authorization/Authorization";
import Home from "@/pages/home/Home";
import "./app.scss";
import { connection } from "@/main";
import WS from "@/ws/ws";
const app: INode = {
    tag: "div",
    className: "app",
};
export default class App extends Component {
    user: IUser;
    connection: WS;
    constructor(connection: WS) {
        super(app);
        this.user = Object.create({});
        this.connection = connection;
    }

    start() {
        if (connection.OPEN) {
            const isAuthenticated = this.checkAuthenticated();

            if (isAuthenticated) {
                const user: IUser = {
                    login: this.getLoginFromToken(),
                    isLogined: true,
                };
                this.user = user;
                this.removeChildren();
                this.append(new Home(this));
            } else {
                this.removeChildren();
                this.append(new Authorization(this));
            }
            document.body.appendChild(this.getNode()());
        }
    }
    checkAuthenticated() {
        const token = localStorage.getItem("authToken");
        return token;
    }
    getLoginFromToken(): string {
        const token = localStorage.getItem("authToken");
        return token ? atob(token) : "null"; // Декодируем токен, чтобы получить login
    }
}
