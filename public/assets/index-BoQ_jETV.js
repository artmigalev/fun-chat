var h = Object.defineProperty;
var a = (n, e, o) =>
  e in n ? h(n, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (n[e] = o);
var i = (n, e, o) => a(n, typeof e != "symbol" ? e + "" : e, o);
(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) r(t);
  new MutationObserver((t) => {
    for (const s of t)
      if (s.type === "childList")
        for (const l of s.addedNodes) l.tagName === "LINK" && l.rel === "modulepreload" && r(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(t) {
    const s = {};
    return (
      t.integrity && (s.integrity = t.integrity),
      t.referrerPolicy && (s.referrerPolicy = t.referrerPolicy),
      t.crossOrigin === "use-credentials"
        ? (s.credentials = "include")
        : t.crossOrigin === "anonymous"
          ? (s.credentials = "omit")
          : (s.credentials = "same-origin"),
      s
    );
  }
  function r(t) {
    if (t.ep) return;
    t.ep = !0;
    const s = o(t);
    fetch(t.href, s);
  }
})();
class d {
  constructor({ tag: e = "div", className: o = "" }, ...r) {
    i(this, "node", null);
    i(this, "childNodes", []);
    const t = document.createElement(e);
    ((t.className = o), (this.node = t), r && this.appendChildren(r));
  }
  getNode() {
    return () => {
      if (this.node === null) throw new Error("Node is null");
      return this.node;
    };
  }
  append(e) {
    if (this.node === null) throw new Error("Node is null");
    (this.childNodes.push(e), this.node.append(e.getNode()()));
  }
  appendChildren(e) {
    e.forEach((o) => {
      this.append(o);
    });
  }
  getChild() {
    return this.childNodes;
  }
  setText(e) {
    if (this.node === null) throw new Error("Node is null");
    this.node.textContent = e;
  }
  toggleClass(e) {
    if (this.node === null) throw new Error("Node is null");
    this.node.classList.toggle(e);
  }
  setAttributes(e, o) {
    if (this.node === null) throw new Error("Node is null");
    this.node.setAttribute(e, o);
  }
  destroy() {
    if (this.node === null) throw new Error("Node is null");
    this.node.remove();
  }
  removeChildren() {
    (this.childNodes.forEach((e) => {
      e.destroy();
    }),
      (this.childNodes.length = 0));
  }
  remove() {
    this.removeChildren();
  }
  addListener(e, o, r = !1) {
    if (this.node === null) throw new Error("Node is null");
    this.node.addEventListener(e, o, r);
  }
  removeListener(e, o, r = !1) {
    if (this.node === null) throw new Error("Node is null");
    this.node.removeEventListener(e, o, r);
  }
}
const u = { tag: "div", className: "auth-page" },
  c = { tag: "div", className: "auth-component" };
class p extends d {
  constructor() {
    super(u);
    i(this, "view");
    ((this.view = this.getView()), this.append(this.view));
  }
  getView() {
    return new d(c);
  }
}
const f = { tag: "div", className: "home" };
class m extends d {
  constructor() {
    super(f);
    i(this, "view");
    this.view = this.getView();
  }
  getView() {}
}
const w = { tag: "div", className: "app" };
class g extends d {
  constructor() {
    super(w);
    i(this, "authorization");
    i(this, "home");
    ((this.authorization = new p()), (this.home = new m()));
  }
  start() {
    document.body.appendChild(this.getNode()());
  }
}
const N = new g();
N.start();
//# sourceMappingURL=index-BoQ_jETV.js.map
