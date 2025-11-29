import { Component } from "@/component/component";
import { IAttributes, INode } from "@/interface";
import "./inputs.scss";
const input: INode = {
    tag: "input",
    className: "",
};

const loginAttributes = {
    type: "text",
    id: "name",
    name: "name",
    required: "true",
    minlength: "3",
    maxlength: "16",
    size: "10",
    pattern: "[a-zA-Z0-9]{3,16}",
    title: "4 to 8 lowercase letters",
};
const passwordAttributes = {
    type: "text",
    id: "pass",
    name: "password",
    required: "true",
    minlength: "8",
    maxlength: "16",
    pattern: "[a-zA-Z0-9]{8,16}",
    // pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z0-9]{8,16}$",
    title: " must contain Latin uppercase and lowercase letters  8 to 8 16 lowercase letters ",
    size: "10",
};
const submit = {
    type: "submit",
    value: "Sign in",
};
const inputChat = {
    type: "text",
    placeholder: "Type your message here",
};

export default class Input extends Component {
    constructor(str: string) {
        super(input);
        switch (str) {
            case "username":
                this.getInputType(loginAttributes);
                break;
            case "password":
                this.getInputType(passwordAttributes);
                break;
            case "submit":
                this.getInputType(submit);
                break;
            case "chat":
                this.getInputType(inputChat);
                this.addListener("input", this.checkInput);
                break;
        }
    }

    getInputType(attrs: IAttributes) {
        const arrayAttrs = Object.keys(attrs);
        arrayAttrs.forEach((attr) => this.setAttributes(attr, attrs[attr]));
    }
    checkInput(): string {
        const input = this.getNode()() as HTMLInputElement;

        return input.value;
    }
}
