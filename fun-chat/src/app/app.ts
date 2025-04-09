import Authorization from "@/pages/Authorization/Authorization";
import Home from "@/pages/home/Home";

export default class App{

  authorization;
  home;
  constructor() {
    this.authorization = new Authorization()
    this.home = new Home()
  }



}