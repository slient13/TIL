역링크: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL")`

# 변수 선언
## var
javascript에서 최초로 제공된 변수 정의 방식이다. 일반적인 변수처럼 ==재할당==이 가능하며, 특이하게도 ==재선언==이 가능하다. 때문에 앞에서 관련된 값을 사용하고 있었다면 덮어쓸 위험이 있어 근래에는 대신 [[#let]]을 사용한다.

## let
javascript가 발전해감에 따라 새롭게 나온 변수 선언 방법. [[#var]]과 유사하지만 재선언이 차단되며, 블록 스코프 또한 지원해 일반적으로 더 편리하다.

## const
[[#let]]과 같이 나온 변수 선언 방법. [[#let]]에 추가로 ==재할당==까지 금지된다. 이를 통해 한 번 정의된 값은 앞으로도 변하지 않을 것을 보장해준다.

다만 재할당만을 금지하는 것이기 때문에 특정 객체를 할당하고 그 내부의 값을 변경하는 것은 막지 못한다. 그런 특성 때문에 주로 객체를 다루는 javascript 프레임워크들은 변화가 존재하는 값들도 [[#const]]에 할당하곤 한다.

## 특징 요약
### var
- 최상위 스코프 = global
- 함수 스코프 범위 사용 여부 = true
- 블록 스코프 범위 사용 여부 = false
- 재선언 가능 여부 = true
- 재할당 가능 여부 = true
### let
- 최상위 스코프 = script
- 함수 스코프 범위 사용 여부 = true
- 블록 스코프 범위 사용 여부 = true
- 재선언 가능 여부 = false
- 재할당 가능 여부 = true
### const
- 최상위 스코프 = script
- 함수 스코프 범위 사용 여부 = true
- 블록 스코프 범위 사용 여부 = true
- 재선언 가능 여부 = false
- 재할당 가능 여부 = false

# 스코프 범위
[[javascript.basic.scope]]

# 비동기
[[javascript.basic.asyncronize]]

# 객체
## Date
[[javascript.Date.포맷]]

# 브라우저
[[javascript.browser]]