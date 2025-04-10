import { Component } from "@/component/component";
import { INode } from "@/interface";
import Input from "@/utils/inputs.ts/input";
import './Authorization.scss'
const authorization: INode = {
    tag: "div",
    className: "auth-page",
};
const authComp: INode = {
    tag: "form",
    className: "auth-component",
};
const title: INode = {
    tag: 'h2',
    className:'title'
}
const compMain: INode = {
    tag: 'div',
    className:'auth-main'
}
const compFooter: INode = {
    tag: 'div',
    className:'auth-footer'
}
const label: INode = {
  tag: 'label',
  className:'labe'}
export default class Authorization extends Component {
    view;

    constructor() {
        super(authorization);
      this.view = this.getView();
      this.append(this.view)
    }

    getView(): Component {
        const authComponent = new Component(authComp , ...[new Component(title),new Component(compMain),new Component(compFooter) ]);

        let [titleComponent,main,footer] = [authComponent.getChild()[0],authComponent.getChild()[1],authComponent.getChild()[2]]
        titleComponent.setText('Login')

        const usernameInput = this.getInputContainer('username')
        const passwordInput = this.getInputContainer('password')


        main.appendChildren([usernameInput, passwordInput])
        footer.append(new Input('submit'))
        authComponent.addListener('submit', (e)=> e?.preventDefault())



        return authComponent;
    }
    getInputContainer(type:string) {
        const container = new Component({ tag: 'div', className: 'container' })
        const labe = new Component(label)
        const input = new Input(type)
        labe.setText(`${type.toUpperCase()}:`)
        labe.setAttributes('for',input.getNode()().id)
        container.appendChildren([labe, input])
        return container;
    }
}
