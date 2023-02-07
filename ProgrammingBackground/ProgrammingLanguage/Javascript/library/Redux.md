*역링크*: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL" && e.path.substring(0, 11) !== "__reference").filter((e) => e.path !== dv.current().file.link.path)`

# 개요
*javascript* 기반의 웹 프론트엔드 환경에서 사용할 수 있는 범용 상태 관리 라이브러리. 최초에는 [React](React.md)의 상태관리를 용이하게 하기 위해 만들어졌지만 점차 기능이 확장되면서 [React](React.md)를 벗어나 *바닐라 javascript*나 다른 프론트엔드 라이브러리에서도 사용할 수 있도록 기능이 일반화 되었다.

# 기본적인 동작 방식
- **상태**는 한 곳에서 전역적으로 관리한다. 이렇게 관리하는 장소를 [store](#store)라고 한다.
- **상태**는 함부로 접근할 수 없으며, [getState](#getState)를 통해 정보를 얻을 수 있다.
- **상태**는 함부로 수정할 수 없으며, [dispatch](#dispatch)라는 인터페이스를 통해 변경을 요청해야 한다.
- [dispatch](#dispatch)를 통해 요청을 받으면 그것과 기존의 정보를 이용해 **상태**를 갱신하는데, 이 때 처리하는 로직을 [reducer](#reducer)라고 한다.

# 구성
## store
```js
const store = Redux.createStore($reducer); // deprecated
const store = Redux.configureStore({ reducer: $reducer });
```

**상태**를 저장하는 컨테이너이다. [Redux](Redux.md)는 기본적으로 이곳에 모든 **상태**를 기록, 관리한다.

## reducer
```ts
function reducer(prevState: object, action: object) {
	let newState: object;
	if (action.type === "someType") { ... }
	return newState;
}
```

[store](#store)에서 **상태**를 변경하기 위한 동작을 제공하는 특수한 함수이다. [store](#store)를 만들 때 `createStore`에 인자로 제공된다.

`action`에는 처리할 동작을 지정한 정보가 객체 형태로 전달되며, 관례적으로 `type` 이라는 속성을 통해 처리할 동작의 종류를 구분한다.

## getState
```js
let state = store.getState();
```

[store](#store)에서 **상태** 정보를 요청해 받는다. 이렇게 하지 않고 직접적으로 **상태** 정보에 접근하는 것은 금지된다.

### selector
```js
const selector = state => state.value;
let value = selector(store.getState());
```

[getState](#getState)는 모든 **상태** 정보를 반환하는데 그 중 일부만 필요한 경우 그것만을 추출하는 함수를 만들어 이용할 수 있다.

## dispatch
```ts
store.dispatch(action: object);
```

[store](#store)에 저장된 **상태** 정보를 변경해달라는 요청을 전송하기 위한 함수이다. 여기서 전달된 정보가 [reducer](#reducer) 함수의 `action` 부분 인자로 제공되고, 이에 따라 적절한 처리를 해서 **상태** 정보를 갱신한다.

## subscribe
```js
store.subscribe($render);
```

[store](#store)를 구독하여 변경사항이 발생하면 [render](#render)를 다시 호출하도록 설정한다.

### render
**UI**를 그리는 동작을 하는 특정 함수이다. [subscribe](#subscribe)에 인자로 제공해서 **상태** 정보가 갱신될 때마다 **UI**를 새로 그리는 용도로 사용된다. 

UI를 그리기만 하면 되므로 특별한 규격은 없다.

# 개발 환경 구성

참고: (ref:: [Installation | Redux](https://redux.js.org/introduction/installation))

## Create React App
[React](React.md)를 위한 초기 환경 설정을 제공하는 템플릿 `create-react-app`에는 [Redux](Redux.md)를 지원하기 위한 라이브러리 및 설정들도 같이 포함되어 있기 때문에 손쉽게 사용 환경을 구축할 수 있다.

## redux-toolkit
``` bash
# NPM
npm install @reduxjs/toolkit # install toolkit
# Yarn
yran add redux # install core
```

[redux core](#redux%20core)를 포함하여 [Redux](Redux.md)를 이용하는데 도움이 되는 각종 라이브러리가 포함된 패키지이다.