import { Component } from "@/component/component";
import { INode, IUser } from "@/interface";
import { connection } from "@/main";
import Chat from "@/utils/chat/chat";
import FormEnter from "@/utils/formEnter/formEnter";
import UsersGroup from "@/utils/users/usersGroup";
import "../styles/main.scss";
import Home from "../Home";

const main: INode = {
    tag: "main",
    className: "main",
};

export default class Main extends Component {
    view: Component;
    chat: Chat;
    userGroup: UsersGroup;
    form: FormEnter;
    parent: Home;
    user: IUser;
    constructor(parent: Home) {
        super(main);
        this.parent = parent;
        this.user = this.parent.user;
        this.chat = new Chat();
        this.userGroup = new UsersGroup(this);
        this.form = new FormEnter(this);
        this.view = this.getView();
        this.appendChildren([this.view, this.form]);
    }
    getView(): Component {
        const wrapper = new Component({ tag: "div", className: "wrapper" });
        wrapper.appendChildren([this.userGroup, this.chat]);
        this.append(wrapper);
        return wrapper;
    }
}
