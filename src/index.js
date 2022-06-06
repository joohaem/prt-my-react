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

// SnupiReact.render(
//   <div>
//     <h1>
//       <p />
//       <a />
//     </h1>
//     <h2 />
//   </div>,
//   container
// )
