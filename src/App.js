/** @jsx Didact.createElement */
function App(props) {
  // return SnupiReact.createElement("h1", null, "Hi ", props.name);
  return <h1>Hi {props.name}</h1>;
}

// const element = SnupiReact.createElement(App, { name: foo });
const element = <App name="foo" />;
const container = document.getElementById("root");
Didact.render(element, container);
