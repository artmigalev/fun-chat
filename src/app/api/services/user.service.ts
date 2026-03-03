import { UserAuth } from "@/app/enum/user-auth.enum";
import WS from "@/app/api/services/ws";
import {
  AllActiveUsersResponse,
  AllInactiveUsersResponse,
  GeneralUsersStatusResponse,
} from "@/types/interfaces/auth.unterfaces";
import {
  User,
  UserExternalLoginRequest,
  UserExternalLogoutRequest,
} from "@/types/interfaces/user.interface";
import { v4 as uuidv4 } from "uuid";
import { NotificationService } from "./notyfication.service";
import { UserType } from "@/app/enum/user.enum";
import { GeneralResponse } from "@/types/interfaces/api.interfaces";

export type UserState = {
  user: User | null;
  users: User[];
};
type UserSubscriberCallback = (state: UserState) => void;

export default class UserService {
  static #instance: UserService;
  #user: User | null = null;
  #socket: WS;
  #notify: NotificationService;
  #users: User[] = [];

  #subscribers: UserSubscriberCallback[] = [];

  private constructor() {
    this.#socket = WS.getInstance();
    this.#notify = NotificationService.getInstance();
    this.#notify.subscribe(this.handleNotify);
  }

  static getInstance() {
    if (!UserService.#instance) {
      UserService.#instance = new UserService();
    }

    return UserService.#instance;
  }

  subscribe(callback: UserSubscriberCallback) {
    this.#subscribers.push(callback);
  }
  unSubscribe(callback: UserSubscriberCallback) {
    this.#subscribers = this.#subscribers.filter(
      (listenerCallback) => listenerCallback !== callback,
    );
  }

  private handleNotify = (event: GeneralResponse["type"], data: GeneralResponse) => {
    const { user } = data.payload as
      | UserExternalLoginRequest["payload"]
      | UserExternalLogoutRequest["payload"];

    switch (event) {
      case UserType.USER_LOGIN: {
        this.userSetCredentials(user);
        this.toggleStatus(user.isLogined);
        this.updateUsers(user);
        break;
      }
      case UserType.USER_LOGOUT: {
        this.userDestroy();
        break;
      }

      case UserType.USER_EXTERNAL_LOGIN: {
        this.updateUsers(user);
        break;
      }
      case UserType.USER_EXTERNAL_LOGOUT: {
        this.destroyUserByUsers(user.login);
        break;
      }

      default: {
        break;
      }
    }
    this.notifySubscribers();
  };
  private notifySubscribers = () => {
    const state: UserState = {
      user: this.#user,
      users: this.#users,
    };
    for (const subscriber of this.#subscribers) {
      subscriber(state);
    }
  };
  private updateUsers = (user: User) => {
    this.#users = [...this.#users, user];
  };
  private destroyUserByUsers(login: User["login"]) {
    this.#users = this.#users.filter((user) => user.login !== login);
  }
  async init() {
    const users = await this.fetchUsers<User>();

    this.#users = users.filter((user: User) => user.login !== this.#user?.login);
  }
  getUsers(): User[] {
    return this.#users;
  }

  getUser(): User | null {
    return this.#user;
  }

  async fetchUsers<T>(): Promise<T[]> {
    const allUsers = await Promise.all([
      ...(await this.getAllInactiveUsers<AllInactiveUsersResponse["payload"]["users"]>()),
      ...(await this.getActiveUsers<AllActiveUsersResponse["payload"]["users"]>()),
    ]);
    return allUsers.flat();
  }
  async getAllInactiveUsers<T>(): Promise<T | []> {
    const response = await this.#socket.sendRequest<GeneralUsersStatusResponse>({
      id: uuidv4(),
      type: UserAuth.USER_INACTIVE,
      payload: null,
    });
    const { users } = response.payload;
    return users;
  }

  async getActiveUsers<T>(): Promise<T | []> {
    const response = await this.#socket.sendRequest<GeneralUsersStatusResponse>({
      id: uuidv4(),
      payload: null,
      type: UserAuth.USER_ACTIVE,
    });

    const { users } = response.payload;
    return users;
  }

  userDestroy() {
    this.#user = null;
  }
  userSetCredentials(userData: User) {
    this.#user = { ...this.#user, ...userData };
  }
  toggleStatus(status: boolean) {
    if (this.#user) {
      this.#user = { ...this.#user, isLogined: status };
    }
  }
}
