// element :: React Element
// node :: DOM element

// const element = <h1 title="foo">Hello</h1>;
// JSX -> JS by build tools like Babel
// const element = React.createElement("h1", { title: "foo" }, "Hello");
const element = {
  type: "h1",
  props: {
    title: "foo",
    children: "Hello",
  },
};

const container = document.getElementById("root");

// ReactDOM.render(element, container);
const node = document.createElement(element.type);
node.title = element.props.title;
const text = document.createTextNode("");
text.nodeValue = element.props.children;
node.appendChild(text);
container.appendChild(node);
