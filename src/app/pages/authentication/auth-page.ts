import { Component } from "@/app/components/component";
import { User } from "@/types/interfaces/user.interface";
import { TextField } from "@material/web/textfield/internal/text-field";

export class AuthenticationPage extends Component {
    #form: Component;
    #fieldTextUserName: Component;
    #fieldTextUserPassword: Component;

    constructor() {
        const fieldUserName = new Component({
            tag: "md-filled-text-field",
            className: "username",
            attrs: {
                label: "Username",
                type: "text",
                required: "true",
            },
        });
        const fieldUserPassword = new Component({
            tag: "md-filled-text-field",
            className: "password",
            attrs: {
                label: "Password",
                type: "password",
                required:'true',
            },
        });

        const buttonSubmit = new Component({
            tag: "md-filled-button",
            className: "button-form",
            attrs: {
                type: "submit",
            },
            text: "Login",
        });

        const formLogin = new Component({ tag: "form", className: "form-login" });

        super({ tag: "div", className: "auth-page" }, formLogin);

        this.#fieldTextUserName = fieldUserName;
        this.#fieldTextUserPassword = fieldUserPassword;
        this.#form = formLogin;
        this.login.bind(this);
        this.btnListener();

        this.#form.appendChildren([fieldUserName, fieldUserPassword, buttonSubmit]);
    }

    btnListener() {
        this.#form.addListener("submit", this.login);
    }

    login = (event: Event) => {
        event.preventDefault();
        console.log(event);

        const userNameFieldComponent = this.#fieldTextUserName.getNode() as TextField;
        const userPasswordFieldComponent = this.#fieldTextUserPassword.getNode() as TextField;

        const userCredential: User = {
            login: userNameFieldComponent.value || "",
            password: userPasswordFieldComponent.value || "",
      };
      return userCredential
    };
}
