*역링크*: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL" && e.path.substring(0, 11) !== "__reference").filter((e) => e.path !== dv.current().file.link.path)`

# 개요
[promise](promise.md) 기반 [nodeJS](../framework/nodeJS.md)용 웹 요청 라이브러리이다. 웹 요청 관련된 기본 기능이 매우 충실하여 현재의 웹 요청 작업은 대부분 이것을 기반으로 하고 있다.

# 설치
*로컬에 직접 설치*
```bash
npm install axios # npm 이용 시
yarn add axios # yarn 이용 시
```

*[CDN](../../../etc/CDN.md) 방식*
```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

# 사용법
```js
// Get Method로 비동기 요청 실행.
axios.get($url)
	// 성공 시 실행
	.then($successHandlingFunction: (response) => promise)
	// 실패 시 실행
	.catch($failureHandlingFunction: (error) => promise)
	// 항시 실행
	.then($anywhereHandlingFunction: () => promise)

// Get Mothod로 비동기 요청을 실행하며, 동시에 `{ $dataKey: $dataValue, ... }`로 이루어진 데이터를 URI 방식으로 전송.
axios.get($url, {
	params: { $dataKey: $dataValue, ... }
})

// async를 통해 유사 동기 코드로 작성
(async function () {
	try {
		const res = await axios.get($url);
		// using `res` variable
	} catch (error) { // error catch
		// using `error` variable
	} finally {
		// doing something anytime.
	}
})()

// Post Method로 비동기 요청을 실행하며, 동시에 body에 데이터를 포함시켜 전송
axios.post($url, {
	$dataKey: $dataValue,
	...
}).then( ... )
```

# 참고
- (ref:: [Axios | Axios 러닝 가이드 ](https://yamoo9.github.io/axios/guide/#axios%EB%9E%80))