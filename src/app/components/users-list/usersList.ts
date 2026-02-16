import { Component } from "../component";

export class UserList extends Component {
    #listItems: Component[];

    constructor(users: string[] = []) {
        super({
            tag: "md-list",
            className: "users-list",
            styles: {
                display: "flex",
                "flex-direction": "column",
                gap: "5px",
            },
        });

        const items = this.generateList(users);
        this.appendChildren(items);
        this.#listItems = this.getChild();
    }

    generateList(users: string[]): Component[] {
        return users.map((user) => {
            const item = new Component({
                tag: "md-list-item",
                className: "user-item",
               
            });
            item.setText(user);
            return item;
        });
    }
}
