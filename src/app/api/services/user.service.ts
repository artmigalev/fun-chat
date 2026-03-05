import { UserAuth } from "@/app/enum/user-auth.enum";
import WS from "@/app/api/services/ws";
import { GeneralUsersStatusResponse } from "@/types/interfaces/auth.interface";
import { User } from "@/types/interfaces/user.interface";
import { v4 as uuidv4 } from "uuid";
import { NotificationService } from "./notification.service";
import { UserType } from "@/app/enum/user.enum";
import { GeneralResponse } from "@/types/interfaces/api.interfaces";

export type UserState = {
  room: User["login"] | null;
  user: User | null;
  users: {
    unauthorized: User[];
    authenticated: User[];
  };
};
type UserSubscriberCallback = (state: UserState) => void;

export default class UserService {
  static #instance: UserService;
  #socket: WS;
  #notify: NotificationService;
  #state: UserState = {
    room: null,
    user: null,
    users: {
      unauthorized: [],
      authenticated: [],
    },
  };

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

  private handleNotify = async (
    type: GeneralResponse["type"],
    payload: GeneralResponse["payload"],
  ) => {
    switch (type) {
      case UserType.USER_LOGIN: {
        if ("user" in payload) {
          const { user } = payload;
          this.userSetCredentials(user);
          this.toggleStatus(user.isLogined);
          await this.fetchUsers();
        }
        break;
      }
      case UserType.USER_LOGOUT: {
        this.userDestroy();

        break;
      }

      case UserType.USER_EXTERNAL_LOGIN: {
        await this.fetchUsers();
        break;
      }
      case UserType.USER_EXTERNAL_LOGOUT: {
        await this.fetchUsers();

        break;
      }
      case UserAuth.USER_ACTIVE: {
        if ("users" in payload) {
          const { users } = payload;
          this.#state.users.authenticated = users;
        }
        break;
      }

      case UserAuth.USER_INACTIVE: {
        if ("users" in payload) {
          const { users } = payload;
          this.#state.users.unauthorized = users;
        }
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
      user: this.#state.user,
      users: this.#state.users,
      room: this.#state.user?.login || null,
    };
    for (const subscriber of this.#subscribers) {
      subscriber(state);
    }
  };

  activateRoom(login?: string) {
    const { unauthorized } = this.#state.users;
    if (login) {
      this.#state.room = login;
    }
    if (unauthorized.length > 0) this.#state.room = unauthorized[0].login;
  }
  async init() {
    await this.fetchUsers();
  }
  getUsersType(type: "USER_ACTIVE" | "USER_INACTIVE"): User[] {
    switch (type) {
      case "USER_ACTIVE": {
        return this.#state.users.authenticated;
      }
      case "USER_INACTIVE": {
        return this.#state.users.unauthorized;
      }
    }
  }
  getAllUsers() {
    return [...this.#state.users.authenticated, ...this.#state.users.unauthorized];
  }

  getUser(): User | null {
    return this.#state.user;
  }
  getActiveRoom(): UserState["room"] {
    return this.#state.room;
  }

  async fetchUsers() {
    await this.getAllInactiveUsers();
    await this.getActiveUsers();
  }
  async getAllInactiveUsers() {
    await this.#socket.sendRequest<GeneralUsersStatusResponse>({
      id: uuidv4(),
      type: UserAuth.USER_INACTIVE,
      payload: null,
    });
  }

  async getActiveUsers() {
    await this.#socket.sendRequest<GeneralUsersStatusResponse>({
      id: uuidv4(),
      payload: null,
      type: UserAuth.USER_ACTIVE,
    });
  }

  userDestroy() {
    this.#state.user = null;
  }
  userSetCredentials(userData: User) {
    this.#state.user = { ...userData };
  }
  toggleStatus(status: boolean) {
    if (this.#state.user) {
      this.#state.user = { ...this.#state.user, isLogined: status };
    }
  }
}
