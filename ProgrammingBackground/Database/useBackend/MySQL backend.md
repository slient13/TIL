#backend #database #SQL 

# 개요
[[MySQL]]을 **backend** 환경에서 상호작용할 수 있도록 하는 방법을 기술한 문서이다.

# 구성
## 데이터베이스 클라이언트
[[Database]]를 조작하기 위한 요소.

### MySQL monitor
일반적으로 콘솔 환경에서 실습을 진행하게 되면 보게 되는 CLI 도구이다.

[[MySQL]]을 설치하였다면 언제 어디서든 제공되는 도구이며, CLI 기반이기 때문에 GUI가 제공되지 않는 서버 컴퓨터에도 사용할 수 있다.

### MySQL workbench
[[#MySQL server]]를 설치하다보면 공식적으로 같이 제공되는 GUI 기반 [[#데이터베이스 클라이언트]]이다.

[[#MySQL monitor]]보다 직관적이고 편리한 기능을 같이 사용할 수 있지만 GUI 기반이라 서버 컴퓨터에서는 사용할 수 없다.

## 데이터베이스 서버
### MySQL server