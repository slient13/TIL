#framework #frontend 
# 용어
## 컴포넌트
React를 구성하는 기본적인 방법. `React.Component`를 상속받은 클래스로 구성하며, 클래스 내부에서 특정 메서드를 overriding 하면 React에서 관련된 기능을 수행해준다. 여러가지 메서드가 존재하며 그 중 `render()`의 경우 반드시 정의되어야만 한다.

### React
react 앱의 가장 기본이 되는 컴포넌트. `index.js`에 포함되어 있으며, 앱의 진입점 역할을 해준다.

`<React.StrictMode></React>` // React 앱을 StrictMode로 구성한다. 앱을 개발 모드에서 실행할 때 선제적으로 앱의 기능들을 실행시켜보며 무한 루프 등이 발생하지는 않았는지 등을 먼저 확인해준다. 때문에 개발모드에서는 앱의 모든 기능이 2번씩 실행된다.

## 함수 컴포넌트
복잡하지 않고 특별히 내부 상태 정보를 가지지도 않는 element에 대해 간편하게 작성하는 방식이다. 해당 함수의 반환값을 element의 내용으로 취급한다. 간단히 말해 [[#컴포넌트]]의 `render()`만 정의한다는 느낌.

## state 
웹 페이지 등을 구성하다보면 항시 일관되고 정해진 형태의 페이지도 존재하지만, 상황에 따라 다른 형태의 페이지를 구성해야 하는 일도 상당히 많이 발생한다. 이 때 상황에 따라서 [[#컴포넌트]]가 다른 동작을 수행할 수 있도록 내부 상태 정보를 저장해주는 것을 **state**라고 부른다. 

## props
계층화된 [[#컴포넌트]]를 구축하다보면 종종 상위 컴포넌트만 알고 있는 정보를 하위 컴포넌트가 사용해야 하는 일이 생긴다. 이 때 상위 컴포넌트의 정보를 전달해주는 방법을 **props**라고 부른다.

### props drilling
[[#컴포넌트]]들을 계층 형태로 구성하다보면 [[#props]]를 넘겨주는 쪽과 그것을 받아 사용하는 쪽의 거리가 멀 수 있다. 이런 상황에 [[#props]]를 사용할 수 있도록 제공하기 위해 계층 형태로 구성된 [[#컴포넌트]]들을 차례대로 건너가며 [[#props]]를 넘겨주고 또 넘겨주고 하는 식으로 연결하는 것을 **props drilling**이라고 부른다.

그 단계가 짧은 경우에는 특별히 곤란한 부분은 없지만 만약 10단계, 15단계 이렇게 무지막지하게 건너가야 하거나 하면 [[#props]]를 추적하거나 수정하는 과정이 매우 까다로워 지기 때문에 **Context API**나 **Redux** 같은 라이브러리를 사용한다.

# 심화
## Hooks
[[#함수 컴포넌트]]의 경우 호출될 때마다 내부에서 선언하거나 정의한 정보가 상실되므로 [[#컴포넌트]]처럼 활용할 수 없었다. 이에 대해 [[#함수 컴포넌트]]에서도 동일한 동작을 할 수 있도록 만들기 위해 react 측에서 특별한 함수 등을 제공하는데 이를 이용하여 함수형으로 코드를 짜는 방식을 **Hooks**라고 부른다. 성능 자체는 갱신시마다 모든 정보가 새로 정의되는 특성상 [[#컴포넌트]] 형태보다 나쁘지만, 코드가 간결해진다는 장점이 있다.

### useState
```js
const [$data, $setData] = useState($initial_value)
```
[[#컴포넌트]]에서는 `state`라는 이름의 맴버 변수로 이용하는 상태 정보를 [[#함수 컴포넌트]]에서도 다룰 수 있도록 제공하는 특수한 함수이다. 이렇게 정의된 변수 `$data`는 element가 갱신되더라도 그 정보가 유지된다, 그리고 같이 선언하는 `$setData`에는 `data`를 수정할 때 사용하는 함수가 포함된다.  값을 변경하고 싶다면 `$setData`를 이용해야 하며, 이 경우 자동으로 해당 요소가 갱신된다.

### useEffect
```js
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

```js
useEffect($callback -> $cleanUpCallback, $dependencies)
```
위와 같이 작성하면 `useEffect`는 오직 `$dependencies`로 지정해준 값들이 변경되었을 때만 갱신한다.

만약 `$dependencies`를 빈 배열, 즉 `[]`로 제공해주었다면 어떠한 값 변화도 반응하지 않게 된다. 때문에 같이 제공된 `$callback`은 첫 렌더링 시에만 1회 실행되고 이후 재 렌더링 시에는 무시되게 된다. 이를 이용해 이벤트 리스너등을 설정하는 코드로 활용할 수 있다.

`$callback`으로 제공되는 함수는 또 다른 콜백 함수를 반환할 수 있는데, 이 때 반환하는 콜백은 **clean up callback**이라 부르며, **Effect**가 갱신되거나, 컴포넌트가 제거되는 등의 변화가 발생하였을 때 이전 **Effect**의 영향을 *청소*하는데 사용될 수 있다. 가령 이벤트 리스너를 분리하는 코드 등을 포함시킬 수 있다.

참고: (ref::hooks#useEffect: [Hooks API Reference – React (reactjs.org)](https://ko.reactjs.org/docs/hooks-reference.html#useeffect))

### useMemo
```js
const $memoizationValue = useMemo($callback, $dependencies)
```
`$memoizationValue`를 사용하고자 할 때 `$dependencies`의 값이 변하지 않았다면 `$callback`을 실행해 다시 계산하는 대신 이전의 계산값을 그대로 재사용한다. 이를 통해 불필요한 계산을 생략할 수 있다.

또한 기존 데이터의 참조를 다시 반환하는 것이므로 `$memoizationValue`를 props로 넘겨주더라도 하위 요소를 재 랜더링 시키지 않는다.

참고로 `useMemo`는 한 번 실행했던 함수의 결과값에 대해 영구히 기억하는 것을 보장하지 않는다. 내부 최적화 로직에 따라 임의의 순간에 기억했던 값을 잊어먹고 다시 처음부터 계산할 수도 있기 때문에 그 특성을 이용해서 **동일 값에 대해 단 한 번만 실행되어야 하는 코드**를 작성하려고 하면 문제가 발생할 수 있다.

참고: (ref:: hooks#useMemo: [Hooks API Reference – React (reactjs.org)](https://ko.reactjs.org/docs/hooks-reference.html#usememo))

### useLayoutEffect
[[#useEffect]]와 기능상으로는 동일하지만 update 타이밍이 **화면이 그려지기 전**으로 차이가 있다. 화면이 그려지기 전에 미리 반영해야 하는 변경사항이 있는 경우 사용된다.

단, 이렇게 해도 모든 javascript 파일을 내려받기 전까지는 어떤 함수도 실행되지 않으므로 [[server side rendering]] 방식을 사용하는 경우라면 유의할 필요가 있다.

참고: (ref::hooks#useLayoutEffect: [Hooks API Reference – React (reactjs.org)](https://ko.reactjs.org/docs/hooks-reference.html#uselayouteffect))

### hooks props
```js
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

# react-dom
## 리다이렉트
ref:: react-dom/Navigate: [Navigate v6.4.2 | React Router](https://reactrouter.com/en/main/components/navigate)
ref:: react-dom/hooks/useNavigate: [useNavigate v6.4.2 | React Router](https://reactrouter.com/en/main/hooks/use-navigate)

# 기타
## 기반 프레임워크
[[nodeJS]]

## 파생 프레임워크
[[NextJs]]