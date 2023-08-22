# 개요 
[[javascript]]에서 사용하는 오브젝트의 유형을 딴 데이터 정의 방식이다. 

# 구성
```js
// comment
/*
	multi line comment
*/

{ // loot object
	key: value, // element
	key: { // object
		key: value,
		...
	}, 
	key: [ // array
		value, value, value, ...
	],
	...
}
```

# json 객체 
```js
JSON.stringify(object); 
	// `javascript object`를 `json` 방식의 문자열로 변환한다.
	// `ajax`를 위한 데이터로 사용되거나,
	// 콘솔 등에서 `javascript object`의 내용을 깔끔히 출력하거나 할 때 사용한다.
JSON.parse(string);
	// `json` 형식으로 작성된 문자열을 해석하여 `javascript object`로 만든다.
	// `ajax`를 통해 서버에서 데이터를 받는 경우 해당 값은 문자열로 오는데
	// 이를 데이터로 변환하기 위해 주로 사용한다.
```

# json 관련된 메소드
## response.json()
`$response.json() -> $promise`

요청으로 입력된 문자열 데이터를 ==javascript object== 타입으로 변환시켜준다.