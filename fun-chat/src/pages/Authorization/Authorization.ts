import { Component } from "@/component/component";
import { IPage } from "@/interface";

const authorization : IPage = {
  tag: 'div',
  className:'athrztn'
}
export default class Authorization extends Component {

  view;

  constructor() {
    super(authorization)
    this.view = this.getView()
  }

  getView() {
    
  }
}