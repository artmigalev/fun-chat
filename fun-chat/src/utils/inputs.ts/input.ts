import { Component } from "@/component/component";
import { IAttributes, INode } from "@/interface";
import './inputs.scss'
const input: INode = {
  tag: 'input',
  className:''
}

 const loginAttributes = {
  type: "text",
  id:"name",
  name:"name",
  // required:'true',
  // minlength:"3",
  // maxlength:"16",
   size: "10",
  // pattern: "[a-zA-Z0-9]{3,16}",
  title:"4 to 8 lowercase letters",
}
const passwordAttributes = {
  type: "password",
  id:"pass",
  name:"password",
  // required:'true',
  // minlength: "8",
  // maxlength:"16",
  // pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z0-9]{8,16}$",
  title:" must contain Latin uppercase and lowercase letters как правильно 4 to 8 lowercase letters ",
  size:"10"
}
const submit = {
  type : "submit",
  value : "Sign in"
}

export default class Input extends Component{

  constructor(str:string) {
    super(input)
    if (str === 'username') {
      this.getInputType(loginAttributes)
    }
    if (str === 'password') {
      this.getInputType(passwordAttributes)
    }
    if (str === 'submit') {
      this.getInputType(submit)

    }
  }


  getInputType(attrs:IAttributes) {
    const arrayAttrs = Object.keys(attrs)
    arrayAttrs.forEach(attr => this.setAttributes(attr, attrs[attr]))
  }

}