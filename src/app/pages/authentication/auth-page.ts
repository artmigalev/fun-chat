import { AuthenticationService } from "@/app/api/services/auth.service";
import UserService, { UserState } from "@/app/api/services/user.service";
import { Component } from "@/app/components/component";
import { UserType } from "@/app/enum/user.enum";
import Router from "@/app/router/router";
import { loginValidator } from "@/app/utils/validator";
import { UserAuthResponse, UserAuthResponseErrors } from "@/types/interfaces/user.interface";
import { TextField } from "@material/web/textfield/internal/text-field";

export class AuthenticationPage extends Component {
  #authService: AuthenticationService;
  #userService: UserService;
  #form: Component;
  #fieldTextUserName: Component;
  #fieldTextUserPassword: Component;

  #router: Router;
  constructor(router: Router) {
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
    this.#userService.subscribe(this.handleUserLogin);
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
  handleUserLogin = (state: UserState) => {
    const { user } = state;

    if (user && user.isLogined) {
      const user = this.getUserCredential();
      this.#userService.userSetCredentials(user);
      this.#router.navigate("home");
    }
  };

  getUserCredential() {
    const name = this.#fieldTextUserName.getNode() as TextField;
    const password = this.#fieldTextUserPassword.getNode() as TextField;
    return {
      login: name.value || "",
      password: password.value || "",
    };
  }

  showError(status: boolean, text: string) {
    const user = this.#fieldTextUserName.getNode() as TextField;
    user.error = status;
    user.errorText = text;
  }

  login = async (event: Event) => {
    event.preventDefault();

    const userCredential = this.getUserCredential();

    const valid = loginValidator(userCredential);
    if (valid) {
      const response = await this.#authService.addUser<UserAuthResponse | UserAuthResponseErrors>(
        userCredential,
      );

      if (response.type === UserType.ERROR) {
        this.showError(true, response.payload.error);
        return;
      }

      this.#form.removeListener("submit", this.login);
      // console.log(response);
    }
  };
}
