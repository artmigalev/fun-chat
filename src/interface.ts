import { Component } from "./component/component";
import Home from "./pages/home/Home";
import Button from "./utils/buttons/buttons";

export interface INode {
    tag: string;
    className: string;
}
export interface IAttributes {
    [key: string]: string;
}
export type IUser = {
    // login: string;
    // password: string;
    // token: string;
    // isLogined: boolean;
    [key: string]: string | boolean;
};

export interface IHeader {
    view: Component;
    parent: Home;
    user: IUser;
    getView: (user: IUser) => Component;
    getUser: (name: IUser) => Component;
    setHeaderTitle: (node: INode, text: string) => Component;
    createdHeaderBtnExit: () => Button;
}
