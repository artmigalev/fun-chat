interface Options {
    tag?: string;
    className?: string;
    text?: string;
    attrs?: Record<string, string>;
    styles?: Record<string, string>;
}

export class Component {
    #node: HTMLElement;
    #childNodes: Component[] = [];

    constructor(options: Options, ...childNodes: Component[]) {
        const { tag = "div", className = "", text, attrs, styles } = options;

        const node: HTMLElement = document.createElement(tag);
        node.className = className;

        if (text) {
            node.textContent = text;
        }
        if (styles) {
            for (const key in styles) {
                node.style.setProperty(key, styles[key]);
            }
        }
        if (attrs) {
            for (const key in attrs) {
                node.setAttribute(key, attrs[key]);
            }
        }
        this.#node = node;

        if (childNodes) {
            this.appendChildren(childNodes);
        }
    }
    getNode(): HTMLElement {
        return this.#node;
    }
    append(child: Component) {
        this.#childNodes.push(child);
        this.#node.append(child.getNode());
    }

    appendChildren(childNodes: Component[]) {
        for (const child of childNodes) {
            this.append(child);
        }
    }
    getChild() {
        return this.#childNodes;
    }
    setHTML(html: string) {
        this.getNode().innerHTML = html;
    }
    setProps(properties: Record<string, unknown>) {
        Object.assign(this, properties);
    }
    setText(content: string) {
        if (this.#node === null) {
            throw new Error("Node is null");
        }
        this.#node.textContent = content;
    }
    toggleClass(className: string) {
        if (this.#node === null) {
            throw new Error("Node is null");
        }
        this.#node.classList.toggle(className);
    }
    setAttributes(attribute: string, value: string) {
        if (this.#node === null) {
            throw new Error("Node is null");
        }
        this.#node.setAttribute(attribute, value);
    }
    destroy() {
        if (this.#node === null) {
            throw new Error("Node is null");
        }
        this.#node.remove();
    }
    removeChildren() {
        for (const child of this.#childNodes) {
            child.destroy();
        }
        this.#childNodes.length = 0;
    }
    remove() {
        this.removeChildren();
    }
    addListener(type: string, listener: (_event: Event) => void, options = false) {
        if (this.#node === null) {
            throw new Error("Node is null");
        } else {
            this.#node.addEventListener(type, listener, options);
        }
    }
    removeListener(event: string, listener: () => void, options = false) {
        if (this.#node === null) {
            throw new Error("Node is null");
        } else {
            this.#node.removeEventListener(event, listener, options);
        }
    }
}
