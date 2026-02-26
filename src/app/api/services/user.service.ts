import { UserAuth } from "@/app/enum/user-auth.enum";
import WS from "@/app/api/services/ws";
import {
  AllActiveUsersResponse,
  AllInactiveUsersResponse,
  GeneralUsersStatusResponse,
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
  }

  static getInstance() {
    if (!UserService.#instance) {
      UserService.#instance = new UserService();
    }

    return UserService.#instance;
  }

  async init() {
    const users = await this.fetchUsers<User>();
    console.log(users);

    this.#mainUsers = users.filter((user: User) => user.login !== this.#user?.login);
  }
  getUsers(): User[] {
    const mainUser = this.#user;
    return this.#mainUsers.filter((user) => user.login !== mainUser?.login);
  }

  getUser(): User | null {
    return this.#user;
  }
  getUserByUsers(login: User["login"]) {
    return this.#mainUsers.find((user) => user.login === login);
  }

  updateUsers(user: User) {
    const { login } = user;
    if (this.getUserByUsers(login)) {
      const updatedUsers = this.#mainUsers.map((mainUser) => {
        if (mainUser.login === user.login) {
          return {
            ...mainUser,
            isLogined: user.isLogined,
          };

        }
        return mainUser
      });
      this.#mainUsers = [...updatedUsers];
    } else {
      this.#mainUsers.push(user);
    }
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
    console.log("init");

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
    this.#user = { ...userData };
  }
  toggleStatus(status: boolean) {
    if (this.#user) {
      this.#user = { ...this.#user, isLogined: status };
    }
  }
}
