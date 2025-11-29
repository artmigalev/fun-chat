import { Component } from "@/component/component";
import { INode } from "@/interface";
import Button from "@/utils/buttons/buttons";
import Input from "@/utils/inputs/input";
import Authorization from "../Authorization";

const authComp: INode = {
    tag: "form",
    className: "auth-component",
};
const label: INode = {
    tag: "label",
    className: "label",
};
export default class FormAuth extends Component {
    inputLogin: Input;
    inputPassword: Input;
    btnSubmit: Button;
    parent: Authorization;
    constructor(parent: Authorization) {
        super(authComp);
        this.parent = parent;
        this.inputLogin = new Input("username");
        this.inputPassword = new Input("password");
        this.btnSubmit = new Button("submit");
        this.addListener("submit", this.checkingForm.bind(this));
        this.getView();
    }
    getView() {
        const labelLogin = new Component(label);
        labelLogin.setAttributes("for", "name");
        labelLogin.setText("Login");
        labelLogin.append(this.inputLogin);
        const labelPassword = new Component(label);
        labelPassword.setAttributes("for", "pass");
        labelPassword.setText("Password");
        labelPassword.append(this.inputPassword);
        this.appendChildren([labelLogin, labelPassword, this.btnSubmit]);
    }
    checkingForm(e: Event) {
        e.preventDefault();
        const login = this.inputLogin.checkInput();
        const password = this.inputPassword.checkInput();

        this.parent.createdUSer(login, password);
        console.log("created user");
    }
}
