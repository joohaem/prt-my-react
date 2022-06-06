// const element = React.createElement(
//   "div", --> type
//   { id: "foo" }, --> props
//   React.createElement("a", null, "bar"), --> ...children
//   React.createElement("b")
// );

// -->

// create TEXT_ELEMENT type for primitive type values (wrapping type, props)
// for simpler code
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

export default function createElement(type, props, ...children) {
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

// -->

// const element = {
//   type: "div",
//   props: {
//     children: [a, b],
//   },
// };
