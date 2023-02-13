# 개요
이벤트에 반응해 핸들러가 실행되면 일정 시간동안 그 핸들러를 잠근다. 이를 통해 짧은 시간 내 불필요하게 많은 수행 시도가 발생하는 것을 피할 수 있다.

```js
throttle($callback, $lockTime);
```

참고: (ref:: [Web Club Debounce와 Throttle 그리고 차이점](https://webclub.tistory.com/607))