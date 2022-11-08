*역링크*: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL" && e.path.substring(0, 11) !== "__reference").filter((e) => e.path !== dv.current().file.link.path)`

# 개요

[[#함수 컴포넌트]]의 경우 호출될 때마다 내부에서 선언하거나 정의한 정보가 상실되므로 [[#컴포넌트]]처럼 활용할 수 없었다. 이에 대해 [[#함수 컴포넌트]]에서도 동일한 동작을 할 수 있도록 만들기 위해 react 측에서 특별한 함수 등을 제공하는데 이를 이용하여 함수형으로 코드를 짜는 방식을 **Hooks**라고 부른다. 성능 자체는 갱신시마다 모든 정보가 새로 정의되는 특성상 [[#컴포넌트]] 형태보다 나쁘지만, 코드가 간결해진다는 장점이 있다.

# 관련 함수
### useState
```jsx
const [$data, $setData] = useState($initial_value)
```

[[#컴포넌트]]에서는 `state`라는 이름의 맴버 변수로 이용하는 상태 정보를 [[#함수 컴포넌트]]에서도 다룰 수 있도록 제공하는 특수한 함수이다. 이렇게 정의된 변수 `$data`는 element가 갱신되더라도 그 정보가 유지된다, 그리고 같이 선언하는 `$setData`에는 `data`를 수정할 때 사용하는 함수가 포함된다.  값을 변경하고 싶다면 `$setData`를 이용해야 하며, 이 경우 자동으로 해당 요소가 갱신된다.

### useEffect
```jsx
useEffect($callback)
```

[[#함수 컴포넌트]]에 변화가 전파되었을 때 `$callback`을 수행한다. 변화를 인식하는 조건은 다음과 같다.
- 해당 [[#함수 컴포넌트]]가 처음 렌더링 됨.
- 해당 [[#함수 컴포넌트]]의 state가 변경됨.
- 해당 [[#함수 컴포넌트]]가 내려받는 props가 변경됨.
	- 이전 값과 새로운 값이 다르면 변경으로 인식
	- 이전 값과 새로운 값이 같아도 참조가 다르면 변경으로 인식
	- 이전 참조와 새로운 참조가 동일하다면 변화가 없는 것으로 인식.

참고로 `$callback`의 호출은 화면에 구성이 다 그려진 이후 수행된다. 만약 화면이 그려지기 전 미리 반영되어야 하는 변경사항이 있다면 대신 [[#useLayoutEffect]]를 사용할 수 있다.

update가 완전히 종료되기 전 새로운 변경사항이 반영되는 경우 효율을 위해 이전 update는 중단하고 새로운 update를 실행한다.

```jsx
useEffect($callback -> $cleanUpCallback, $dependencies)
```

위와 같이 작성하면 `useEffect`는 오직 `$dependencies`로 지정해준 값들이 변경되었을 때만 갱신한다.

만약 `$dependencies`를 빈 배열, 즉 `[]`로 제공해주었다면 어떠한 값 변화도 반응하지 않게 된다. 때문에 같이 제공된 `$callback`은 첫 렌더링 시에만 1회 실행되고 이후 재 렌더링 시에는 무시되게 된다. 이를 이용해 이벤트 리스너등을 설정하는 코드로 활용할 수 있다.

`$callback`으로 제공되는 함수는 또 다른 콜백 함수를 반환할 수 있는데, 이 때 반환하는 콜백은 **clean up callback**이라 부르며, **Effect**가 갱신되거나, 컴포넌트가 제거되는 등의 변화가 발생하였을 때 이전 **Effect**의 영향을 *청소*하는데 사용될 수 있다. 가령 이벤트 리스너를 분리하는 코드 등을 포함시킬 수 있다.

참고: (ref::hooks#useEffect: [Hooks API Reference – React (reactjs.org)](https://ko.reactjs.org/docs/hooks-reference.html#useeffect))

### useMemo
```jsx
const $memoizationValue = useMemo($callback, $dependencies)
```

`$memoizationValue`를 사용하고자 할 때 `$dependencies`의 값이 변하지 않았다면 `$callback`을 실행해 다시 계산하는 대신 이전의 계산값을 그대로 재사용한다. 이를 통해 불필요한 계산을 생략할 수 있다.

또한 기존 데이터의 참조를 다시 반환하는 것이므로 `$memoizationValue`를 props로 넘겨주더라도 하위 요소를 재 랜더링 시키지 않는다.

`useMemo`는 기본적으로 한 번 호출되었던 것에 대해 기록하고 기억하도록 되어있지만, 언제나 항시 그럴 것으로 보장되지는 않는다. 내부에서 최적화등의 이유로 메모이제이션 기록이 제거될 수 있으므로 이것에 의존하여 **새로운 입력이 주어져야만 동작하는 함수** 등을 구현하면 문제가 생길 수 있다.

참고: (ref:: hooks#useMemo: [Hooks API Reference – React (reactjs.org)](https://ko.reactjs.org/docs/hooks-reference.html#usememo))

### useCallback
```jsx
const $callbackFunction = useCallback(
	$callback,
	$dependencies
)
```

**hooks**를 사용하는 경우에는 매 렌더링마다 내부에서 정의한 변수나 함수등도 다시 정의된다. 하지만 렌더링에 무관하게 동일한 내용을 가진 함수인 경우 굳이 재정의될 필요가 없다. 이 때 불필요한 재정의를 방지하고 특정 상황에서만 재정의가 이루어지도록 제한하는 기능을 제공해준다.

다만 그렇다고 언제나 `useCallback`을 사용하는 것이 효율적인 것은 아니다. 비효율적인 재정의를 방지해주긴 하지만 대신 한 번 정의할 때 기존에는 그냥 함수만 생성하면 그만인 것을 메모이제이션을 위한 공간을 할당하고 등록하는 과정등이 따라붙게 되어 오히려 성능 저하를 야기하게 될 수도 있다.

권장되는 상황은 특정 컴포넌트의 렌더링이 매우 잦지만, 내부에서 정의한 함수의 내용은 달라지지 않는 경우, 그 함수 자체를 **props**로 넘겨주어서 제공되는 함수의 참조를 동일하게 유지해야만 하는 경우 등이 있다.

내부적으로는 `useMemo(() => $callback, [...dependencies])` 와 같은 형태로 처리된다. 

**참고**: (ref:: hooks#useCallback: [Hooks API Reference – React (reactjs.org)](https://ko.reactjs.org/docs/hooks-reference.html#usecallback))

### useLayoutEffect
[[#useEffect]]와 기능상으로는 동일하지만 update 타이밍이 **화면이 그려지기 전**으로 차이가 있다. 화면이 그려지기 전에 미리 반영해야 하는 변경사항이 있는 경우 사용된다.

단, 이렇게 해도 모든 javascript 파일을 내려받기 전까지는 어떤 함수도 실행되지 않으므로 [[server side rendering]] 방식을 사용하는 경우라면 유의할 필요가 있다.

참고: (ref::hooks#useLayoutEffect: [Hooks API Reference – React (reactjs.org)](https://ko.reactjs.org/docs/hooks-reference.html#uselayouteffect))

### hooks props
```jsx
export const SuperComponent = () => {
	...
	return (<Component customAttr={value} />)
}
///////////////////////////
export const Component = ($props) => {
	return (<p>{$props.customAttr}</p>)
}
```

[[#함수 컴포넌트]]에서 상위 컴포넌트가 하위 컴포넌트에게 특정 속성으로 값을 전달했을 때 이를 받아 사용할 수 있도록 제공하는 기능이다. [[#함수 컴포넌트]]의 인수로 제공되며, 해당 값에 건내줄 때 사용한 속성명으로 참조하면 그 값을 이용할 수 있다.

### context API
```jsx
const Context = React.CreateContext();

const ProviderComponent = () => {
	...
	return (<Context.Provider value={data}>
		...
	</Context.Provider>)
}

const UseComponent = () => {
	const value = useContext(Context);
	...
}

```

보통의 경우 하위 컴포넌트로 특정 데이터나 함수를 전달할 때는 [hooks props](#hooks%20props)만으로 충분하다. 허나 언제 어떤 컴포넌트에서 해당 정보를 쓸 지 알 수 없거나, 너무 광범위하게 사용하거나, 사용하는 컴포넌트의 위치가 너무 깊은 경우에는 [hooks props](#hooks%20props)를 이용하면 지나치게 비효율적이다. 이런 상황에 사용할 수 있도록 데이터를 하위 컴포넌트를 향해 전역적으로 전달할 수 있는 방법을 제공하는 것이 [context API](#context%20API)이다. 

사용하기 위해서는 우선 `React.CreateContext()`를 이용하여 *Context 객체*를 만들어야 한다. 그런 다음 `$ContextObject.Provider` 컴포넌트를 이용하여 해당 데이터를 전달하고 싶은 하위 컴포넌트를 감싸준다. 이 때 전달하고자 하는 데이터는 `value` 속성에 넣어주면 된다.

위의 절차가 완료되면 이제 앞서 감싸진 컴포넌트 및 그것의 하위 컴포넌트 어디서든 그 정보를 불러올 수 있는 환경이 제공되었다. **hooks**에서 해당 내용을 쓰고자 하는 경우에는 `useContext($ContextObject)`를 통해 value 값을 받아와 사용하면 된다.

위와 같은 방법으로 편리함을 제공받을 수는 있지만 일종의 전역 변수를 두는 꼴이라 [결합도](../../../../ComputerScience/결합도.md)를 높이기 때문에 남용하면 컴포넌트의 재사용을 어렵게 할 수 있다. 권장하는 경우는 로그인한 유저의 정보나 테마 정보 등 앱 전체에 걸쳐 두루 쓰이고 컨텍스트 자체를 일반화 할 수 있는 경우들이다.

참고로 `setState`와 마찬가지로 `value`에 할당해준 데이터의 값이 바뀐다면 해당 데이터를 이용하고 있는 하위 컴포넌트는 무조건 다시 렌더링된다. 이를 막을 방법은 없으므로, 불필요하게 많은 정보를 하나의 *context 객체*로 관리하는 것은 피해야 한다.

**참고**: (ref:: [Context – React (reactjs.org)](https://ko.reactjs.org/docs/context.html))