# prt-my-react

create my react with vanilla js

- [@pomber/didact :: 학습 자료](https://pomb.us/build-your-own-react/)

- [~ Step 6 CodeSandbox](https://codesandbox.io/s/didact-6-96533?file=/src/index.js)

- [~ Step 8 CodeSandbox](https://codesandbox.io/s/didact-8-21ost)

## References

- [Github :: React.createElement(type, config, children)](https://github.com/facebook/react/blob/f4cc45ce962adc9f307690e1d5cfa28a288418eb/packages/react/src/ReactElement.js#L111)

- [MDN :: HTMLElement.title :: 툴팁 정보](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/title) -> [document.createTextNode()](https://developer.mozilla.org/ko/docs/Web/API/Document/createTextNode)

  :: node <- document/element/attribute/text/commnet node

- [MDN :: differences between modules and standard scripts](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules#applying_the_module_to_your_html)

- [BABEL :: Customizing the Automatic Runtime Import](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#custom)

- [React scheduler package](https://github.com/facebook/react/tree/main/packages/scheduler/src)

- [React Fiber 설명 영상](https://www.youtube.com/watch?v=gsvHmZ3hXjo)

  :: React Fiber는, 작업을 작은 단위로 분할하고, 각 단위를 완료하며 다른 작업을 수행해야 할 경우 (더 중요한 작업을 메인 스레드가 수행하도록) 브라우저가 렌더링을 중단한다

  :: reconciler는 React Fiber의 알고리즘이다
