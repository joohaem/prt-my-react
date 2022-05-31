// element :: React Element
// node :: DOM element

// /modules/SnupiReact
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

const SnupiReact = {
  createElement,
};

// ----------------------------------------------------------------------

// tell Babel,
// when babel transpiles the JSX, it'll use the function we define
// /** @jsx SnupiReact.createElement */
// const element = (
//   <div id="foo">
//     <a>bar</a>
//     <b />
//   </div>
// );
// JSX -> JS by build tools like Babel
const element = SnupiReact.createElement(
  "div",
  { id: "foo" },
  SnupiReact.createElement("a", null, "bar"),
  SnupiReact.createElement("b")
);

console.log(element);

// ----------------------------------------------------------------------

const container = document.getElementById("root");

// ReactDOM.render(element, container);
const node = document.createElement(element.type);
node.title = element.props.title;
const text = document.createTextNode("");
text.nodeValue = element.props.children;
node.appendChild(text);
container.appendChild(node);
