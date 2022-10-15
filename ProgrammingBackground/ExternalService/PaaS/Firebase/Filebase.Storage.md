*역링크*: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL").filter((e) => e.path !== dv.current().file.link.path)`

# 개요
**Firebase**에서 제공하는 클라우드 형태의 저장소이다. 다양한 정보를 **Firebase**의 다른 서비스처럼 계층 형태로 데이터를 저장하며, 권한을 획득하면 저장된 파일들에 접근할 수 있다. 심지어는 참조자가 가리키는 것의 상위 문서에 대한 접근도 허용된다.

# 사용
## 초기 설정
```js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  storageBucket: ''
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
```

위 코드를 입력하면 **Cloud Storage Bucket**을 얻을 수 있다. 해당 버킷 객체를 이용하여 **Storage**에 접근할 수 있다.

## 참조 생성
**Cloud Storage**에 접근하기 위해서는 내부 정보에 접근 권한을 가진 **참조자**를 형성해야 한다. 다음의 코드들로 **참조자**를 생성하거나 조회, 탐색할 수 있다.

```js
import { getStorage, ref } from "firebase/storage";

// get reference
const storage = getStorage();  
const path = 'images/space.jpg';
const spaceRef = ref(storage, path); // pointer of 'images/space.jpg'

// get pointer
const imagesRef = spaceRef.parent; // pointer of 'image/'
const rootRef = spaceRef.root;  // poinrter of '/'
const childRefList = spaceRef.child(); // pointers of 'image/space/...'

// attribute
spaceRef.fullPath; // 'images/space.jpg'
spaceRef.name; // 'space.jpg'
spaceRef.bucket; // 해당 파일이 저장된 bucket의 이름.
```

*제한 사항*
- **UTF-8** 기준 참조자의 총 경로 길이(`reference.fullPath`)는 ` 1 ~ 1024 byte ` 범위 내에 포함되어야 한다.
- **캐리지 리턴**이나 **라인 피드** 문자는 사용할 수 없다. (즉, 경로상에 줄바꿈을 끼워넣을 수 없다)
- `{ #, [, ], *, ? }` 등의 문자도 파일 경로상에 포함할 수는 있다. 하지만 [[Firebase.RealtimeDatabase]] 등 다른 서비스에서 제대로 호환되지 않으므로 사용을 권장하지 않는다.

**참고**: (ref:: [웹에서 Cloud Storage 참조 만들기  |  Firebase Storage (google.com)](https://firebase.google.com/docs/storage/web/create-reference#limitations_on_references))

## 파일 업로드
**reference**를 생성하고 전용 함수를 이용해서 업로드를 수행한다.

- `uploadBytes($ref, $Blob | $Uint8Array ).then($callback)` // `$File` 혹은 `$Blob`(*참고*: [[Blob]]), `$Uint8Array` ,`$RawString` 등을 인수로 하여 업로드를 수행한다. 
	- 수행 후 `snapshot`을 담은 `promise`를 반환하는데 이를 then으로 받아 정상적인 업로드 여부를 확인할 수 있다.
- `uploadBytes($ref, $UploadData, $metadata)` // 파일을 업로드 할 때 `$metadata`를 같이 설정해서 업로드한다. 메타데이터는 [[json]] 형태로 작성한다.
- `uploadString($ref, $updateData, $dataType)` // 문자열을 입력받아 업로드한다. 이 때 해당 문자열을 어떻게 해석하는지에 대해 `$dataType`으로 지정할 수 있다. 가령 **Data Url**이라면 `data_url`으로 기입해주면 된다.
- `uploadBytesResumable(...) -> $uploadTask` // `uploadBytes`와 기본적인 기능은 동일하지만, 전송 과정을 제어할 수 있도록 하는 몇몇 기능들을 추가로 제공하는 객체를 반환한다. 
	- `$uploadTask.pause()` // 전송을 일시 정지한다.
	- `$uploadTask.resume()` // 일시 정지 중이던 전송을 다시 진행한다.
	- `$uploadTask.cancel()` // 전송을 취소한다.
	- `$uploadTask.on($eventName, $callback)` // 작업 진행상태에 따른 이벤트 리스너를 지정한다. `$callback`으로 제공되는 `snapshot`에는 전송 상태를 파악하기 위한 다양한 정보가 포함되어 있다. 

**참고**: (ref:: [웹에서 Cloud Storage로 파일 업로드  |  Firebase Storage (google.com)](https://firebase.google.com/docs/storage/web/upload-files))

## 파일 다운로드
**reference**를 생성하고 전용 함수를 이용해서 다운로드를 수행한다.

```js
getDownloadURL($ref)
	.then((url) => {...})
	.catch((error) => {...})
```

`getDownloadURL` 함수에 `$ref`를 넣어주면 해당 내용을 다운로드 받을 수 있는 다운로드 링크가 포함된 **promise**를 반환한다. 이를 `.then`으로 받아 처리할 수 있으며, `.catch`로 받아 예외처리를 할 수 있다.

다운로드 링크가 제공될 뿐 데이터를 처리하기 위한 다른 정보가 같이 제공되지는 않으므로, 데이터 종류에 따라 적절한 처리 방법을 구현해야 한다.

**참고**: (ref:: [Download files with Cloud Storage on Web  |  Firebase Storage (google.com)](https://firebase.google.com/docs/storage/web/download-files))

## 파일 삭제
```js
deleteObject($ref)
	.then(() => {...})
	.catch((error) => {...})
```

`deleteObject` 함수를 이용해서 파일을 삭제할 수 있다. **promise**를 반환하므로, 이를 이용해서 삭제 성공 여부 및 성공/실패 시 후처리를 구현할 수 있다.

**참고**: (ref:: [Delete files with Cloud Storage on Web  |  Firebase Storage (google.com)](https://firebase.google.com/docs/storage/web/delete-files))