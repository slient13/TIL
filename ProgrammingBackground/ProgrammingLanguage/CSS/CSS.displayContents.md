*역링크*: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL" && e.path.substring(0, 11) !== "__reference").filter((e) => e.path !== dv.current().file.link.path)`

# 정렬 관련
```css
{
	display: flex; // flex 형태로 표현
	flex-direction: column; // flex 방향
	justify-content: center; // 각 요소 정렬 (가로 방향)
	align-items: center; // 각 요소에 배정된 칸에 대해 위치 배정.	
}
```


참고
- (ref:: [justify-content - CSS: Cascading Style Sheets | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content))
- (ref:: [align-items - CSS: Cascading Style Sheets | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items))