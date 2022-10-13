#PaaS

*역링크*: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL").filter((e) => e.path !== dv.current().file.link.path)`

# 개요
2011년 **Firebase**사에서 제작한 클라우드 기반 PaaS 이다. 본래는 [[#Realtime Database]] 기능 밖에 제공하지 않았지만, 2014년 구글에 인수된 이후 점차 기능이 확장되어 현재는 다양한 제품을 제공하는 서비스로 발전하였다.

유사한 서비스로 [[AWS.amplify]] 가 있다.

# 서비스 구성
[[Firebase.Services]]

# 권장사항
## 사용을 권장하는 상황
언제 중단되어도 크게 상관 없는 가벼운 사이드 프로젝트, 단순 아이디어를 검증해보고자 하는 목적에서 만드는 서비스의 프로토타입 등을 구축할 때 유용하게 사용할 수 있다. [[Firebase]]에서 제공하는 다양한 기능들은 적은 노력으로도 서비스를 구축하고 돌려볼 수 있도록 제공한다. 특히 [[Firebase]]나 [[AWS.amplify]]는 그 규모도 상당히 커서 유료 플랜까지 고려하면 상당히 큰 규모로 서비스를 구축해 시도해볼 수 있다.

## 사용을 권장하지 않는 상황
장기적으로 운용될 본 서비스를 구축하는 것은 지양해야 한다. [[Firebase]]가 서비스 구축을 쉽게 해주기는 하지만 그 기능을 이용하게 되면 백엔드 및 데이터비스 등을 대부분 [[Firebase]]에 의지하게 된다. 때문에 [[Firebase]]의 정책 변경 등에 상당한 영향을 받게 되고, 도중에 [[Firebase]]를 떠나려고 해도 서비스의 백엔드와 데이터베이스등을 통째로 대체하는 작업이 필요해 쉽지 않다. 특히나 서비스 중단이 치명적인 경우에는 더더욱 힘들다.

# 시작하기
1. **firebase console**로 들어간다.
2. 프로젝트 생성을 누른다.
3. 프로젝트 이름, **Google Analystics** 사용 여부 등을 정하고 생성한다.
4. 원하는 형태의 앱을 고르고 앱을 생성한다.
5. 앱 생성 이후 안내되는 방식으로 작업 환경에 firebase를 연결한다.

# 개발
references::API_참고문서: [Firebase API Reference (google.com)](https://firebase.google.com/docs/reference)

## 인증
[[Firebase.Authociation]]

## database
[[Firebase.Database]]

## 로컬 애뮬레이터 도구 모음
[[Firebase.LocalEmulatorSuite]]

# 기타
ref::실습내용 github 저장소: [slient13/practice-cloneCoding-tweeterclone: Programming practice by clone coding with normad coder's lectures. (github.com)](https://github.com/slient13/practice-cloneCoding-tweeterclone)