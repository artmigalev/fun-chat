import { GeneralResponse } from "@/types/interfaces/api.interfaces";
import WS from "./ws";

export type NotifyCallback = (type: GeneralResponse["type"], payload: GeneralResponse["payload"]) => void;

export class NotificationService {
  #listeners: NotifyCallback[] = [];
  static #instance: NotificationService;
  #socket: WS;

  private constructor() {
    this.#socket = WS.getInstance();
    this.#socket.onMessage((data) => {
      if (data) {
        const { type, payload } = data as GeneralResponse;
        this.notifyListener(type, payload);
      }
    });
  }

  static getInstance() {
    if (!NotificationService.#instance) {
      return (NotificationService.#instance = new NotificationService());
    }
    return NotificationService.#instance;
  }
  subscribe(callback: NotifyCallback) {
    this.#listeners.push(callback);
  }
  unSubscribe(callback: NotifyCallback) {
    this.#listeners = this.#listeners.filter((listenerCallback) => listenerCallback !== callback);
  }
  notifyListener(type: GeneralResponse["type"], payload: GeneralResponse["payload"]) {

    for (const callback of this.#listeners) {
      callback(type, payload);
    }
  }
}
