*역링크*: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL" && e.path.substring(0, 11) !== "__reference").filter((e) => e.path !== dv.current().file.link.path)`

# 개요
*javascript*에서 테스트 목적으로 사용하는 라이브러리. 테스트 케이스를 작성해두면 커멘드 하나로 자동으로 테스트를 수행할 수 있게 해준다.

# 설치
```bash
npm -D install jest
```

# 사용
## 테스트 정의
- `*.test.js` 형태의 이름을 가진 파일을 작성하면 테스트 실행 대상이 된다. (예외로 `test.js` 파일은 대상이 된다.)

### 테스트 파일 작성
```js
test("description of this test", $test_callback)
test("description of this test", () => {
	return $someFunctionReturnPromise.then((data) => {
		expect(data).$matcher($value)
	})
})
test("description of this test", async (data) => {
	expect(data)
})
```
- 단일 테스트 케이스를 정의한다. 
- `$test_callback` 안에는 *matcher*가 들어가는데, 이것의 실행 결과를 가지고 테스트 성공 여부를 판단한다.
- 하나의 테스트 내에는 여러개의 *matcher*가 들어갈 수 있는데, 이 경우 모든 예상치가 성공해야 성공으로 취급된다.
- 만약 [promise](../advanced/promise.md)를 반환하는 비동기 함수를 테스트해야 하는 경우라면 해당 *promise*를 반환하도록 구성하면 된다. 혹은 *async/await*를 이용해도 된다.

### matcher 작성
[jest.matchers](jest.matchers.md) 참고

## 테스트 실행
```bash
# 별도 설정이 없다면 `./node_modules/.bin/jest`와 같이 번거롭게 사용해야 하나, `package.json` 파일에 스크립트 설정할 때는 앞의 내용은 생략해도 된다.
# 아래는 생략한 것 기준으로 기술되어있다.
jest # 단발성으로 테스트를 실시함
jest --watch # interaction mode로 테스트를 진행한다.
```

## 고급 설정
`jest --init`를 실행하면 대화형 CLI가 실행되며 이를 통해 `jest.config.js` 혹은 `test.config.ts`라는 설정 파일을 생성할 수 있다. 해당 파일을 이용하면 *coverage*를 추가로 포착해서 관리하게 한다던지 하는 추가적인 동작을 적용할 수 있다.

# 참고
- (ref:: [Getting Started · Jest](https://jestjs.io/docs/getting-started))