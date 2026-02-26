import WS from "./ws";

type NotifyCallback = (event: MessageEvent["type"], data: MessageEvent["data"]) => void;

export class NotificationService {
  #listeners: NotifyCallback[] = [];
  static #instance: NotificationService;
  #socket: WS;

  private constructor() {
    this.#socket = WS.getInstance();
    this.#socket.onMessage((data) => {
      if (data.type) {
        this.notifyListener(data.type, data);
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
  notifyListener(event: MessageEvent["type"], data: MessageEvent["data"]) {
    for (const clbk of this.#listeners) {
      clbk(event, data);
    }
  }
}
