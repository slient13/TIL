#framework #frontend

# 개요
간단히 말하면 ==React + Express.js + React-Router-Dom + Server Side Rendering==. (실제로 내장하고 있다는 뜻은 아니고, 유사한 기능을 내장하고 있음을 의미)

[[react]] 기반인 만큼 [[react]]의 문법을 이용해 작성한다.

# 시작
*참고:* 
ref:: [Getting Started | Next.js (nextjs.org)](https://nextjs.org/docs)

## 설치
초기 설정 과정 중 설치되어 있지 않다면 ==create-next-app@latest== 패키지를 설치할 것이냐고 물어볾으로 특별히 미리 해야 할 설치 과정은 없다.

## 초기 설정
콘솔에서 `npx create-next-app@latest` 을 입력하면 자동으로 초기 설정이 세팅된다.

만약 ==typescript==를 사용하고자 한다면 `--typescript` 옵션을 추가해주면 된다. 

# 기본 명령어
- `npm run dev` // 개발 환경 실행(개발 서버 시작)
	*참고:* 개발 환경에서는 파일의 변경 사항이 즉시 결과에 반영된다.
- `npm run bulid` // 배포 파일 생성
	*결과 파일 생성 위치*: `./.next`
- `npm run dev` // 실 서비스 시작(실 서비스용 서버 시작)

# 파일 구성
## pages/index.js
화면을 구성하는 자바스크립트 파일. ==Next.js==로 구현하는 앱의 화면 구현은 여기서부터 시작한다.

## .env
[[#environment variable]]로 사용되는 내용을 정의한 파일이다. `$var-name=$value`의 형태로 작성한다. 만약 브라우저에서 접근이 가능해야 하면 `$var-name`에 `NEXT_PUBLIC_`이라는 접두어를 붙여주면 된다.

# API
## Page API
*참고*: 
ref:: [Basic Features: Pages | Next.js (nextjs.org)](https://nextjs.org/docs/basic-features/pages)
### route
사용자(client)가 도메인 주소로 접근하였을 때, 주소에 따라 적절한 `.js` 파일을 연결시켜주는 것. 다음과 같은 규칙을 따른다.

- `$domain/` // `page/index.js`에 연결된다.
- `$domain/$path` // `page/$path.js`에 연결된다.
- `$domain/$path/$number` // `$number` 값에 관계 없이 `page/$path/[id].js`에 연결된다. 
	*숫자를  추출하는 법:* `next/router.useRouter`를 이용한다. `useRouter()`의 반환값`$router`에는 여러가지 정보가 포함되어있는데, 이 중 `$router.query.id`를 참조하면 주소에 포함된 숫자를 추출해낼 수 있다. (==주의:== 결과값의 타입은 `string`이다.)
		만약 구체적인 페이지가 아닌 `(req, res) => {}` 꼴의 핸들러를 운용한다면 `req.query.id`의 값을 이용할 수 있다. 

## environment variable
환경 변수를 지정하는 기능이다. `process.env.$env-var`의 형태로 정의된 환경 변수에 접근할 수 있다.

*참고*: 
ref:: [Basic Features: Environment Variables | Next.js (nextjs.org)](https://nextjs.org/docs/basic-features/environment-variables)

# 기타 참고 자료
- ref:: 생활코딩 - 유튜브 강의: [Next.js - React, Express.js 그리고 SSR을 한방에 - YouTube](https://www.youtube.com/watch?v=ECMB4kUCKWQ)
- ref:: [JSONPlaceholder - Free Fake REST API (typicode.com)](https://jsonplaceholder.typicode.com/)
