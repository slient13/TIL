*역링크*: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL" && e.path.substring(0, 11) !== "__reference").filter((e) => e.path !== dv.current().file.link.path)`

# 개요
**Firebase Hosting** 서비스는 개발한 앱을 손쉽게 배포할 수 있도록 제공하는 서비스이다.

# 절차
1. 빌드를 수행하거나 기타 방법으로 배포용 파일을 준비한다. (**react**의 경우 `npm run build`를 실행한다.)
2. `firebase init hosting` 명령을 실행하여 **Firebase Hosting**을 이용해 배포하기 위한 설정을 프로젝트에 적용한다.
3. `firebase deploy --only hosting` 명령을 수행함으로써 배포를 진행한다. 특별한 문제가 없다면 이것으로 배포 과정이 끝난다.

**참고**: (ref:: [Firebase 호스팅 시작하기 (google.com)](https://firebase.google.com/docs/hosting/quickstart))

# 호스팅 동작 설정
호스팅은 단순히 도메인 주소로 자신의 서비스에 접근할 수 있도록 하는 것 외에도 다양한 기능들을 제공한다. 이 때 어떠한 동작을 할지는 **firebase.json** 파일의 `hosting` 부분을 수정함으로써 지정할 수 있다.

**참고**: (ref:: [호스팅 동작 구성  |  Firebase 호스팅 (google.com)](https://firebase.google.com/docs/hosting/full-config))

## public
호스팅 시 포함할 폴더의 경로를 지정한다. 기본값은 `public`이고, **React**를 사용한다면 `build`를 대신 사용할 수 있다.

## ignore
```json
"ignore": [
	$무시할-파일-유형,
	...
]
```

배포할 때 해당 범위에 포함되지 않기를 바라는 파일이 존재하는 경우 이를 명시해 제외할 수 있다.

와일드카드 등을 이용해 특정 유형에 해당하는 파일을 일괄적으로 제외할 수도 있다.

## redirects
```json
"redirects": [
	{ 
		"source": $시작지-주소,
		"destination": $목적지-주소,
		"type": $리다이렉션시-HTTP코드
	}, 
	...
]
```

특정 주소로 진입했을 시 자동으로 목적지 주소로 전환시켜주는 역할을 한다.

## rewrites
```json
"rewrites": [
	{
		"source": $대상-주소,
		"destination": $목적지-주소		
	},
	...
]
```

[[#redirects]]와 유사하지만 새로운 주소로 옮겨주는 대신 현재 주소에서 목적지 주소의 내용을 출력하도록 설정한다. 예시를 들면 다음과 같다.

```json
"rewrites": [{
	"source": "**",
	"destination": "/index.html"
}]
```

위와 같이 작성되면 웹 페이지 진입시 상세한 주소를 입력하지 않아도 자동으로 **index.html** 파일의 내용을 출력해주게 된다.

# 커스텀 도메인 연결
별도로 지정하지 않고 배포를 시도한다면 firebase 측에서 자동 생성한 도메인 주소로 배포가 완료된다. 하지만 대부분의 경우 그 주소를 그대로 쓰는 것은 좋지 못하다.

이에 대해 보유한 커스텀 도메인이 있다면 특정한 절차를 통해 그 도메인 주소를 연결해줄 수 있다. 해당 절차는 아래 문서 참고.

**참고**: [커스텀 도메인 연결  |  Firebase 호스팅 (google.com)](https://firebase.google.com/docs/hosting/custom-domain)