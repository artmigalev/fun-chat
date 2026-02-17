import { App } from "./app/app";
import "@material/web/textfield/filled-text-field.js";
import "@material/web/button/filled-button.js";
import "@material/web/field/filled-field.js";
import "@material/web/list/list-item.js";
import "@material/web/list/list.js";

const app = new App();
document.body.append(app.getNode());
