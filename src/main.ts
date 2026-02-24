import "./mat-color-generate/colors-generate";
// import { App } from "./app/app";
import "@material/web/textfield/filled-text-field.js";
import "@material/web/button/filled-button.js";
import "@material/web/field/filled-field.js";
import "@material/web/list/list-item.js";
import "@material/web/list/list.js";
import WS from "./app/ws/ws";
import { App } from "./app/app";

const ws = WS.getInstance();
await ws.waitForOpen()

const app = new App();
const appNode = app.getNode()
document.body.append(appNode);

await app.init()


