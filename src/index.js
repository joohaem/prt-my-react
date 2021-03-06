import SnupiReact from "../modules/SnupiReact.js";

// element :: React Element
// node :: DOM element

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
  SnupiReact.createElement("input", null, "bar"),
  SnupiReact.createElement("h2", null, "Hello")
);

{
  /* <div>
      <input onInput={updateValue} value={value} />
      <h2>Hello {value}</h2>
    </div>, */
}

const container = document.getElementById("root");

// ReactDOM.render(element, container);
// -->
// const node = document.createElement(element.type);
// node.title = element.props.title;
// const text = document.createTextNode("");
// text.nodeValue = element.props.children;
// node.appendChild(text);
// container.appendChild(node);

// ----------------------------------------------------------------------

const updateValue = (e) => {
  rerender(e.target.value);
};

const rerender = (value) => {
  SnupiReact.render(element, container);
};

rerender("World");
