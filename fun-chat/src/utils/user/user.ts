import { Component } from "@/component/component";
import { INode } from "@/interface";
import "./user.scss";

const item: INode = {
    tag: "li",
    className: "user",
};
const name: INode = {
    tag: "span",
    className: "user-name",
};

export default class User extends Component {
    name: Component;
    constructor(us: string, status: boolean) {
        super(item);
        this.name = this.getUser(us);
        this.append(this.name);
        this.setStatus(status);
    }
    getUser(userName: string): Component {
        const USER = new Component(name);
        USER.setText(userName);
        return USER;
    }
    setStatus(status: boolean) {
        const statusItem = new Component({
            tag: "span",
            className: "user-status",
        });
        if (status === false) {
            statusItem.toggleClass("user-offline");
        } else {
            statusItem.toggleClass("user-online");
        }
        this.append(statusItem);
    }
}
