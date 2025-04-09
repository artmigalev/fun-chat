export type Nodes = { tag:string, className:string };

export class Component {
    private node: null | HTMLElement = null;
    private childNodes: Array<Component> = [];
    constructor(
        { tag = "div", className = "" }: Nodes,
        ...childNodes: Component[]
    ) {
        const node: HTMLElement = document.createElement(tag);
        node.className = className;

        this.node = node;

        if (childNodes) {
            this.appendChildren(childNodes);
        }
    }
    getNode(): () => HTMLElement {
        return () => {
            if (this.node === null) {
                throw new Error("Node is null");
            }
            return this.node;
        };
    }
    append(child: Component) {
        if (this.node === null) {
            throw new Error("Node is null");
        } else {
            this.childNodes.push(child);
            this.node.append(child.getNode()());
        }
    }

    appendChildren(childNodes: Component[]) {
        childNodes.forEach((el: Component) => {
            this.append(el);
        });
    }
    getChild() {
        return this.childNodes;
    }
    setText(content: string) {
        if (this.node === null) {
            throw new Error("Node is null");
        }
        this.node.textContent = content;
    }
    toggleClass(className: string) {
        if (this.node === null) {
            throw new Error("Node is null");
        }
        this.node.classList.toggle(className);
    }
    setAttributes(attr: string, val: string) {
        if (this.node === null) {
            throw new Error("Node is null");
        }
        this.node.setAttribute(attr, val);
    }
    destroy() {
        if (this.node === null) {
            throw new Error("Node is null");
        }
        this.node.remove();
    }
    removeChildren() {
        this.childNodes.forEach((child) => {
            child.destroy();
        });
        this.childNodes.length = 0;
    }
    remove() {
        this.removeChildren();
    }
    addListener(
        event: string,
        listener: (event?: Event) => void,
        options = false,
    ) {
        if (this.node === null) {
            throw new Error("Node is null");
        } else {
            this.node.addEventListener(event, listener, options);
        }
    }
    removeListener(event: string, listener: () => void, options = false) {
        if (this.node === null) {
            throw new Error("Node is null");
        } else {
            this.node.removeEventListener(event, listener, options);
        }
    }
}
