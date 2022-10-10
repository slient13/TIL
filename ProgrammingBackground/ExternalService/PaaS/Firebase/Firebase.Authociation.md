*역링크*: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL")`

 *참고*
references::Firebase/Authociation: [Firebase 인증 (google.com)](https://firebase.google.com/docs/auth)

# 인증 수단 추가
**firebase console**에서 **Authociation > Sign-in Method** 텝을 들어가면 다양한 인증 수단을 선택할 수 있다. 

다양한 인증 수단을 간단하게 제공할 수 있지만 일부 인증 수단의 경우(github 등) 약간의 추가적인 조치가 필요할 수 있다.

**참고: github 인증을 추가하는 방법**: `github > Profile Setting > Developer Settings > OAuth Apps`을 통해 새로운 github app을 추가해주면 된다. 이 때 *homepageURL*은 개발자가 구축한 서버의 URL(실습에서는 *승인 콜백 URL*의 일부, `.com` 까지만 잘라 사용)을 넣어주면 되고, *Authorization callback URL*은 말 그대로 **firebase console**에서 제공해준 *승인 콜백 URL*을 집어넣어주면 된다.

# 인증용 코드 추가
## 이메일
### 초기 설정
```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = { 
  ...
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
```

### 이메일을 통한 신규 계정 등록 및 로그인
```js
import { 
	createUserWithEmailAndPassword, 
	signInWithEmailAndPassword 
} from "firebase/auth";

// 신규 계정 등록
createUserWithEmailAndPassword(
	firebaseAuth, 
	email: string, 
	password: string
)

// 이메일을 통한 로그인
signInWithEmailAndPassword(
	firebaseAuth, 
	email: string, 
	password: string
)
```

### 인증 정보 유지 단위
references::Firebase/Authociation/인증상태지속성: [인증 상태 지속성  |  Firebase (google.com)](https://firebase.google.com/docs/auth/web/auth-state-persistence)
```js
firebase.auth.Auth.Persistence.LOCAL
// 로컬 환경에서 인증상태 유지. 명시적으로 로그아웃 하지 않는 이상 브라우저가 종료되거나 React Native 활동이 종료되어도 인증 상태가 유지됨.
// 기본값임.

firebase.auth.Auth.Persistence.SESSION
// 세션 단위 혹은 탭 단위로 인증 상태 유지.

firebase.auth.Auth.Persistence.NONE
// 인증 정보를 기억하지 않음. 오로지 메모리에만 저장되며, 창이나 활동이 새로고침되는 등 메모리가 초기화되면 인증 상태도 초기화됨.

```

### 로그인 상태 확인
인증 정보를 확인하는 과정은 비동기로 이루어진다. 때문에 eventListener 등을 이용하여 비동기적인 응답을 확인해주어야만 제대로 로그인 여부를 확인할 수 있다.

이에 대해 firebase 측에서는 `Auth.onAuthStateChanged($callback)`라는 메소드를 제공하는데, 해당 메소드는 일종의 이벤트리스너로써 인증 상태 정보가 변경되면 `$callback`을 호출한다. 

*참고*
ref:: Firebase/API/Auth: [Auth | JavaScript SDK  |  Firebase JavaScript API reference (google.com)](https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#onauthstatechanged)

```js
// useEffect를 이용하여 로그인 상태를 반영하는 코드
// '$'이 붙은 명칭은 임의로 지정한 것을 의미함.
useEffect(() => {    
	$auth.onAuthStateChanged((user) => {
		if (user) {
			$setIsLoggedIn(true);        
		} else {
			$setIsLoggedIn(false);
		}
		$setInit(true);
	});
}, []);
```

### 기타
만약 로그아웃 기능이 구현되지 않았는데 로그아웃 시켜야 할 일이 생기는 경우 개발자 도구의 **Application > IndexedDB > firebaseLocalStorageDb > firebaseLocalStorage > firebase.authUser**의 내용을 지워주면 된다. 단, 부작용이 발생할 수도 있으니 개발 초기에만 제한적으로 사용하는 것을 권장한다.

## Social Login
공통적으로 **Firebase**에서 제공하는 **AuthProvider**를 이용하여 절차를 진행하게 된다. 

**AuthProvider**는 다음 링크 참고: (ref:: Firebase/API/Auth/AuthProvider: [AuthProvider | JavaScript SDK  |  Firebase JavaScript API reference (google.com)](https://firebase.google.com/docs/reference/js/v8/firebase.auth.AuthProvider))

### popup 방식
인증용 새로운 창이 띄워져 과정이 진행된다. 

*참고*: (ref:: Firebase/API/Auth#signInWithPopup: [Auth | JavaScript SDK  |  Firebase JavaScript API reference (google.com)](https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signinwithpopup))

### redirect 방식
인증용 페이지로 화면이 전환된다.
