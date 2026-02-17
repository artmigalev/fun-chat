import { Component } from "../component";

export class ControlPanel extends Component {
    // #sendBtn: Component;
    // #textInput: Component;

    constructor() {
        const button = new Component({
            tag: "md-filled-button",
            className: "send-btn-msg",
            text: "Send",
        });

        const textContainer = new Component({
            tag: "md-filled-text-field",
            className: "text-field",
            attrs: {
                label: "Message",
                type: "textarea",
                resize: "vertical",
                rows: "3",
            },
            styles: {},
        });
        textContainer.setProps({});

        super({ tag: "form", className: "panel" }, textContainer, button);
        // this.#sendBtn = btn;
        // this.#textInput = textContainer;
    }
}
