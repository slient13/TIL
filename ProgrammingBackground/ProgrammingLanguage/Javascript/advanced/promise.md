# 개요
[[javascript]]의 특수한 객체로, 값이 언제 제공될지 알 수 없는 비동기 환경에서 확실히 완료된 시점에 다음 동작을 연결시켜주는 기능을 한다.

# 생성
`new Promise(($resolve, $reject) => Promise`

- `$resolve($return-data)` // 동작이 정상적으로 완료되었을 때 이를 알림과 동시에 그 값을 전달하기 위한 함수.
- `$reject($reason)` // 동작이 실패하였을 때 이를 알림과 동시에 그 사유를 전달하기 위한 함수.

# 메소드
## 내장 함수
### all
`Promise.all(List<Promise>, $callback)`

[[promise]]의 배열을 입력받아 모든 [[promise]]가 성공하면 `$callback`을 호출한다. 이 때 `$callback`에는 하나의 인수가 제공되는데, 이는 `List<Promise>`의 결과값들을 모은 배열이다.

만약 하나라도 실패하면 나머지 [[promise]]의 완료를 기다리지 않고 무시하며, 그 하나의 실패 사유를 가지고 자기 자신도 ==실패한 promise==를 반환한다.

### allSettled
`Promise.allSettled(List<Promise>, $callback)`

[[#all]]과 유사하게 동작하나, ==거부된 promise==가 존재하더라도 중단하지 않고 남은 [[promise]]를 모두 실행시킨다. 그리고 그 결과값을 배열에 모아 `$callback`을 호출한다.

### race
`Promise.race(List<Promise>, $callback)`

[[promise]]의 배열을 받아, 그 중 단 한개라도 성공하면 해당 결과값을 가지고 `$callback`을 호출한다. 첫번째 성공이 확인되면 나머지는 무시된다.

*용도* = 엘리베이터를 탈 때 여러개가 나란히 있으면 버튼을 일단 다 눌러놓고 먼저 오는 것을 타고가듯, 각 시스템이 언제 답신해줄지 모를 때 동일한 동작을 여러 곳에 요청하고 먼저 응답해준 쪽의 데이터를 받아 빠르게 처리하고자 할 때 사용한다.

### reject
`Promise.reject($reason) -> Promise`

`$reason`을 사유로 하는 ==rejected== 상태의 프로미스를 반환한다.

## prototype 함수
### then
`.then($callback: ($response) -> Promise | Any) -> Promise | Any`

[[promise]]의 상태가 ==resolved==인 경우 해당 데이터를 처리하는 함수 `$callback`을 실행한다. 그리고 그 결과값을 반환한다.

그렇지 않은 경우 받은 상태 그대로의 `Promise`를 반환한다.

### catch
`.catch($callback: ($reason) -> Promise | Any) -> Promise | Any`

[[promise]]의 상태가 ==rejected==인 경우 해당 데이터를 처리하는 함수 `$callback`을 실행한다.

그렇지 않은 경우 받은 상태 그대로의 `Promise`를 반환한다.

만약 [[promise]]가 ==rejected== 되었는데 `catch`가 단 하나도 없으면 코드를 종료시키는 오류가 발생한다.

### finally
`.finally($callback: () -> Promise | Any) -> Promise | Any``

[[promise]]의 상태와 무관하게 `$callback`을 호출해 지정한 동작을 수행한다.

# 구조
## nested chaning
```js
promise
	.then((res) => {
		...
		another_promise.then(callback);
	})
```

## promise chaining
```js
promise
	.then((res) => {
		...
		return another_promise;
	}).then(callback);
```

# 참고 자료 
[[외부링크 모음#promise]]