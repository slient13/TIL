`$= "작성일: " + new Intl.DateTimeFormat("ko-KR").format(dv.current().file.cday)`

# 개요
[React.Router](../../ProgrammingBackground/ProgrammingLanguage/Javascript/library/React/React.Router.md)의 *Route* 컴포넌트에 대해 *dynamic path*를 사용하기 위해 `/post/:id`를 사용했으나, 해당 페이지가 인식되지 않는 오류.

## 환경
```
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-router-dom": "^6.8.1"
```

## 경과
- `/post/:id` 인식 확인 -> 인식 안됨.
	- (상세)  `net::ERR_ABORTED 404 (Not Found)` 오류가 발생함.
- `/:id` 인식 확인 -> 오류 없이 인식됨.
- `/other/test` 인식 확인 -> 인식 안됨.
- (중간 결론) `dynamic path`가 문제가 아니라 2단계 이상 깊어지는 path가 문제.
- 키워드 `react router net::ERR_ABORTED 404 (Not Found)`으로 검색
	- (정보 획득) (ref:: [토이프로젝트 post page 구현기 2: react router - SPA refresh 문제](https://velog.io/@coolchaem/React-Router-%EC%97%90%EB%9F%AC-SPA-refresh-%EB%AC%B8%EC%A0%9C)): 상황은 다르지만 현상이 동일. 
- 주소창에 직접 입력하는 대신 `Link`를 여럿 만들어서 시도 -> 성공.
- *webpack*을 수정해서 `output: { publicPath: '/' }`을 추가하고 주소창을 통해 접근 시도 -> 오류 안나고 잘 접근 됨.

# 결과
- *webpack*에 `output: {publicPath: '/' }`를 추가하는 것으로 해결. 

## 원인 분석
- [SPA](../../ProgrammingBackground/Paradigm/SPA.md)의 문제로, *client side*에서 *router*를 통해 페이지를 전환하다보니 아예 처음부터 *server*로 보다 깊은 수준의 페이지를 요청하면 어떤 페이지를 보여줘야 하는지 몰라서 생기는 현상이라고 한다. 이에 대한 해결책으로는 리다이렉트 페이지를 던져줘 필요한 페이지로 옮겨가도록 하거나, *webpack* 설정을 수정해서 인식할 수 있도록 해주는 것이 있는 듯 하다.