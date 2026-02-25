import { Component } from "../component";
import SideBar from "../side-bar/side-bar";
import { View } from "@components/view/view";
import { mockMessages } from "@/app/data/data";

export class ChatDisplay extends Component {
  #view: View;
  #sideBar: SideBar;

  constructor() {
    super({ className: "view-container", styles: { display: "flex" } });
    this.#sideBar = new SideBar();
    this.#view = new View(mockMessages);
    this.appendChildren([this.#sideBar, this.#view]);
    // this.#msg = msg
  }
}
