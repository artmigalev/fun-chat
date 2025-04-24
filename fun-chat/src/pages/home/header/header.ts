import { Component } from "@/component/component";
import Button from "@/utils/buttons/buttons";
import { IHeader, INode, IUser } from "@/interface";
import Home from "../Home";
import "../styles/header.scss";

const header = {
    node: {
        tag: "header",
        className: "header-chat",
    },
    wrapper: {
        node: {
            tag: "div",
            className: "header-wrapper",
        },
        child: [
            {
                tag: "span",
                className: "user-name",
            },
            {
                tag: "h2",
                className: "header-title",
            },
        ],
    },
};

export default class Header extends Component implements IHeader {
    view: Component;
    parent: Home;
    user: IUser;
    constructor( parent: Home) {
        super(header.node);
        this.parent = parent;
        this.user = this.parent.user;
        this.view = this.getView(this.user);
        this.append(this.view);
    }
    getView(user: IUser) {
        const nodeWrapper = header.wrapper.node;
        const nodeTitle = header.wrapper.child[0];
        const wrapper = new Component(nodeWrapper);
        const userName = this.getUser(user);
        const title = this.setHeaderTitle(nodeTitle, "fun-Chat");
        const btnExit = this.createdHeaderBtnExit();
        wrapper.appendChildren([userName, title, btnExit]);
        return wrapper;
    }

    getUser(user: IUser ) {
        const nameUSer = new Component({ tag: "span", className: "user-name" });
        if ('login' in user && typeof user.login === "string" ) {

            nameUSer.setText(user.login);
        }
        return nameUSer;
    }
    setHeaderTitle(node: INode, text: string) {
        const title = new Component(node);
        title.setText(text);
        return title;
    }
    createdHeaderBtnExit() {
        const btnExit = new Button("EXIT");
        btnExit.addListener("click", () => {
            this.parent.exit(this.parent.user);
        });
        btnExit.toggleClass("header-btn");
        return btnExit;
    }
}
