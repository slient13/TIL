#framework #frontend 
*역링크*: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL" && e.path.substring(0, 11) !== "__reference").filter((e) => e.path !== dv.current().file.link.path)`

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

## key
*React*는 컴포넌트의 변화가 발생하였을 때 모든 컴포넌트를 재 렌더링 하는 대신 변경된 부분만을 파악해서 그 부분만 갱신하는 방식으로 효율을 개선한다. 이 때 기존에 렌더링 된 html 요소와 새로 들어온 컴포넌트 정보를 서로 매핑하기 위해 고유한 값을 사용하는데 이것이 `key`이다. 

숫자 혹은 문자열로 구성되며, 일반적인 상황에서는 React가 자동으로 채워준다. 하지만, 함수를 이용해서 컴포넌트를 즉석에서 생성하는 경우 등에는 그렇지 못하기 때문에 개발자가 직접 `key` props에 고유한 값을 넣어주어야 한다.

만약 이것이 빠진 경우 React는 변경된 컴포넌트를 제대로 인식하지 못해 변경사항이 있어도 제대로 렌더링해주지 못할 수 있다.

# 심화
- [[React/React.Hooks]]
- [React.Router](React/React.Router.md)
- [React.Context](React/React.Context.md)
- [React/수동-환경-설정](React/React.수동-환경-설정.md)

# react-dom
## 리다이렉트
ref:: react-dom/Navigate: [Navigate v6.4.2 | React Router](https://reactrouter.com/en/main/components/navigate)
ref:: react-dom/hooks/useNavigate: [useNavigate v6.4.2 | React Router](https://reactrouter.com/en/main/hooks/use-navigate)

# 기타
## 기반 프레임워크
[[nodeJS]]

## 파생 프레임워크
[[NextJs]]