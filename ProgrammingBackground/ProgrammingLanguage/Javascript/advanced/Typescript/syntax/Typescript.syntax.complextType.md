*역링크*: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL" && e.path.substring(0, 11) !== "__reference").filter((e) => e.path !== dv.current().file.link.path)`

# complex type
## interface
```ts
// Object
interface objInterface {
	attrNum: number;
	attrString: string;
	attrOptional?: string; // This can be omitted.
}
const objVar: objInterface = {
	// Need attributes `attrNum, attrString`
	attrNum: 10,
	attrString: "text",
	// attrOther: ["other"] // This is not allowed.
}; 

// function type
interface NumToStr {
	(num: number): string;
}
const func: NumToStr = (num: number): string => { ... }

// Class
interface classInterface {
	// properties
	num: number;
	str: string;
	// method
	act(param: string): string;
}
class someClass implements classInterface {
	num: number;
	str: string;
	constructor(num: number, str: string) {
		this.num = num;
		this.str = str;
	}
	act(param: string): string { ... }
}
```

### extend interface
```ts
interface A {
	a(): void;
}
interface B extends A {
	b(): void;
	// This has also `a()`.
}
```

## type
```ts
// type
// This keyword use to make aliases.
type UserData = { name: string, age: number };
const userData: UserData = {
	name: "name",
	age: 35
};
```

## intersection type
```ts
interface BusinessPartner {
    name: string;
    credit: number;
}
interface Identity {
    id: number;
    name: string;
}
interface Contact {
    email: string;
    phone: string;
}
// `interface & interface` will intersect both.
// Result has all properties of both interface
// , but if there are same properties will remove one.
// There is no meaning about intersection order.
// { id, name, email, phone }
type Employee = Identity & Contact;
// { name, credit, email, phone }
type Customer = BusinessPartner & Contact;
// { id, name, credit, email, phone }
type Employee = Identity & BusinessPartner & Contact;
```

## literal type
```ts
// This will must be true or false.
type myBool = true | false;
// This will must be 1 | 3 | 5 | 10
type myNum = 1 | 3 | 5 | 10;
```

## Union type
```ts
// Next variable can be string or array of string.
type strOrStrList = string | string[];
```

## generic
```ts
// Array
type StringArray = Array<string>;
type ObjectArray = Array<{attr: string}>;

// Function
// `U, V` will match with any type but is extended from object.
function merge<
	U extends object, 
	V extends object
>(obj1: U, obj2: V) {
    return { ...obj1, ...obj2 };
}
// If `K` is used normal generic, it can't be used for key of `T`.
// If `K` is `extneds keyof T`, it can be used for key of `T`.
function prop<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

// Class
class C<T> { ... }
class D<K, T> { ... }
type TypeA = { key: string, index: number };
class E<T extends TypeA> { ... }
```
