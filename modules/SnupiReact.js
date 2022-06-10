import createElement from "./createElement";

function createDom(fiber) {
  const dom =
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type)

  updateDom(dom, {}, fiber.props);

  return dom;
}

const isEvent = key => key.startsWith("on")
// handle event listenrs differently
const isProperty = key =>
  key !== "children" && !isEvent(key)
const isNew = (prev, next) => key =>
  prev[key] !== next[key]
const isGone = (prev, next) => key => !(key in next)
function updateDom(dom, prevProps, nextProps) {
  //Remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(
      key =>
        !(key in nextProps) ||
        isNew(prevProps, nextProps)(key)
    )
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      // if event handler changed, we remove it from the node
      dom.removeEventListener(
        eventType,
        prevProps[name]
      )
    })

  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.addEventListener(
        eventType,
        nextProps[name]
      )
    })

  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      dom[name] = ""
    })
​
  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      dom[name] = nextProps[name]
    })
}

function commitRoot() {
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWork(fiber) {
  if (!fiber) return;

  const domParent = fiber.parent.dom;
  if (fiber.effectTag === "PACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "DELETION") {
    domParent.removeChild(fiber.dom);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  }

  commitRoot(fiber.child);
  commitRoot(fiber.sibling);
}

function render(element, container) {
  // TODO :: next unit of work
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    // link to the old fiber
    alternate: currentRoot,
  };
  deletions = [];
  nextUnitOfWork = wipRoot;
}

// -------------------------------------------------------

// 작업을 작은 단위로 분할하고,
// 각 단위를 완료하며 다른 작업을 수행해야 할 경우
// 브라우저가 렌더링을 중단한다
let nextUnitOfWork = null;
let currentRoot = null;
// the work in progress root
let wipRoot = null;
// array to keep track of the nodes we want to remove
let deletions = null;

// As of November 2019, Concurrent Mode isn’t stable in React yet.
function workLoop(deadLine) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadLine.timeRemaining() < 1;
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

// create the new fibers ...
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
  reconcileChildren(fiber, elements);

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

// reconcile the old fibers with the new elements.
function reconcileChildren(wipFiber, elements) {
  // oldFiber :: what we rendered the last time
  // element :: the thing we want to render to the DOM
  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling = null;

  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber = null;

    //  TODO :: compare oldFiber to element (+ "key")
    const sameType = oldFiber && element && element.type == oldFiber.type;
    if (sameType) {
      // TODO :: update the node
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        // use effectTag during the commit phase
        effectTag: "UPDATE",
      };
    }
    if (element && !sameType) {
      // TODO :: add this node
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        // use effectTag during the commit phase
        effectTag: "PLACEMENT",
      };
    }
    if (oldFiber && !sameType) {
      // TODO :: delete the oldFiber's node
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      wipFiber.child = newFiber;
    } else if (element) {
      prevSibling.sibling = newFiber;
    }
  }
}

// -------------------------------------------------------

const SnupiReact = {
  createElement,
  render,
};
export default SnupiReact;
