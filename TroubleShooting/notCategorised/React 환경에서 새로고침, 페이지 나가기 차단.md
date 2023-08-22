# 개요
다양한 편집기들이 그러하듯 저장하기 전에 나가려고 하면 데이터 유실 경고를 날리고자 조사

# 접근
- `window.onbeforeunload` 속성에 이벤트를 할당하면 나가기, 새로 고침에 대해서는 확인을 요구할 수 있다
	- 단 이전 화면으로 이동하거나 하는 경우에는 이것이 무시된다.
- 이전 화면으로 이동하는 경우 `react-router`의 `history.block()`을 이용할 수 있다. 해당 함수를 호출하면 화면 이동이 막히고 넣어준 문자열로 이동 확인을 받도록 변경된다. 이 때 반환값으로 함수를 반환하는데 해당 함수를 호출하면 막혔던 화면 이동이 풀리게 된다.

# 한계
- 확인용으로 기본 모달 밖에 사용할 수 없어 디자인의 통일성을 해치는 부분이 있다.
- 확인을 하도록 유도하긴 좋지만 cleanup 용도로는 부적절하다.

# 참고
- ref::[Window: beforeunload event - Web APIs | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event)
- ref::[history/docs/blocking-transitions.md at main · remix-run/history · GitHub](https://github.com/remix-run/history/blob/main/docs/blocking-transitions.md)