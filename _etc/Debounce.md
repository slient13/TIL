# 개요
연이어 발생하는 복수의 이벤트들을 그룹화하여 하나의 동작만 수행되도록 하는 기술. 이를 통해 *스크롤 이벤트*나 *resize 이벤트* 등 불필요하게 자주 발생하는 이벤트들에 대한 반응을 필요한 수준으로 억제할 수 있다.

```js
debounce($callback, $delay)
```

이벤트에 맞춰 `$callback`을 실행하나 `$delay` ms 내 동일한 이벤트가 다시 발생하는 경우에는 바로 실행하지 않고 대기하다 `$delay` ms 동안 다시 이벤트가 발생하지 않으면 그재서야 실행한다.

참고: (ref:: [Web Club Debounce와 Throttle 그리고 차이점](https://webclub.tistory.com/607))