import SnupiReact from "../modules/SnupiReact";

/** @jsx SnupiReact.createElement */
export default function App(props) {
  // return SnupiReact.createElement("h1", null, "Hi ", props.name);
  return <h1>Hi {props.name}</h1>;
}

function Counter() {
  const [state, setState] = SnupiReact.useState(1);
  return <h1 onClick={() => setState((c) => c + 1)}>Count: {state}</h1>;
}
const element = <Counter />;

// const element = SnupiReact.createElement(App, { name: foo });
// const element = <App name="foo" />;

const container = document.getElementById("root");
SnupiReact.render(element, container);
