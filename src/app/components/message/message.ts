import { IMassage } from "@/types/interfaces";
import { Component } from "../component";

export default class Message extends Component {
  // #id: string;
  #title: Component;
  #textContent: Component;
  #datetime: Component;
  // #status: Component;

  constructor(data: IMassage) {
    const title = new Component({
      tag: "h5",
      className: "title-from",
    });
    const textContent = new Component({ tag: "p", className: "text-msg" });
    const dateTime = new Component({
      tag: "span",
      className: "date",
    });

    super({ className: "msg" }, title, textContent, dateTime);
    this.#title = title;
    this.#textContent = textContent;
    this.#datetime = dateTime;

    const { from, text, datetime } = data;
    // this.#id = id;
    this.#title.setText(from);
    this.#textContent.setText(text);
    this.#datetime.setText(datetime.toString());
  }
}
