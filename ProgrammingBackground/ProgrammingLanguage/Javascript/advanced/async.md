# 개요
비동기 함수가 포함된 코드를 마치 순차진행되는 동기적 코드처럼 사용할 수 있도록 제공하는 특수한 키워드.

# 구조
```js
async function $func($value) {
	await asynchronous_func($another_value);
	synchronous_func($another_value2)
	...	
}
```

# 특징
- [[async]]는 반드시 `async` 키워드가 붙은 함수 안에서 이루어져야 한다.
- 동기함수처럼 실행되기를 바라는 함수 앞에는 `await` 키워드를 붙여야 한다.
- [[async]] 함수는 암시적으로 [[promise]]를 반환값으로 제공한다. 즉, [[async]] 함수 자체는 비동기 함수이다.
- 만약 `$func`가 반환값을 가진다면 그 값을 외부 코드에서 넘겨받을 수도 있다. 다만 [[promise]]를 반환하므로 직접 대입하듯 받고 싶으면 또다른 [[async]] 함수 내에서 `await` 키워드를 호출된 함수 앞에 붙어주어야 한다.