#framework #backend

# 개요
==node.js==에 대한 참고 사항을 정리하거나 실습 내용을 정리하기 위한 문서

# 패키지
## npm
 node.js==와 관련된 다양한 패키지들을 쉽게 설치하고 관리할 수 있도록 제공하는 패키지 매니저이다.

## pm2
==node.js==로 작성된 서비스가 예상치 못한 상황에 강제로 종료되더라도 프로세스를 감시하고 있다가 재실행 시켜주는 역할을 하는 패키지이다. 

또한 마찬가지로 프로세스를 감시하고 있다가 원본 파일이 수정되면 빠르게 다시 시작해주는데, 이를 통해 개발할 때 수정 사항을 반영하기 위해 서버를 잠시 껐다 키는 수고를 덜 수 있다.

*참고:*
ref:: [공식 홈페이지](https://pm2.keymetrics.io/)

### 명령어
- `pm2 start $file-name` // `file`을 `pm2`를 통해 실행한다. 이렇게 실행된 파일은 ==node.js== 서버와 유사하나 [[#pm2]]에서 모니터링 하며, 프로세스가 의도치 않게 종료되면 즉시 서비스를 다시 실행한다.
	- `pm2 start $file-name --watch` // 위 기능에 추가로 파일이 변경될 시 서버를 즉시 재시작한다. 개발할 때 변경사항을 반영하기 위해 일일히 서버를 껏다 킬 수고를 덜 수 있다.
- `pm2 monit` // 현재 실행 중인 서버에 대한 관리용 TUI를 연다.
- `pm2 list` // 현재 실행 중인 서버 목록을 반환한다.
- `pm2 log` // 로그 출력 화면을 띄운다. 파일 수정 시 특별한 메시지 없이 서버가 재시작 되는데 이 때 문제가 있었는지 확인하기 위해 사용할 수 있다.

# 실습 내용
## node.js 콘솔에서 입력값 전달
==console==에서 `node $file-path $param...` 방식으로 입력하면 `$param`이 담겨 전달된다.

이 때의 입력값은 `process.argv: List<string>`에 담겨 전달된다. 이 때 `argv[0] = node.js 실행 파일 경로`, `argv[1] = 콘솔에서 호출된 파일 경로`가 약속되어 있으며, `argv[2]` 부터 개발자가 넣어준 인수가 차례대로 담겨 나온다.

## 파일 관련
### 파일 읽기
`fs.readFile($path, $encoding, $callback)`

파일을 읽고 그 내용에 대해 `$callback`을 실행한다.
- `path: string` // 읽을 파일의 경로이다.
- `encoding: string` // 읽을 파일의 인코딩이다. 생략시 `<Buffer>` 자료형에 바이너리 형태로 읽어온다.
- `callback: ($err, $data) => void`: 읽은 내용을 처리할 함수이다.  2개의 인수를 받으며, `err` 인수는 에러 발생 시 그것에 대한 정보를 (평상시에는 `undefined` 이다), `data`는 읽은 파일의 내용을 가지고 있다.

### 파일 탐색
`fs.readdir($path, $callback)`

특정 경로 아래 존재하는 파일을 검색하고 각 파일에 대한 주소를 추출해 처리한다.
- `path: string` // 읽을 폴더의 경로이다.
- `callback: ($err, $files) => void` // 읽은 내용을 처리할 함수이다. `err`는 에러 발생 시 그것에 대한 정보를, `files`는 확인한 파일들의 상대 경로 정보를 가지고 있다.

### 파일 쓰기
`fs.writeFile($path, $contents, [$option...], $callback)`

지정한 경로에 해당 내용을 가진 파일을 생성한다.
- `path` // 파일이 생성될 경로이다.
- `contents` // 파일에 기록될 내용이다.
- `option` // 파일 입력 시 관련된 설정들이다.
	- `encoding = utf8` // 파일 인코딩 방식이다.
	- `mode = 0o666` // 파일의 접근 권한이다. 기본값의 의미는 ==rw-rw-rw-==이다.
	- `flag = 'w'` // 파일 열람 시 모드를 지정한다. 기본값의 의미는 ==새로 작성하되, 기존에 같은 이름을 가진 파일이 있다면 덮어써라==이다. 자세한 것은 다음 링크 참고. (ref::file-system-flags:[File system | Node.js v18.9.0 Documentation (nodejs.org)](https://nodejs.org/api/fs.html#file-system-flags))
	- `signal` // 정확히는 모르겠으나 설명대로면 파일 작성 도중 중단하는 것을 허용하는지 여부를 지정할 수 있는 입력값으로 추정된다.
- `callback: (err) => void` // 파일 작성이 완료되고 난 뒤 동작을 지정한다. 오류가 발생하면 `err` 객체에 정보가 담겨나오며, 이를 활용하여 예외처리를 할 수 있다.

### 파일 변경
#### 내용 수정하기
[[#파일 쓰기]] 참고

#### 파일 이름 변경하기
`fs.rename($oldPath, $newPath, $callback)`

파일의 이름을 변경한다.
- `oldPath` // 기존 파일의 경로
- `newPath` // 새 파일의 경로. 만약 해당 경로상에 중복되는 파일이 존재하는 경우 덮어쓴다.
- `callback: (err) => void` // 변경 작업 완료 후 혹은 에러 발생 시 처리 동작.

### 파일 삭제
`fs.unlink($path, $callback)`

지정한 파일을 삭제한다.
- `path` // 삭제할 파일의 경로
- `callback: (err) => void` // 파일 삭제 이후 수행될 코드

### 전체 참고
- ref:: fswritefilefile-data-options-callback: [File system | Node.js v18.9.0 Documentation (nodejs.org)](https://nodejs.org/api/fs.html#fswritefilefile-data-options-callback)


## 데이터 수신
### post 방식으로 입력받은 form 입력 데이터 파싱
*데이터 추출*
```js
let data = '';
// 데이터를 전송 받을 때마다 호출. 
req.on('data', (chunk) => {
	data += chunk;
});
// 모든 데이터 수신이 완료된 경우 호출
req.on('end', () => {
	// url query string 형태의 문자열을 파싱한 URLSearchParams 객체 생성.
	let urlSP = new URLSearchParams(data);
	// URLSearchParams 객체에서 `someKey`에 해당하는 키를 가진 값을 반환하여 이용.
	let someValue = urlSP.get(someKey);
})
```

## 응답
### 리다이렉션
```js
// 주소 입력이 오로지 영어로만 이루어지면 이렇게 해도 되나, 한글 등 다른 언어가 포함되면 오류가 발생한다.
// res.writeHead(302, {Location: $redirection-target-url}).end();
// 한글을 받을 수 있도록 수정한 형태
res.writeHead(302, {Location: EncodingURI($redirection-target-url)}).end();
```

## 보안
[[웹 보안]] 참고

# 참고 문서
- ref:: 유튜브 강의: [WEB2 - Node.js - YouTube](https://www.youtube.com/playlist?list=PLuHgQVnccGMA9QQX5wqj6ThK7t2tsGxjm)
- ref:: 공식 참고 문서: [Index | Node.js v16.17.0 Documentation (nodejs.org)](https://nodejs.org/dist/latest-v16.x/docs/api/)
- ref:: filehandlereadfileoptions: [File system | Node.js v16.17.0 Documentation (nodejs.org)](https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#filehandlereadfileoptions)
- ref:: fswritefilefile-data-options-callback: [File system | Node.js v18.9.0 Documentation (nodejs.org)](https://nodejs.org/api/fs.html#fswritefilefile-data-options-callback)
- ref:: file-system-flags: [File system | Node.js v18.9.0 Documentation (nodejs.org)](https://nodejs.org/api/fs.html#file-system-flags)
- ref:: [HTTP 트랜잭션 해부 | Node.js (nodejs.org)](https://nodejs.org/ko/docs/guides/anatomy-of-an-http-transaction/)
- ref:: [개념 정리 - http content-type 관한 정리 (tistory.com)](https://yunzema.tistory.com/186)
- ref:: [URLSearchParams - Web API | MDN (mozilla.org)](https://developer.mozilla.org/ko/docs/Web/API/URLSearchParams)
- ref:: 문자참조표: [HTML 문자참조표 (creativestudio.kr)](https://creativestudio.kr/2106)