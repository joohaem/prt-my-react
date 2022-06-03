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

// -->

// const element = {
//   type: "div",
//   props: {
//     children: [a, b],
//   },
// };

// -------------------------------------------------------

// 작업을 작은 단위로 분할하고,
// 각 단위를 완료하며 다른 작업을 수행해야 할 경우
// 브라우저가 렌더링을 중단한다
let nextUnitOfWork = null;

// As of November 2019, Concurrent Mode isn’t stable in React yet.
function workLoop(deadLine) {
  // let shouldYield = false;
  // while (nextUnitOfWork && !shouldYield) {
  while (nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    // shouldYield = deadLine.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}

// to make a loop
// the browser will run the callback when the main thread is idle
// React doesn't use requestIdleCallback no more
// it uses the scheduler package
requestIdleCallback(workLoop);

function performUnitOfWork(nextUnitOfWork) {
  // TODO :: perform + return the next unit of work
}

// -------------------------------------------------------

const SnupiReact = {
  createElement,
};
export default SnupiReact;
