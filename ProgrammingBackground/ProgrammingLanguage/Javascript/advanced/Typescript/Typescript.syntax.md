*역링크*: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL" && e.path.substring(0, 11) !== "__reference").filter((e) => e.path !== dv.current().file.link.path)`

# 문법
## basic type
[Typescript.syntax.basicType](syntax/Typescript.syntax.basicType.md)

## complex type
[Typescript.syntax.complextType](syntax/Typescript.syntax.complextType.md)

## operation
```ts
const variable: SomeType // variable의 타입이 `SomeType`임을 명시
const variable?: SomeType 
	// 위와 유사하나 `variable`에는 `undefined`도 들어갈 수 있음을 명시
const variable!: SomeType
	// 위와 유사하나 `variable`은 로직상 반드시 값이 할당됨을 명시
variable!.property
	// 참조하는 대상이 `undefined | null`이 아님을 명시.
variable! // 해당 변수는 사용 시점에 `undefined | null`이 아님을 명시
```

## Function
[Typescript.syntax.function](syntax/Typescript.syntax.function.md)

## class
[Typescript.syntax.class](syntax/Typescript.syntax.class.md)

## etc
[Typescript.syntax.etc](syntax/Typescript.syntax.etc.md)
