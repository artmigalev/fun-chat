import { Component } from "../component";
import IconGit from "@assets/svg/github-brands-solid-full.svg?raw";
export class FooterComponent extends Component {
  #author: string = "artmigalev";
  #gitHubLink: string = "https://github.com/artmigalev";
  #year: string = "2026";

  constructor() {
    super({tag:"footer", className: "footer" });
    const icon = new Component({ className: "git-icon" });
    icon.setHTML(IconGit);
    icon.getNode().firstElementChild?.setAttribute("height", "100%");
    icon.getNode().firstElementChild?.setAttribute("width", "100%");
    const linkGit = new Component({
      tag: "a",
      className: "link-git",
      attrs: { href: this.#gitHubLink },
    });
    linkGit.append(icon);
    this.append(linkGit);
    const author = new Component({ tag: "span", className: "author-name" });
    author.setText(this.#author);
    this.append(author);
    this.append(new Component({ tag: 'span', className: 'year-created' , text:this.#year}))

  }
}
