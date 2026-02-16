import { ChatDisplay } from "@/app/components/chat-display/chat-display";
import { Component } from "@/app/components/component";
import { ControlPanel } from "@/app/components/panel/controlPanel";

export class ChatLayout extends Component {
    #controlPanel: ControlPanel;
    #display: ChatDisplay;

    constructor() {
        const panel = new ControlPanel();
        const display = new ChatDisplay();
        super({ className: "chat-layout" }, display, panel);
        this.#controlPanel = panel;
        this.#display = display;
    }
}
