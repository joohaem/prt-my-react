import createElement from "./createElement";

function createDom(fiber) {}

function render(element, container) {
  // TODO :: next unit of work
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element],
    },
  };
}

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

function performUnitOfWork(fiber) {
  // TODO :: add dom node
  // first fiber.dom <- container
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }

  // TODO :: create new fibers
  const elements = fiber.props.children;
  let idx = 0;
  let prevSibling = null;

  while (idx < elements.length) {
    const element = elements[idx];

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };

    if (idx === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    idx++;
  }

  // TODO :: return next unit of work
  // 자식 -> 자식의 형제 -> 부모의 형제 순
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

// -------------------------------------------------------

const SnupiReact = {
  createElement,
  render,
};
export default SnupiReact;
