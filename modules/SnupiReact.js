import createElement from "./createElement";

function createDom(fiber) {}

function commitRoot() {
  // TODO :: ad nodes to  dom
}

function render(element, container) {
  // TODO :: next unit of work
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
  };
  nextUnitOfWork = wipRoot;
}

// -------------------------------------------------------

// 작업을 작은 단위로 분할하고,
// 각 단위를 완료하며 다른 작업을 수행해야 할 경우
// 브라우저가 렌더링을 중단한다
let nextUnitOfWork = null;
// the work in progress root
let wipRoot = null;

// As of November 2019, Concurrent Mode isn’t stable in React yet.
function workLoop(deadLine) {
  // let shouldYield = false;
  // while (nextUnitOfWork && !shouldYield) {
  while (nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    // shouldYield = deadLine.timeRemaining() < 1;
  }

  // 작업이 모두 끝난 후,
  // 전체 fiber tree를 DOM 에 추가(commit) 한다
  // (incomplete UI 방지)
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
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
  // 아래처럼 parent에 넣을 시에,
  // 브라우저가 트리 렌더링 전에 작업을 중단할 수 있어
  // incomplete UI가 보여질 위험이 있다
  // if (fiber.parent) {
  //   fiber.parent.dom.appendChild(fiber.dom);
  // }

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
