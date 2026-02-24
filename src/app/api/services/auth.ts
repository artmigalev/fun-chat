// import WS from "@/app/ws/ws";
import { UserType } from "@/app/enum/user.enum";
import WS from "@/app/ws/ws";
import { User, UserAuthResponse, UserAuthResponseErrors } from "@/types/interfaces/user.interface";
import { v4 as uuidv4 } from "uuid";
import UserService from "./user.service";

export class AuthenticationService {
    static #socket: WS;
    static #instance: AuthenticationService;
    #userService: UserService;

    constructor() {
        this.#userService = UserService.getInstance();
        console.log("instance - AuthenticationService");
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

    async addUser(data: User): Promise<UserAuthResponse | UserAuthResponseErrors> {
        let response;
        if (AuthenticationService.#socket.readyState === AuthenticationService.#socket.OPEN) {
            response = await AuthenticationService.#socket.sendRequest<
                UserAuthResponse | UserAuthResponseErrors
            >({
                id: uuidv4(),
                type: UserType.USER_LOGIN,
                payload: {
                    user: data,
                },
            });
            if (response.type == UserType.USER_LOGIN) {
                this.#userService.userSetCredentials(response.payload.user, response.id);
            }
            return response;
        }
        throw new Error("socked not  connection");
    }
}
