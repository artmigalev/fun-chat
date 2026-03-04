// import WS from "@/app/ws/ws";
import { UserType } from "@/app/enum/user.enum";
import WS from "@/app/api/services/ws";
import {
  User,
  UserLogoutResponse,
  UserLogoutResponseError,
} from "@/types/interfaces/user.interface";
import { v4 as uuidv4 } from "uuid";

export class AuthenticationService {
  static #socket: WS;
  static #instance: AuthenticationService;

  private constructor() {
    if (AuthenticationService.#instance) {
      return AuthenticationService.#instance;
    }

    AuthenticationService.#socket = WS.getInstance();
    AuthenticationService.#instance = this;
  }

  static getInstance() {
    if (!AuthenticationService.#instance) {
      AuthenticationService.#instance = new AuthenticationService();
    }
    return AuthenticationService.#instance;
  }

  loggedUserByLS = async () => {
    const user = localStorage.getItem(UserType.LOGGED_USER);
    if (user) {
      await this.addUser<User>(JSON.parse(user));
    }
  };

  async addUser<T>(data: User): Promise<T> {
    let response;
    if (AuthenticationService.#socket.readyState === AuthenticationService.#socket.OPEN) {
      response = await AuthenticationService.#socket.sendRequest<T>({
        id: uuidv4(),
        type: UserType.USER_LOGIN,
        payload: {
          user: data,
        },
      });

      return response;
    }
    throw new Error("socked not  connection");
  }
  async logout(data: User): Promise<UserLogoutResponse | UserLogoutResponseError> {
    let response;
    if (AuthenticationService.#socket.readyState === AuthenticationService.#socket.OPEN) {
      response = await AuthenticationService.#socket.sendRequest<
        UserLogoutResponse | UserLogoutResponseError
      >({
        id: uuidv4(),
        type: UserType.USER_LOGOUT,
        payload: {
          user: data,
        },
      });
      return response;
    }
    throw new Error("socket not connection");
  }
}
