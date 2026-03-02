import { AuthenticationService } from "@/app/api/services/auth.service";
import UserService from "@/app/api/services/user.service";
import { Component } from "@/app/components/component";
import { UserType } from "@/app/enum/user.enum";
import Router from "@/app/router/router";
import { loginValidator } from "@/app/utils/validator";
import { User, UserAuthResponse, UserAuthResponseErrors } from "@/types/interfaces/user.interface";
import { TextField } from "@material/web/textfield/internal/text-field";

export class AuthenticationPage extends Component {
  #authService: AuthenticationService;
  #userService: UserService;
  #form: Component;
  #fieldTextUserName: Component;
  #fieldTextUserPassword: Component;

  #router: Router;
  constructor(router: Router) {
    console.log("instance login-page");

    const fieldUserName = new Component({
      tag: "md-filled-text-field",
      className: "username",
      attrs: {
        label: "Username",
        type: "text",
        required: "true",
        minlength: "3",
        maxlength: "8",
      },
    });
    const fieldUserPassword = new Component({
      tag: "md-filled-text-field",
      className: "password",
      attrs: {
        label: "Password",
        type: "password",
        required: "true",
        minlength: "3",
        maxlength: "16",
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
    this.#router = router;
    this.#userService = UserService.getInstance();
    this.#authService = AuthenticationService.getInstance();
    this.#fieldTextUserName = fieldUserName;
    this.#fieldTextUserPassword = fieldUserPassword;
    this.#form = formLogin;
    this.btnListener();

    this.#form.appendChildren([fieldUserName, fieldUserPassword, buttonSubmit]);
  }

  btnListener() {
    this.#form.addListener("submit", this.login);
  }

  login = async (event: Event) => {
    event.preventDefault();

    const userNameFieldComponent = this.#fieldTextUserName.getNode() as TextField;
    const userPasswordFieldComponent = this.#fieldTextUserPassword.getNode() as TextField;

    const userCredential: User = {
      login: userNameFieldComponent.value || "",
      password: userPasswordFieldComponent.value || "",
    };

    const valid = loginValidator(userCredential);
    if (valid) {
      const response = await this.#authService.addUser<UserAuthResponse | UserAuthResponseErrors>(
        userCredential,
      );

      if (response.type === UserType.ERROR) {
        userNameFieldComponent.error = true;
        userNameFieldComponent.errorText = response.payload.error;
      }
      if (response.type === UserType.USER_LOGIN) {
        this.#router.navigate("home");
      }
      this.#form.removeListener("submit", this.login);
      // console.log(response);
    }
  };
}
