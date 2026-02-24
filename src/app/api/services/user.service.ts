import { UserAuth } from "@/app/enum/user-auth.enum";
import { checkingUserWithLS } from "@/app/utils/user.guard";
import WS from "@/app/ws/ws";
import { AllActiveUsersResponse } from "@/types/interfaces/auth.unterfaces";
import { User } from "@/types/interfaces/user.interface";
import { v4 as uuidv4 } from "uuid";

export default class UserService {
    static #instance: UserService;
    #id: string | null = null;
    #user: User | null = null;
    #socket: WS;

    #activeUsers = [];

    constructor() {
        console.log("instance UserService");

        this.#socket = WS.getInstance();
        if (UserService.#instance) {
            return UserService.#instance;
        }
        this.#activeUsers = [];
        UserService.#instance = this;
    }

    static getInstance() {
        if (!UserService.#instance) {
            UserService.#instance = new UserService();
        }

        return UserService.#instance;
    }

    async init() {
        this.#id = checkingUserWithLS();
        const users = await this.getActiveUsers();

        if (users.length > 0) {
            this.#activeUsers = [...users]
        }
    }
    getUserId() {
        return this.#id
    }
    getUser() : User | null {
        return this.#user
    }

    async getActiveUsers() : Promise<[]> {
        console.log("init");

        const response = await this.#socket.sendRequest<AllActiveUsersResponse>({
            id: uuidv4(),
            payload: null,
            type: UserAuth.USER_ACTIVE,
        });
        console.log(response);

       const {users}= response.payload
        return users
    }



    userSetCredentials(userData: User, id: string) {
        this.#id = id;
        this.#user = { ...userData };
    }
}
