import { Component } from "@/component/component";
import { IPage } from "@/interface";


const homePage: IPage = {
  tag: 'div',
  className:'home'
}



export default class Home extends Component{
  view;
  constructor() {
    super(homePage)
    this.view = getView()
  }


  getView() {
    
  }
}