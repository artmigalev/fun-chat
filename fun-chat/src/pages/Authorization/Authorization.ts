import { Component } from "@/component/component";
import { INode, IUser } from "@/interface";
import "./Authorization.scss";
import { connection } from "@/main";
import App from "@/app/app";
import FormAuth from "./form/form";
import Home from "../home/Home";
const authorization: INode = {
    tag: "div",
    className: "auth-page",
};

const title: INode = {
    tag: "h2",
    className: "title",
};

export default class Authorization extends Component {
    view: Component;
    parent: App;
    form: FormAuth;

    constructor(parent: App) {
        super(authorization);
        this.parent = parent;
        this.form = new FormAuth(this);
        this.view = this.getView();
        this.append(this.view);
    }
    getView(): Component {
        const wrapper = new Component({ tag: "div", className: "wrapper" });
        const titleWindow = new Component(title);
        titleWindow.setText("Authorization");
        wrapper.appendChildren([titleWindow, this.form]);

        return wrapper;
    }

    createdUSer(login: string, password: string) {
        const user = {
            id: btoa(login),
            login: login,
            password: password,
            token: btoa(login),
            isLogined: false,
        };

        this.saveToken(user);
        if (connection.OPEN) {
            connection?.addNewUser(user)?.then((isLogined) => {
                if (isLogined) {
                    this.parent.removeChildren();
                    this.parent.user = user;
                    this.parent.append(new Home(this.parent));
                }
            });
        }
    }

    // Метод для сохранения токена
    saveToken(user: IUser) {
        const token = btoa(user.login as string);
        user.token = token;
        localStorage.setItem("authToken", token);
    }
}
