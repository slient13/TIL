# 목적
[Antd.Table](../../ProgrammingBackground/ProgrammingLanguage/Javascript/library/AntDesign/Antd.Table.md)에서 *summary* 기능을 사용하며, 해당 내용이 가장 상단에 올라오도록 구성

# 경과
- `<Table.Summary fixed='top'>` 시도 -> 동작하지 않음
	- 이런 저런 검색을 시도하며 성공한 예제 확인 ([Table.Summary prop 'fixed' doesn't work when it's in separate component · Issue #37126 · ant-design/ant-design · GitHub](https://github.com/ant-design/ant-design/issues/37126))
	- `<Table scroll={...}/>` 이 설정되어 있어야만 위로 올라감을 확인할 수 있었음.
- 일단 올라가긴 하나 보기 싫은 스크롤바가 나타남
	- 스크롤바를 지우는 방법 검색 ([HTML/CSS 스크롤바 숨기기 없애기 (스크롤 동작) (tistory.com)](https://gofnrk.tistory.com/48))
	- 위 내용을 범용적으로 사용할 수 있도록 특정 태그 대신 클래스를 받도록 수정
```css
.hidden_scroll {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
/* 
	이렇게 하면 직접 스크롤이 위치하는 태그에 붙이지 않더라도 
	하위 요소의 스크롤이 사라짐. 
*/
.hidden_scroll ::-webkit-scrollbar { 
  display: none;
}
```
- 위 내용을 적용하고 `<Table scroll={{ y: 대충_충분히_큰_수 }} />` 를 하여 절대 스크롤이 되지 않을 만큼 충분히 길게 만들어서 *summary*만 위로 당겨 올리는 결과를 얻어냄.