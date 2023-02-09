*역링크*: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL" && e.path.substring(0, 11) !== "__reference").filter((e) => e.path !== dv.current().file.link.path)`

# 개요
*props drilling*을 유발하는 상태 정보들을 전역적으로 관리할 수 있는 기능을 제공하는 기능. 이를 이용하면 얼마나 깊이 있는 컴포넌트에 상태 정보가 전달되더라도 바로 이용할 수 있다는 장점이 있지만, 전역적으로 관리하는 상태 정보를 사용하는 만큼 모듈내 기능들의 결합도가 높아진다는 단점이 있다. 

*props drilling*의 깊이가 아주 깊지 않은 경우라면 *컴포넌트 결함*이 더 좋은 선택지가 될 수도 있다.

참고: (ref:: [Context – React](https://ko.reactjs.org/docs/context.html))

# 사용법
## Context 객체 생성
```jsx
const $MyContext = React.createContext($defaultValue);
$MyContext.displayName = "$someDisplayName";
```

- `$defaultvalue`: 적절한 공급자가 없는 경우(*공급자가 `undefined`를 전달하는 경우가 아님*)사용할 기본값이다. 컴포넌트를 독립적으로 테스트할 때 유용히 활용된다.
- `.displayName`: 개발자 도구에서 어떤 이름으로 표현될지를 결정하는

## Context.Provider 설정
```jsx
<$MyContext.Provider value={/* 어떤 값 */}>
	{/* 대충 해당 Context로 `value`를 전달받을 객체 */}
</$MyContext>
```

- `value`: 공급자를 통해 전달할 값을 의미하는 것으로, 배열이나 객체를 전달함으로써 한 번에 많은 정보를 전달할 수도 있다. 
	- 단, 객체와 같은 참조자를 보내는 경우 세부 속성이 달라지더라도 객체 자체가 바뀌지 않으면 *React*는 상태 변화를 인식하지 못하기 때문에 여기에 전달하는 객체는 내부 상태 변화가 발생할 시 반드시 모든 값을 복사한 새로운 객체로 만들어주어야 한다.

## Context.contextType 설정
*class 방식 한정*

```jsx
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* MyContext의 값을 이용한 코드 */
  }
  ... // 이하 생략
}
MyClass.contextType = MyContext;
```

## Context.Consumer 설정
``` jsx
<MyContext.Consumer>
  {value => /* context 값을 이용한 렌더링 */}
</MyContext.Consumer>
```

## useContext 이용
```jsx
const value = useContext(MyContext);
```

- `useContext($ContextObject)`를 실행하면 반환값으로 가장 인접한 곳에서 *Provider*를 통해 제공된 *value* 값이 반환되어 이를 사용할 수 있다. 
- 컴포넌트 내에서 사용하는 값은 변화가 없더라도 `MyContext` 중 일부가 변경되면 재 렌더링이 야기된다. 이로 인한 성능 하락을 방지하는 방법에는 *메모이제이션*을 이용하는 것이 있다. *(참고: (ref:: [Preventing rerenders with React.memo and useContext hook. · Issue #15156 · facebook/react · GitHub](https://github.com/facebook/react/issues/15156#issuecomment-474590693)))*

참고: (ref:: [Hooks API Reference – React](https://ko.reactjs.org/docs/hooks-reference.html#usecontext))