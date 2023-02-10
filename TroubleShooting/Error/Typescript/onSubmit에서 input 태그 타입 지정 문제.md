`$= "작성일: " + new Intl.DateTimeFormat("ko-KR").format(dv.current().file.cday)`

# 개요
`onSubmit` 이벤트에서 `form`에 전달된 *input* 요소의 정보를 얻을 필요가 있었는데, 에디터에서 타입을 추론하지 못해서 정상적인 코드에 오류가 발생하는 문제

## 코드
```jsx
const id = e.currentTarget.id.value; // 이렇게 하면 `id`를 `string`으로 추론함.
```

# 경과
- 이런 상황에 대해 제네릭을 지정하거나 하는 방법이 있는지 검색 -> 실패
- 임의로 타입을 주입할 수 있는 방법이 있는지 확인
	- 참고1: (ref:: [Forms and Events | React TypeScript Cheatsheets (react-typescript-cheatsheet.netlify.app)](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/))
	- 참고2: [intersection type](../../../ProgrammingBackground/ProgrammingLanguage/Javascript/advanced/Typescript/syntax/Typescript.syntax.complextType.md#intersection%20type)
	- `&` 연산을 이용해 임의로 타입을 지정할 수 있음을 확인함.
- 해결

# 결과
해결.

## 원인 분석
기본적으로는 속성이 제공되지 않아서 생기는 문제. 이와 같이 타입을 확장해야 하는 경우에는 *typescript*의 *intersection type*을 이용하면 될 듯하다.