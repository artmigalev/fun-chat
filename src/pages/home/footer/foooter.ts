import { Component } from "@/component/component";
import logoSchool from "@assets/svg/rss-logo.svg?raw";
import { INode } from "@/interface";
import "@home/styles/footer.scss";
const footer: INode = {
    tag: "footer",
    className: "footer",
};

export default class Footer extends Component {
    constructor() {
        super(footer);
        this.append(this.getView());
    }
    getView(): Component {
        const wrapper = new Component({
            tag: "div",
            className: "footer-wrapper",
        });
        const logo = new Component({ tag: "div", className: "logo" });
        const author = new Component({ tag: "span", className: "author" });
        logo.getNode()().innerHTML = logoSchool;
        author.setText("artmigalev");
        wrapper.appendChildren([author, logo]);
        return wrapper;
    }
}
