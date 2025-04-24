import { Component } from "@/component/component";
import { INode, IUser } from "@/interface";
import "./Home.scss";
import Header from "./header/header";
import Main from "./main/main";
import Footer from "./footer/foooter";
import App from "@/app/app";
import { connection } from "@/main";
const homePage: INode = {
    tag: "div",
    className: "home-page",
};

export default class Home extends Component {
    public user: IUser;
    protected header: Header;
    protected main: Main;
    protected parent: App;
    footer: Footer;
    constructor( parent: App) {
        super(homePage);
        this.parent = parent;
        this.user = this.parent.user;
        this.header = new Header(this);
        this.main = new Main(this);
        this.footer = new Footer();
        this.getView();
    }
    getView() {
        this.appendChildren([this.header, this.main, this.footer]);
    }
    exit(user: IUser) {
        this.parent.removeChildren();
        if (connection.OPEN) {
            connection.userIsLogout(user)?.then((isLogined) => {
                console.log(isLogined);
            });
        }
        // this.parent.append(new Authorization(this.parent));
    }
}
