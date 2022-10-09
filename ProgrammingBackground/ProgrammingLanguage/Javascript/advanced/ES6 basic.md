#inProcess 

# Proxy
[[#trap]]을 이용하여 [[javascript]] 엔진의 저수준 연산을 가로채 대신 다른 동작을 하도록 한다. 인수는 `(target, handler)`이며, `handler`에는 오버라이딩 하길 원하는 [[#reflection]] 값을 지정해준다.

`handler`를 `{}`로 넣어 생략하면 마치 `target`의 참조를 지정한 것처럼 동작하게 된다. 다만 동등하진 않다.

## trap
### reflection
- `get`: getter
- `set`: setter
- `has`: in 연산자
- `deleteProperty`: delete 연산
- `getPrototypeOf`: getPrototypeOf()
- `setPrototypeOf`: setPrototypeOf()
- `isExtensible`: isExtensible() // 확장 가능한지 여부를 알려줌. 가령 배열이나 객체는 일반적으로 새로운 요소를 추가하여 확장하는 것이 가능하기에 `true`가 나오지만, `Object.freeze($)`로 확장을 제한하면 `false`가 나온다.
- `preventExtensions`: preventExtensions() // `Object.preventExtensions($)`는 해당 객체에 대해 확장을 제한한다. 가령 해당 함수를 적용한 객체에 새로운 속성을 추가하고 다시 내용을 확인하면 추가했던 내용은 제거되어 있다.
- `getOwnPropertyDescriptor`: getOwnPropertyDescriptor() // `Object.GetOwnPropertyDescriptor($, $property-name)`는 해당 객체가 보유한 특수한 속성을 보여준다. 예로 `enumerable`이란 속성은 해당 속성이 나열 가능한, 즉 `for (var e of $)` 이런 방식으로 순회 접근이 가능함을 의미한다. `$property-name`을 `$`와 동일하게 세팅해야 고유 속성들이 노출된다. 
- `defineProperty`: defineProperty() // `Object.defineProperty($, $key, $value)`는 `$`에 대하여 `$key: $value`로 구성된 고유 속성을 추가한다. 이렇게 추가된 속성은 단순히 객체를 추가한 것과 달리 `for (var e of $)`로 순회해도 읽히지 않는다.
- `ownKeys`: keys(), getOwnPropertyNames(), getOwnPropertySymbols()
- `apply`: 함수 호출 시
- `constructor`: new 연산자와 함께 호출 시

## 사용처
- ==logging== 혹은 ==관찰==
- 특정 객체에 대한 접근을 제한하기 위함.
- 동작이 수행되기 전 유효성을 검증하기 위함.
## 예시 코드
### 단순 프록시 지정
```js
const target = {}
const proxy = new Proxy(target, {});

proxy.name = 'abc';
console.log(proxy.name, target.name); // abc abc

target.name = 'def'
console.log(proxy.name, target.name); // def def

console.log(proxy === target); // false

```

### 간단한 유효성 검증
#### set을 통한 검증
```js
const target = {name: 'abc'};
const proxy = new Proxy(target, {
	set(trapTarget, key, value, receiver) {
		if (!trapTarget.hasOwnProperty(key)) {
			if (typeof value !== 'number' || number.isNaN(value)) {
				throw new Error('This property need to insert number.');
			}
		return Reflect.set(trapTarget, key, value, receiver);
		}
	}
})

proxy.name = 'def';
console.log(target.name, proxy.name); // def def

proxy.count = 10;
console.log(target.count, proxy.count); // 10 10

proxy.age = '30살'; // 오류 발생. 메시지: 'This property need to insert number.'
```

#### get을 통한 검증
```js
const proxy = new Proxy({}, {
	get(trapTarget, key, receiver) {
		if (!(key in receiver)) {
			throw new TypeError(`There is no key {${key}} on this object.`);
		}
		return Reflect.get(trapTarget, key, receiver);
	}
});

proxy.name = 'proxy';
console.log(proxy.age); 
// TypeError. msg: `There is no key {age} on this object.`
```

# 참고 자료
- ref:: [Javascript es6 bonus](https://www.inflearn.com/course/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-es6-%EB%B3%B4%EB%84%88%EC%8A%A4/dashboard)