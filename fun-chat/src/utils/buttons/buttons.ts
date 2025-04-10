import { Component } from "@/component/component";
import { INode } from "@/interface";
import './button.scss'
const btn: INode = {
  tag: 'button',
  className:"button"
}

export default class Button extends Component{
  constructor(text:string) {
    super(btn)
    this.setText(text)
  }
}