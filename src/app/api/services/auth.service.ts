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
  static #instance: AuthenticationService;
  static #socket: WS;
  private constructor() {
    if (AuthenticationService.#instance) {
      return AuthenticationService.#instance;
    }

    AuthenticationService.#socket = WS.getInstance();
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
      await this.addUser(JSON.parse(user));
    }
  };

  async addUser<T>(data: User) {
    if (AuthenticationService.#socket.readyState !== AuthenticationService.#socket.OPEN) {
      throw new Error("socked not  connection");
    }
    await AuthenticationService.#socket.sendRequest<T>({
      id: uuidv4(),
      type: UserType.USER_LOGIN,
      payload: {
        user: data,
      },
    });
  }
  async logout(user: User) {
    if (AuthenticationService.#socket.readyState !== AuthenticationService.#socket.OPEN) {
      throw new Error("socket not connection");
    }

    if (!user) throw new Error("User is  undefined");

    await AuthenticationService.#socket.sendRequest<UserLogoutResponse | UserLogoutResponseError>({
      id: uuidv4(),
      type: UserType.USER_LOGOUT,
      payload: {
        user: user,
      },
    });
  }
}
