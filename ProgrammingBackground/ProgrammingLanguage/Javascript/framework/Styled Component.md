# 개요
**CSS in javascript**를 제공하는 라이브러리로, 일반 javascript에서도 쓰일 수는 있으나 주로 [React](React.md)와 함께 쓰인다.

# 문법
## styled
```jsx
// 기본 html 요소 스타일 적용.
const StyledElement = styled.element`
	... // css text
`
// react 컴포넌트 스타일 적용
const StyledComponenet = styled(Componenet)`
`
```

**html 요소**나 다른 **React componenet**에 대해 특정 스타일을 적용한 컴포넌트를 반환한다. 각 컴포넌트는 고유한 *class* 속성을 가지게 되며, 이것으로 다른 컴포넌트에는 영향이 없는 고유한 스타일을 적용할 수 있다.

외부 영향도 없고, 스타일을 기술한 내용도 js 파일 내에 포함되기 때문에 컴포넌트를 모듈화시키기가 좋다.

## GlobalStyle
```jsx
const GlobalStyle = creatGlobalStyle`
	... // css text
`
```

전역 스타일을 지정할 때 사용한다. `GlobalStyle`으로 감싸진 모든 컴포넌트들은 해당 전역 스타일이 적용된다.

## props
```jsx
const StyledElement = styled.element`
	..., // css text
	${props => props.attr},
`

const Componenet = () => {
	...
	return (
		<StyledElement attr={value}>
			//
		</StyledElement>
	)
}
```

**styled componenet**를 사용할 때 [Template Literals](../advanced/ES6%20basic.md#Template%20Literals)을 사용하는데, 이 자리에 단일 입력을 받는 콜백 함수를 넣어주면 그 자리에 `props`라고 하는 입력을 제공하고 컴포넌트에서 속성에 전달된 값에 접근할 수 있게 해준다.

가령 `<StyledComponent theme={themeData} />`와 같은 방식으로 테마 정보를 전달해주었다면 `background-color: ${(props) => { return props.theme === 'white' ? #fff : #000};` 이런 식으로 접근해 활용할 수 있다. 위 코드는 `theme`로 white가 들어가면 배경색을 `#fff`로 아니면 배경색을 `#000`으로 변경해준다.

