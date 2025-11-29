import "./styles/main.scss";
import WS from "./ws/ws";

const connection = new WS("ws://localhost:4000");
connection.run();

export { connection };
