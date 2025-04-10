import { Component } from "@/component/component";
import { INode } from "@/interface";

const homePage: INode = {
    tag: "div",
    className: "home",
};

export default class Home extends Component {
    view;
    constructor() {
        super(homePage);
        this.view = this.getView();
    }

    getView() {}
}
