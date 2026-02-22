import { Component } from "./components/component";
import Router from "./router/router";
// import Home from "./pages/home/home";

export class App extends Component {
    // #home: Home;
    // #user: User
    #router:Router
    constructor() {
        super({ tag: "div", className: "app", attrs:{id : 'app'} } );
        console.log('instance App',);

        this.#router = new Router(this)
        this.#router.navigate('login')
        // this.#home = home;
    }




    render(page: Component) {
        this.append(page);
    }
}
