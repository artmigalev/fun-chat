import { Component } from "@/component/component";
import { INode, IUser } from "@/interface";
import User from "../user/user";
import { connection } from "@/main";
import Main from "@/pages/home/main/main";

const list: INode = {
    tag: "ul",
    className: "users-list",
};
export default class UsersGroup extends Component {

    view: Component;
    users: IUser[] ;
    parent: Main;
    constructor(parent: Main) {
        super(list);
        this.view = {} as Component;
        this.users = [];
        this.parent = parent;
        if (connection.OPEN) {
            connection.getUsers("USER_ACTIVE").then((users) => {
                this.users = users;

                connection.getUsers("USER_INACTIVE").then((users) => {

                    this.users.push(...users);

                    this.view = this.getView(this.users);
                });
            })
        } else {
            this.view = this.getView([]);
        }
    }
    getView(users: IUser[] | []): Component {

        if (users.length !== 0) {
            users.forEach((user) => {
                if (user.login === this.parent.user.login) {
                    user = this.parent.user;
                }
                const us = new User(
                    user.login as string,
                    user.isLogined as boolean,
                );
                this.append(us);
            });
        }
        return this;
    }
}
