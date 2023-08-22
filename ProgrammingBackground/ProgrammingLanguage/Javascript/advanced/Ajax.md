#network
*역링크*: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL" && e.path.substring(0, 11) !== "__reference").filter((e) => e.path !== dv.current().file.link.path)`

*Asynchronous Javascript and XML*

# 개요
*javascript*를 이용한 비동기 통신을 구현한 기술으로 그 이전의 웹은 새로 갱신된 데이터를 원하는 경우 갱신된 페이지 전체를 서버측에 요청해 받아야 했다. 이에 대한 비효율성을 해결하기 위한 목적으로 다시 페이지를 요청하는 대신 비동기적으로 데이터만 요청해 받고, *javascript*를 이용하여 그 데이터에 맞게 화면을 재구성하도록 한 기술이 *ajax*이다.

과거에는 *XML*을 이용해서 데이터를 기술하고 주고 받았기 때문에 이름에 *XML*이 들어가 있지만 현재는 비동기적으로 주고만 받으면 어떤 유형의 데이터든 상관이 없어졌으며 *XML*은 특유의 기술 방식 때문에 전송 파일의 크기가 커져 현재는 보통 [json](../basic/json.md)을 이용하여 데이터를 기술하고 주고받는다.

# 코드
## 순수 javascript
```js
const xhr = new XMLHttpRequest();
// 비동기 방식으로 Request open
// `method type`은 `GET`이고 요청하는데 사용하는 url은 `/tests`
// 세번째 인수로 boolean 을 넣어줄 수 있는데, `false`를 해주면 동기적으로 동작.
xhr.open('GET', '/tests');
xhr.send(); // request 전송
```