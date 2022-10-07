# 개요 
2011년 **Firebase**사에서 제작한 클라우드 기반 PaaS 이다. 본래는 [[#Realtime Database]] 기능 밖에 제공하지 않았지만, 2014년 구글에 인수된 이후 점차 기능이 확장되어 현재는 다양한 제품을 제공하는 서비스로 발전하였다.

유사한 서비스로 [[AWS/amplify]] 가 있다.

# 서비스 구성
제품소개::[Firebase Products (google.com)](https://firebase.google.com/products-build?hl=ko)
요금제::[Firebase Pricing (google.com)](https://firebase.google.com/pricing?hl=ko)

## 웹 서비스
### Cloud Firestore
일반적인 클라우드 형태의 backend 서비스를 제공하는 서비스. NoSQL 형태의 데이터베이스를 클라우드로 제공하여 별도의 backend 세팅 없이도 온라인 상에서 데이터 저장과 동기화를 제공할 수 있다.

### Firebase ML
firebase를 machine learning에 사용할 수 있도록 제공하는 서비스.

### Cloud Function
이벤트에 따른 처리만을 제공하는 서비스. 별도로 관리해야 할 데이터가 없이 특정 상황에 지정한 기능만을 수행하면 되는 경우 유용하게 사용할 수 있다. 유사제품으로 **AWS Lambda**가 있다.

### Cloud Storage
클라우드 형태의 저장소를 제공하는 서비스이다. [[#cloud firestore]]가 복합적인 backend 기능을 전부 제공한다면, [[#cloud storage]]는 그 중 데이터 저장소 역할만을 중점으로 제공한다. 저장소 역할만을 하기 때문에 네트워크 퀄리티와 무관한 서비스를 구축할 때 사용하기 좋다. 유사 제품으로 **AWS S3**이 있다.

### Hosting
개발자가 제작한 웹앱 등을 온라인 상에 호스팅 하기 위한 과정을 간편하게 제공하는 서비스이다. 기본적으로 제작한 웹 사이트나 웹앱을 네트워크에서 사용하기 위해서는 도메인을 구매하고 namespace 서버를 구축하거나 빌려서 상위 DNS 서버에 비용을 대고 등록하는 절차 등을 거쳐야 하는데 이것들을 자동으로 처리해준다.

### Authentication
다양한 인증 절차를 서비스로 제공한 것이다. 사용자가 보안을 갖춘 인증 시스템을 직접 구현하지 않고서도 손쉽게 충분한 보안이 제공되는 인증 시스템을 사용할 수 있게 도우며, 소셜 인증 서비스 또한 손쉽게 적용할 수 있게 해준다.

### Realtime Database
효율적이고 적은 지연율로 클라이언트간 상태를 동기화 할 수 있도록 제공하는 서비스이다.

react firebase가 처음 제작되었을 때부터 제공했던 근본의 서비스이다. 

## 분석 서비스
### Crashlytics
서비스의 충돌이나 기타 발생한 문제에 관한 분석 데이터를 제공해주는 서비스이다. 사용자가 troubleshooting 을 하는데 소요되는 노력을 줄여준다.

단, web 환경은 지원하지 않는다. ios, android, unity 환경만을 지원한다.

### Performance Monitoring
app의 성능을 분석하여 어떤 부분이 많은 리소스를 소모하는지 쉽게 파악할 수 있게 해준다.

### Test Lab
다양한 환경에서의 가상화된 테스트를 제공하는 서비스이다. 직접 다양한 기기를 이용해 테스트를 진행하지 않고서도 다양한 기기에서 서비스가 어떻게 동작하는지, 문제는 없는지 확인할 수 있게 해준다.

### App Distribution
iOS 혹은 Android 환경에서 앱을 배포하고자 할 때 필요한 다양한 기능들을 제공하는 서비스이다. 대표적으로 신뢰할 수 있는 테스터에게 앱의 베타 버전을 배포하는 등의 일이 있다.

## 사업 성장 서비스(Grow Your Bisness)
### In-App Messaging
### Google Analytics
[[Google Analytics]]를 제공해준다.
### Predictions
### A/B Testing
### Cloud Messaging
푸쉬 알림 등을 제공하고자 할 때 이를 제공하는 서비스이다.
### Remote config
### Dynamic Link

# 권장사항
## 사용을 권장하는 상황
언제 중단되어도 크게 상관 없는 가벼운 사이드 프로젝트, 단순 아이디어를 검증해보고자 하는 목적에서 만드는 서비스의 프로토타입 등을 구축할 때 유용하게 사용할 수 있다. [[Firebase]]에서 제공하는 다양한 기능들은 적은 노력으로도 서비스를 구축하고 돌려볼 수 있도록 제공한다. 특히 [[Firebase]]나 [[AWS/amplify]]는 그 규모도 상당히 커서 유료 플랜까지 고려하면 상당히 큰 규모로 서비스를 구축해 시도해볼 수 있다.

## 사용을 권장하지 않는 상황
장기적으로 운용될 본 서비스를 구축하는 것은 지양해야 한다. [[Firebase]]가 서비스 구축을 쉽게 해주기는 하지만 그 기능을 이용하게 되면 백엔드 및 데이터비스 등을 대부분 [[Firebase]]에 의지하게 된다. 때문에 [[Firebase]]의 정책 변경 등에 상당한 영향을 받게 되고, 도중에 [[Firebase]]를 떠나려고 해도 서비스의 백엔드와 데이터베이스등을 통째로 대체하는 작업이 필요해 쉽지 않다. 특히나 서비스 중단이 치명적인 경우에는 더더욱 힘들다.

# 시작하기
1. **firebase console**로 들어간다.
2. 프로젝트 생성을 누른다.
3. 프로젝트 이름, **Google Analystics** 사용 여부 등을 정하고 생성한다.
4. 원하는 형태의 앱을 고르고 앱을 생성한다.
5. 앱 생성 이후 안내되는 방식으로 작업 환경에 firebase를 연결한다.

# API
API_참고문서::[Firebase API Reference (google.com)](https://firebase.google.com/docs/reference)

## 인증
API_인증_참고문서::[Firebase 인증 (google.com)](https://firebase.google.com/docs/auth/)
API_filebase.auth_참고문서::[auth | JavaScript SDK  |  Node.js (client) API reference  |  Firebase (google.com)](https://firebase.google.com/docs/reference/node/firebase.auth)

### 인증 수단 추가
**firebase console**에서 **Authociation > Sign-in Method** 텝을 들어가면 다양한 인증 수단을 선택할 수 있다. 

다양한 인증 수단을 간단하게 제공할 수 있지만 일부 인증 수단의 경우(github 등) 약간의 추가적인 조치가 필요할 수 있다.

**참고: github 인증을 추가하는 방법**: `github > Profile Setting > Developer Settings > OAuth Apps`을 통해 새로운 github app을 추가해주면 된다. 이 때 *homepageURL*은 개발자가 구축한 서버의 URL(실습에서는 *승인 콜백 URL*의 일부, `.com` 까지만 잘라 사용)을 넣어주면 되고, *Authorization callback URL*은 말 그대로 **firebase console**에서 제공해준 *승인 콜백 URL*을 집어넣어주면 된다.
