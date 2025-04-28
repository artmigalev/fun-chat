import App from "@/app/app";
import { IUser } from "@/interface";

export default class WS extends WebSocket {
    constructor(str: string) {
        super(str);
    }
    run() {
        this.onopen = () => {
            const app = new App();
            app.start();

            this.addEventListener("message", (e: MessageEvent) => {
                const serverResponse = JSON.parse(e.data);
                const { type, payload } = serverResponse;
                switch (type) {
                    case "USER_EXTERNAL_LOGIN":
                        alert("USER_EXTERNAL_LOGIN");
                        break;
                    case "USER_EXTERNAL_LOGOUT":
                        alert("USER_EXTERNAL_LOGOUT");
                        break;
                    case "MSG_SEND":
                        alert("MSG_SEND");
                        break;
                    default:
                        break;
                }
            });
        };
    }
    async getUsers(status: string): Promise<[] | IUser[]> {
        if (this.OPEN) {
            const message = {
                id: "",
                type: `${status}`,
                payload: null,
            };

            this.send(JSON.stringify(message));

            return new Promise((resolve, reject) => {
                this.addEventListener("message", (e: MessageEvent) => {
                    try {
                        const { data } = e;
                        const users = JSON.parse(data).payload.users;
                        resolve(users);
                    } catch (error) {
                        reject(error);
                    }
                });

                this.onerror = (error) => {
                    reject(error);
                };
            });
        } else {
            throw new Error("WebSocket is not open");
        }
    }
    getInActiveUsers(): IUser[] | [] {
        let usersInactive: [] = [];
        if (this.OPEN) {
            this.getUsers("USER_INACTIVE").then((users) => console.log(users));
        }
        console.log(usersInactive);
        return usersInactive;
    }
    addNewUser(user: IUser) {
        if (this.OPEN) {
            const msg = {
                id: btoa(user.login as string),
                type: "USER_LOGIN",
                payload: {
                    user: {
                        login: user.login,
                        password: user.password,
                    },
                },
            };
            this.send(JSON.stringify(msg));
            return new Promise((resolve, reject) => {
                this.addEventListener("message", (e: MessageEvent) => {
                    console.log(e.data);
                    try {
                        const { isLogined } = JSON.parse(e.data).payload.user;

                        resolve(isLogined);
                    } catch (error) {
                        reject(error);
                    }
                });
            });
        }
        return;
    }

    userIsLogout(user: IUser) {
        if (this.OPEN) {
            console.log(user, "logout");
            const message = {
                id: `${user.login} - ${new Date().toISOString()}`,
                type: "USER_LOGOUT",
                payload: {
                    user: {
                        login: user.login,
                        password: user.password,
                    },
                },
            };
            this.send(JSON.stringify(message));
            return new Promise((resolve, reject) => {
                this.addEventListener("message", (e: MessageEvent) => {
                    console.log(e.data);
                });
            });
        }
    }
    userAuthenticated(user: IUser) {
        // проверка на авторизацию
        if (this.OPEN) {
            const message = {
                id: user.id,
                type: "USER_LOGIN",
                payload: {
                    user: {
                        login: user.login,
                        password: user.password,
                    },
                },
            };
            this.send(JSON.stringify(message));
            return new Promise((resolve, reject) => {
                this.addEventListener("message", (e: MessageEvent) => {
                    try {
                        const { data } = e;
                        const isLogined =
                            JSON.parse(data).payload.user.isLogined;
                        resolve(isLogined);
                    } catch (error) {
                        reject(error);
                    }
                });

                this.onerror = (error) => {
                    reject(error);
                };
            });
        }
    }
    userLogouted(user: IUser) {
        // пользователь вышел из системы
        if (this.OPEN) {
            const message = {
                id: user.id,
                type: "USER_LOGOUT",
                payload: {
                    user: {
                        login: user.string,
                        password: user.password,
                    },
                },
            };
            this.send(JSON.stringify(message));
            return new Promise((resolve, reject) => {
                this.addEventListener("message", (e: MessageEvent) => {
                    try {
                        const { isLogined } = e.data.payload.user;
                        resolve(isLogined);
                    } catch (error) {
                        reject(error);
                    }
                });
            });
        }
    }
    getAllAuthenticatedUsers() {
        // получение всех авторизованных пользователей
        return this.getUsers("USER_ACTIVE").then((users) => console.log(users));
    }
    getAllUnauthorizedUsers() {
        // получение всех не авторизованных пользователей
        return this.getUsers("USER_INACTIVE").then((users) =>
            console.log(users),
        );
    }
    sendingMessageToUser(user: IUser, string: string) {
        // отправка сообщения
        const message = {
            id: user.id,
            type: "MSG_SEND",
            payload: {
                message: {
                    to: user.login,
                    text: string,
                },
            },
        };
        this.send(JSON.stringify(message));
        return new Promise((resolve, reject) => {
            this.addEventListener("message", (e: MessageEvent) => {
                try {
                    const { data } = e;

                    resolve(data);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }
    async fetchingMessageHistoryWithUser(user: IUser) {
        // получение истории сообщений
        const message = {
            id: user.id,
            type: "MSG_FROM_USER",
            payload: {
                user: {
                    login: user.login,
                },
            },
        };
        this.send(JSON.stringify(message));
        const history = await new Promise((resolve, reject) => {
            this.addEventListener("message", (e: MessageEvent) => {
                try {
                    const { data } = e;
                    const { messages } = JSON.parse(data).payload;
                    resolve(message);
                } catch (error) {
                    reject(error);
                }
            });
        });
        return history;
    }
}
