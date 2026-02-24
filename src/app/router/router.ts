import { App } from "../app";
import { Component } from "../components/component";
import { AuthenticationPage } from "../pages/authentication/auth-page";
import HomePage from "../pages/home/home";

const routes: { [key: string]: (router:Router) => HomePage | AuthenticationPage } = {
    home: (router:Router) => new HomePage(router),
    login: (router) => new AuthenticationPage(router),
};


export default class Router   {
    #routes = routes;
    #app: App
    #history: History
     baseUri='fun-chat'
    constructor(app:App) {
        // console.log("instance router");
        this.#app = app
        this.#history = history




    }
    navigate(route: string, parent?: Component) {
        console.log('navigate');


        const lazyLoadPage = this.#routes[route];

        if (lazyLoadPage) {
            const page = lazyLoadPage(this);
            if (parent) {
                parent.append(page);
            } else {
                this.#app.removeChildren()
                this.#app.append(page)
            }
        }
        this.#history.pushState({},'',`/${this.baseUri}/${route}`)



    }
    redirect(route: string) {
        // globalThis.location.replace(`/${this.baseUri}/${route}`);
        this.navigate(route)
    }
}
