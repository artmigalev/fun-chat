// import App from "@/app/app";
// import { IUser } from "@/interface";

import { GeneralRequest, GeneralResponse } from "@/types/interfaces/api.interfaces";

// export default class WS extends WebSocket {
//     constructor(string_: string) {
//         super(string_);
//     }
//     run() {
//         this.addEventListener('open', () => {
//             if (this.OPEN) {
//                 const app = new App(this);
//                 app.start();

//                 this.addEventListener("message", (event: MessageEvent) => {
//                     const serverResponse = JSON.parse(event.data);
//                     const { type } = serverResponse;
//                     switch (type) {
//                         case "USER_EXTERNAL_LOGIN": {
//                             alert("USER_EXTERNAL_LOGIN");
//                             break;
//                         }
//                         case "USER_EXTERNAL_LOGOUT": {
//                             alert("USER_EXTERNAL_LOGOUT");
//                             break;
//                         }
//                         case "MSG_SEND": {
//                             alert("MSG_SEND");
//                             break;
//                         }
//                         default: {
//                             break;
//                         }
//                     }
//                 });
//             } else {
//                 throw new Error("WebSocket is not open");
//             }
//         });
//         this.onerror = (error) => {
//             console.log(error);
//         }
//     }
//     async getUsers(status: string): Promise<[] | IUser[]> {
//         if (this.OPEN) {
//             const message = {
//                 id: "",
//                 type: `${status}`,
//                 payload: null,
//             };

//             this.send(JSON.stringify(message));

//             return new Promise((resolve, reject) => {
//                 this.addEventListener("message", (e: MessageEvent) => {
//                     try {
//                         const { data } = e;
//                         const users = JSON.parse(data).payload.users;
//                         resolve(users);
//                     } catch (error) {
//                         reject(error);
//                     }
//                 });

//                 this.onerror = (error) => {
//                     reject(error);
//                 };
//             });
//         } else {
//             throw new Error("WebSocket is not open");
//         }
//     }
//     getInActiveUsers(): IUser[] | [] {
//         const usersInactive: [] = [];
//         if (this.OPEN) {
//             this.getUsers("USER_INACTIVE").then((users) => console.log(users));
//         }
//         console.log(usersInactive);
//         return usersInactive;
//     }
//     addNewUser(user: IUser) {
//         if (this.OPEN) {
//             const message = {
//                 id: btoa(user.login as string),
//                 type: "USER_LOGIN",
//                 payload: {
//                     user: {
//                         login: user.login,
//                         password: user.password,
//                     },
//                 },
//             };
//             this.send(JSON.stringify(message));
//             return new Promise((resolve, reject) => {
//                 this.addEventListener("message", (e: MessageEvent) => {
//                     console.log(e.data);
//                     try {
//                         const { isLogined } = JSON.parse(e.data).payload.user;

//                         resolve(isLogined);
//                     } catch (error) {
//                         reject(error);
//                     }
//                 });
//             });
//         }
//         return;
//     }

//     userIsLogout(user: IUser) {
//         if (this.OPEN) {
//             console.log(user, "logout");
//             const message = {
//                 id: `${user.login} - ${new Date().toISOString()}`,
//                 type: "USER_LOGOUT",
//                 payload: {
//                     user: {
//                         login: user.login,
//                         password: user.password,
//                     },
//                 },
//             };
//             this.send(JSON.stringify(message));
//             return new Promise((resolve, reject) => {
//                 this.addEventListener("message", (e: MessageEvent) => {
//                     console.log(e.data);
//                 });
//             });
//         }
//     }
//     userAuthenticated(user: IUser) {
//         // проверка на авторизацию
//         if (this.OPEN) {
//             const message = {
//                 id: user.id,
//                 type: "USER_LOGIN",
//                 payload: {
//                     user: {
//                         login: user.login,
//                         password: user.password,
//                     },
//                 },
//             };
//             this.send(JSON.stringify(message));
//             return new Promise((resolve, reject) => {
//                 this.addEventListener("message", (e: MessageEvent) => {
//                     try {
//                         const { data } = e;
//                         const isLogined =
//                             JSON.parse(data).payload.user.isLogined;
//                         resolve(isLogined);
//                     } catch (error) {
//                         reject(error);
//                     }
//                 });

//                 this.onerror = (error) => {
//                     reject(error);
//                 };
//             });
//         }
//     }
//     userLogouted(user: IUser) {
//         // пользователь вышел из системы
//         if (this.OPEN) {
//             const message = {
//                 id: user.id,
//                 type: "USER_LOGOUT",
//                 payload: {
//                     user: {
//                         login: user.string,
//                         password: user.password,
//                     },
//                 },
//             };
//             this.send(JSON.stringify(message));
//             return new Promise((resolve, reject) => {
//                 this.addEventListener("message", (e: MessageEvent) => {
//                     try {
//                         const { isLogined } = e.data.payload.user;
//                         resolve(isLogined);
//                     } catch (error) {
//                         reject(error);
//                     }
//                 });
//             });
//         }
//     }
//     getAllAuthenticatedUsers() {
//         // получение всех авторизованных пользователей
//         return this.getUsers("USER_ACTIVE").then((users) => console.log(users));
//     }
//     getAllUnauthorizedUsers() {
//         // получение всех не авторизованных пользователей
//         return this.getUsers("USER_INACTIVE").then((users) =>
//             console.log(users),
//         );
//     }
//     sendingMessageToUser(user: IUser, string: string) {
//         // отправка сообщения
//         const message = {
//             id: user.id,
//             type: "MSG_SEND",
//             payload: {
//                 message: {
//                     to: user.login,
//                     text: string,
//                 },
//             },
//         };
//         this.send(JSON.stringify(message));
//         return new Promise((resolve, reject) => {
//             this.addEventListener("message", (e: MessageEvent) => {
//                 try {
//                     const { data } = e;

//                     resolve(data);
//                 } catch (error) {
//                     reject(error);
//                 }
//             });
//         });
//     }
//     async fetchingMessageHistoryWithUser(user: IUser) {
//         // получение истории сообщений
//         const message = {
//             id: user.id,
//             type: "MSG_FROM_USER",
//             payload: {
//                 user: {
//                     login: user.login,
//                 },
//             },
//         };
//         this.send(JSON.stringify(message));
//         const history = await new Promise((resolve, reject) => {
//             this.addEventListener("message", (e: MessageEvent) => {
//                 try {
//                     const { data } = e;
//                     const { messages } = JSON.parse(data).payload;
//                     resolve(message);
//                 } catch (error) {
//                     reject(error);
//                 }
//             });
//         });
//         return history;
//     }
// }

export default class WS extends WebSocket {
  #listener: Map<string, (value: unknown) => void> = new Map();
  static #instance: WS;
  static readonly WS_URI = "ws://localhost:4000/fun-chat/";

  private constructor() {
    console.log("instance - WS");

    super(WS.WS_URI);
    WS.#instance = this;
    this.addEventListener("open", (event) => {
      console.log(event);
      this.listener();
    });
  }

  static getInstance() {
    if (!WS.#instance) {
      WS.#instance = new WS();
    }
    return WS.#instance;
  }

  waitForOpen() {
    if (this.readyState === this.OPEN) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      this.addEventListener("open", (event) => resolve(event), { once: true });
    });
  }

  async sendRequest<T>(request: GeneralRequest): Promise<T> {
    return new Promise<T>((resolve) => {
      this.#listener.set(request.id, resolve as (value: unknown) => void);
      this.send(JSON.stringify(request));
    });
  }

  onMessage(callback: (data: GeneralResponse) => void) {
    this.addEventListener("message", (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      callback(data);
    });
  }
  listener() {
    this.addEventListener("message", (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      const resolvedFn = this.#listener.get(data.id!);
      console.log(this.#listener);

      if (data.id && resolvedFn) {
        resolvedFn(data);
        this.#listener.delete(data.id);
      }
    });
  }
}
