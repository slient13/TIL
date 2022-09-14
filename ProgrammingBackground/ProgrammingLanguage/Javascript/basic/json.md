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

# json 관련된 메소드
## response.json()
`$response.json() -> $promise`

요청으로 입력된 문자열 데이터를 ==javascript object== 타입으로 변환시켜준다.