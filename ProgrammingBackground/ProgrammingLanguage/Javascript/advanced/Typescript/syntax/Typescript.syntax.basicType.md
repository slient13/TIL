*역링크*: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL" && e.path.substring(0, 11) !== "__reference").filter((e) => e.path !== dv.current().file.link.path)`

# basic Type
## primitive data type
```ts
const numberVar: number; // variable of number
const bigintVar: bigint; // variable of bigint
const stringVar: string; // variable of string
const booleanVar: boolean; // variable of boolean
const anyVar: Any; // any type can be assigned to here.
```

## object
```ts
// object
// It can be assign and reassign by object data.
// It's properties are fixed. You can access only exist properties.
const objVar: object;
objVar = {
	param: "test",
}

// properties defined object
// It can be assign and reassign by object data.
// But that object data must be contain defined properties.
const attrDefObjVar: {
	paramInt: int;
	paramStr: string;
	paramBool: boolean;	
} = {
	paramInt: 3,
	paramStr: "string",
	paramBool: true,
}

// key type defined object
const keyTypeDefVar: {
	[key: string]: int
} = {
	'param_A': 123,
	'param_B': 123,
	'param_C': 123,
}

// Object
// All of type in javascript are extended from Object, so every data can be assigned to `Object` type.
const ObjVar: Object;
ObjVar = 123;
ObjVar = "str";
ObjVar = { param: "value" };

// It's same with Object.
const ObjVarShortcut: {};
```

## 비고
`Object`는 원시 자료형을 포함해 모든 자료형을 대입할 수 있다는 특성 덕분에 말 그대로 모든 값을 받을 수 있는 `Any`와 유사한데, 세부적으로는 약간의 차이가 있다.

`Any`의 경우 말 그대로 모든 값이 들어올 수 있기 때문에 해당 값에서 특정 메소드를 참조해 실행하려 시도하는 경우에도 속성이 존재하든 말든 트랜스파일 에러가 발생하지 않지만, `Object`는 가장 최상위의 객체 타입 `Object`를 의미하는 것이기 때문에 `Object.prototype`에 포함되어있지 않은 메소드를 호출하려고 하면 트랜스파일 에러가 발생한다.

참고: (ref:: [Typescript - Object vs object vs {}](https://velog.io/@njh7799/typescript-Object-vs-object-vs-))

## Array
```ts
// Array with one type
// Next variable can be added or modified only target type value.
const numberList: number[];
numberList = [11, 76, 35, 22];

// Array with two or more types
const multiTypeList: (number | string)[];
multiTypeList = [1, 3, "test", 5, "value"];

// Tuple
// Next variable only can have elements which defined.
const tuple: [number, string];
tuple = [123, "str"];

// Optional tuple
// Next variable only can have elements which defined.
// But some properties are optional.
const optionalTuple: [number, number, number, number?]
optionalTuple = [255, 255, 255];
optionalTuple = [255, 255, 255, 0.5];
```

## special type
```ts 
// void
// This means this function is not contain any return.
// Trying to use return value of this function will occur error.
const nonRetureFunc: () => void
// This type can be used on type of variable.
// But it can be assigned only `undefined` or `null`.

// never
// This type means there is no value.
// You can use this only return type of function
// , and that means this function will return error 
// or fall into infinite loop.
function returnError (message: string): never {
	return new Error(message);
}
```
