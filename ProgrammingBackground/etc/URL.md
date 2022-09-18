#network 

# 개요
==Uniform Resource Locator==의 약자로 인터넷에서 웹 페이지를 비롯한 각종 리소스들의 위치를 표현하는 문자열이다.

# 구조
기본형: `protocol://(host|domain)[:port]/file_path[?query_string]`
	- `protocol`: 어떠한 방식의 통신 프로토콜을 쓰는지를 의미한다. 대표적으로 `http, https`가 있다.
	- `(host|domain)`: 서버 ip의 주소 혹은 이에 대응하는 ip 주소이다.
	- `port`: 해당 서버에 진입하는 포트의 주소이다. 생략 시 브라우저의 기본 접속 포트는 ==80==이다.
	- `file_path`: 서버 내 원하는 파일의 상대 주소이다.
	- `query_string`: `json` 형태로 표현되는 입력 데이터이다. `key=value&key=value...` 형태로 구성된다.

# 참고
[[domain name]]

