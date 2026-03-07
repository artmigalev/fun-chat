import { TextField } from "@material/web/textfield/internal/text-field";
import { Component } from "../component";
import { MessageService } from "@/app/api/services/message.service";
import UserService from "@/app/api/services/user.service";
// import { User } from "@/types/interfaces/user.interface";

export class ControlPanel extends Component {
  #messageService: MessageService;
  #userService: UserService;
  #sendBtn: Component;
  #textInput: Component;

  constructor() {
    const button = new Component({
      tag: "md-filled-button",
      className: "send-btn-msg",
      text: "Send",
      attrs: { type: "submit" },
    });

    const textContainer = new Component({
      tag: "md-filled-text-field",
      className: "text-field",
      attrs: {
        label: "Message",
        type: "textarea",
        resize: "vertical",
        rows: "3",
      },
      styles: {},
    });
    textContainer.setProps({});

    super({ tag: "form", className: "panel" }, textContainer, button);
    this.#messageService = MessageService.getInstance();
    this.#userService = UserService.getInstance();
    this.#sendBtn = button;
    this.#textInput = textContainer;
    this.addListener("submit", this.handleSubmit);
  }

  handleSubmit = async (event: Event) => {
    event.stopPropagation();
    event.preventDefault();
    const activeRoom = this.#userService.getActiveRoom();
    if (activeRoom) {
      
      const textAria = this.#textInput.getNode() as TextField;

      this.#messageService.sendingMessageByUser(textAria.value, activeRoom);
    }

    this.removeListener("click", this.handleSubmit);
  };
}
