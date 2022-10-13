역링크: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL")`

# 개요 
NoSQL 기반의 데이터베이스 서버를 제공해준다. 규칙은 많지 않지만 그 대신 직접 데이터베이스를 다루는 것에 비하면 자유도가 떨어진다.

관련 서비스로 **Firestore**, **Realtime Database**가 있다.

 # Firestore
 *참고*: (ref::firestore 개요: [Firestore  |  Firebase (google.com)](https://firebase.google.com/docs/firestore))

 ## 시작
**Firebase Console**에서 데이터베이스를 생성할 수 있다.

데이터베이스 생성 시 데이터베이스의 모드를 설정할 수 있는데 **production mode**는 실 서비스를 위한 데이터베이스로 기본적으로 외부에서의 접근이 막혀있으며, **test mode**는 개발 편의를 위해 30일 동안은 이러한 보안 제한을 적용하지 않는다.

데이터베이스 설정 시 이용하는 서버의 위치를 지정할 수 있는데, 접근이 잦을 것으로 예상되는 지역을 설정하면 된다. 국내 사용의 경우 `asia-northeast`로 설정하면 된다.

## 데이터베이스 설정
데이터베이스는 NoSQL 기반으로 **Collection**과 **Document**를 가지고 있다. **Firebase Console > Firestore Database > Data**를 조작하여 이를 생성, 수정, 제거 할 수 있다.
- **Collection**은 일종의 폴더와 같은 존재로, 다른 **Collection**이나 **Document**를 가지고 있다.
- **Document**는 실제 정보를 기록한 파일으로, 저장하고자 하는 데이터를 가지고 있다.
- **Field**는 **Document**에 저장되는 데이터들이 가지는 공통적인 속성이다.

위 방법 외에도 API를 통해 데이터베이스에 접근해 조작할 수도 있다.

## 코드 작성
**firebase/database**를 이용한다. 해당 파일에서 필요한 함수등을 가져올 수 있다.

### 데이터 생성 및 수정
*참고*: (ref::[Cloud Firestore에 데이터 추가  |  Firebase (google.com)](https://firebase.google.com/docs/firestore/manage-data/add-data))

`addDoc($Collection, $data-object)` 혹은 `setDoc($Collection, $data-object)`를 사용할 수 있다.

### 데이터 조회
*참고*: (ref::[Cloud Firestore로 데이터 가져오기  |  Firebase (google.com)](https://firebase.google.com/docs/firestore/query-data/get-data))

일반적으로 `getDocs($Collection)`을 이용한다. 해당 코드를 실행하면 `querySnapshot`이라는 데이터를 반환하는데, 여기에는 데이터를 포함하여 기타 유용한 정보가 함께 포함되어 있다.

`getDoc`은 해당 데이터베이스의 모든 데이터를 조회해 제공한다. 하지만 이는 비효율적이므로 백엔드측에서 미리 query를 수행하고 그 결과를 반환해주기를 바랄 수도 있다. 이 때 사용할 수 있는 것이 `query(...)`이다. 자세한 내용은 다음 참고. (ref::[Cloud Firestore에서 단순 쿼리 및 복합 쿼리 실행  |  Firebase (google.com)](https://firebase.google.com/docs/firestore/query-data/queries))

### 데이터 삭제
*참고*: (ref::firebase/firestore/API#deleteDoc: [@firebase/firestore  |  Firebase JavaScript API reference (google.com)](https://firebase.google.com/docs/reference/js/firestore_?hl=en#deletedoc))

`deleteDoc($DocumentReference)`를 이용한다. 저 코드를 실행 시 해당 document가 삭제된다. 단, 상위 컬렉션의 문서를 제거하였다고 하위 컬렉션이 같이 제거되지는 않는다.

컬렉션을 삭제하는 방법은 웹 환경에서는 제공되지 않는다. 이유는 그러한 행위가 권장되지 않기 때문. 그렇기에 웹 환경에서는 **Firebase Console**을 이용해야 한다.