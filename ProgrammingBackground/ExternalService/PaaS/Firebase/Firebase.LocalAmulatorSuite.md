#inProcess 
*역링크*: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL").filter((e) => e.path !== dv.current().file.link.path)`

# 개요
Firebase를 이용한 서비스 개발 과정에서 불필요한 비용이나 잘못된 영향 전파를 막고 안전하게 개발할 수 있도록 로컬 환경에서 Firebase 서비스를 모방해 대행해주는 개발 보조 도구이다.

참고: (ref::[Firebase 로컬 에뮬레이터 도구 모음 소개 (google.com)](https://firebase.google.com/docs/emulator-suite))

# 설치 및 기본 세팅
**Firebase CLI**를 이용해야 하기 때문에 **firebase-tools**를 전역으로 설치한다. **npm**을 사용한다면 `npm install -g firebase-tools` 명령어로 대신할 수 있다.

설치가 완료되면 원하는 프로젝트에 firebase 세팅을 해야 한다. 이는 `firebase init` 및 `firebase init emulators` 명령을 통해 수행할 수 있다. 해당 명령을 입력하면 어떠한 기능을 사용하는지, 어떠한 포트로 애뮬레이터와 연결할지를 지정하게 되며, 모든 입력이 완료되면 관련 설정이 세팅된다.

이후 애뮬레이터를 실행하면 된다. `firebase emulators:start` 명령을 입력하면 애뮬레이터가 실행되며, 사전에 지정한 포트(기본 4000)를 통해 UI 모드로 진입할 수 있다.

참고: (ref::[로컬 에뮬레이터 도구 모음 설치, 구성, 통합  |  Firebase 로컬 에뮬레이터 도구 모음 (google.com)](https://firebase.google.com/docs/emulator-suite/install_and_configure))

# 연결
애뮬레이터를 실행했다고 바로 앱의 모든 기능이 연결되지는 않는다. 연결을 위해서는 프로젝트 파일에 약간의 조치가 필요하다.

## 인증
## Firestore
```js
// eslint-disable-next-line no-restricted-globals
if (location.hostname === 'localhost') {
    fbDB = getFirestore();
    connectFirestoreEmulator(fbDB, 'localhost', 8080);
}
else {
    fbDB = getFirestore(fbApp); // 실 서비스 시 사용
}
```

`connectFirestoreEmulator($Firestore, $hostname, $port)`  함수를 실행하면 `$Firestore`에 실제 서비스 데이터베이스가 아닌 로컬 환경의 테스트용 에뮬레이터 데이터베이스로 연결되는 객체가 저장된다. 

이렇게만 해줘도 다른 **Firestore**를 사용하는 모든 코드들이 로컬 에뮬레이터를 이용하게 전환되므로 손쉽게 비용 걱정 없이 다양한 테스트를 시도해볼 수 있게 된다.

그 외 **Firebase Console**에서 데이터베이스를 직접 조작할 수 있었듯, **Emulator UI**를 이용해서 로컬 에뮬레이터의 데이터베이스를 수정할 수도 있다.
