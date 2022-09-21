#RDB #DBMS #SQL

# 개요
오픈 소스 및 무료 사용이 제공되며 [[관계형 데이터베이스]]의 기능을 준수하게 제공하는 [[SQL]] 기반의 [[DBMS]]이다. 무료로 제공되다보니 수많은 사용자가 존재하며, [[web]]과 함께 엄청난 성장을 이룩하였다.

비교 대상으로 유료이며 훨씬 강력한 기능 및 보안을 제공하는 [[Oracle(DBMS)]]가 존재하며, 적당한 성능의 저렴한 솔루션을 원하는 경우 [[MySQL]]을 금용이나 관공서등 보안에 민감하고 보다 강력한 기능이 필요한 곳은 [[Oracle(DBMS)]]을 사용한다.

# 설치
## 일반적인 설치
공식 다운로드 페이지에서 *mysql community server*를 골라 installer를 내려받고 실행한다.

다운로드 링크: [MySQL :: MySQL Community Downloads](https://dev.mysql.com/downloads/)

### 기타
기본 설정 포트: 3306

## **bitnami - WAMP**를 이용한 설치
**WAMP**란 windows용 통합 서비스 환경 구축 도구이다. 내부에 [[MySQL]]이 포함되어 있다.

이름의 의미는 *Windows/Apache/MySQL/Php*의 첫글자들을 따온 것이다.

해당 패키지를 직접 설치하는 대신, [[Docker#image]]로 내려받아 컨테이너를 설정할 수도 있다.

*참고*
- 설치 페이지: [Install WAMP, Download WAMP (bitnami.com)](https://bitnami.com/stack/wamp/installer)
- 설치 설명글: [Bitnami WAMP 설치 (Apache, Mysql, Php 설치하기) (tistory.com)](https://aboneu.tistory.com/243)
- docker image = nanoserver/wamp: [nanoserver/wamp - Docker Image | Docker Hub](https://hub.docker.com/r/nanoserver/wamp)

## IaaS
온라인 상에서 [[MySQL]]을 포함한 개발 환경을 대여하여 사용할 수 있다. 

예시로 [codeanywhere](https://codeanywhere.com/?ref=try-now&gclid=CjwKCAjwyaWZBhBGEiwACslQo8bFxa48vwnZnRTsjPKkVIOloeLCndYr9hb2qGFwSVCeuzh50TfPqBoCY4sQAvD_BwE) 가 있다.

# 구성
## database server
[[#database]]들을 저장하고 이에 대한 처리를 제공하는 가장 바탕의 구성 요소. 

## database
유관한 [[#table]]들을 저장하고 있는 하나의 집합체. 

**schema**는 여러가지 의미를 가지고 있지만 아무 수식어 없이 부르면 대게 이것을 의미한다.

## table
각각의 데이터들을 저장하고 있는 2차원 표 형태의 저장 공간.

## record
*동의어: [row, 행]*

[[#table]]에 저장된 개별적인 데이터 하나하나를 의미한다.

## column
*동의어: [열]*

[[#table]]에 저장된 [[#record]]들이 공통적으로 가지는 특성값들의 목록.


# 명령
## 프로그램 시작
- `mysql -u$username -p$password -h$host` // [[MySQL]]을 
	- `$username`으로 시작한다. `$password`는 생략하면 추가로 입력을 요구한다. 
	- `-h` 옵션으로 로컬이 아닌 외부 네트워크의 DB를 연결해줄 수 있다.  `$host`에는 목적지의 주소를 적으면 된다. 생략 시 `localhost`가 기본적으로 적용된다.

## DB 조작
[[MySQL command]] 참고

# backend 연동
[[MySQL backend]] 참고