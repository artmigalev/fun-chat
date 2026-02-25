import { UserAuth } from "@/app/enum/user-auth.enum";
import WS from "@/app/ws/ws";
import {
  AllActiveUsersResponse,
  AllInactiveUsersResponse,
} from "@/types/interfaces/auth.unterfaces";
import { User } from "@/types/interfaces/user.interface";
import { v4 as uuidv4 } from "uuid";

export default class UserService {
  static #instance: UserService;
  #user: User | null = null;
  #socket: WS;

  #mainUsers: User[] = [];

  private constructor() {
    console.log("instance UserService");

    this.#socket = WS.getInstance();

    this.#mainUsers = [];
    UserService.#instance = this;
  }

  static getInstance() {
    if (!UserService.#instance) {
      UserService.#instance = new UserService();
    }

    return UserService.#instance;
  }

  async init() {
    const { payload } = await this.getAllRegisteredUsers<AllInactiveUsersResponse>();

    if (this.#user) {
      this.#mainUsers = payload.users.filter((user: User) => user.login !== this.#user?.login);
    } else if (!this.#user) {
      this.#mainUsers = payload.users;
    }
  }
  getUsers(): User[] {
    return this.#mainUsers;
  }
  getUser(): User | null {
    return this.#user;
  }

  async getAllRegisteredUsers<T>(): Promise<T> {
    const response = await this.#socket.sendRequest<T>({
      id: uuidv4(),
      type: UserAuth.USER_INACTIVE,
      payload: null,
    });

    return response;
  }

  async getActiveUsers(): Promise<AllActiveUsersResponse["payload"]["users"]> {
    console.log("init");

    const response = await this.#socket.sendRequest<AllActiveUsersResponse>({
      id: uuidv4(),
      payload: null,
      type: UserAuth.USER_ACTIVE,
    });
    console.log(response);

    const { users } = response.payload;
    return users;
  }

  userDestroy() {
    this.#user = null;
  }
  userSetCredentials(userData: User) {
    this.#user = { ...userData };
  }
}
