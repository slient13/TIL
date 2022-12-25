*역링크*: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL" && e.path.substring(0, 11) !== "__reference").filter((e) => e.path !== dv.current().file.link.path)`

# etc
## optional parameters
```ts
// Next variable can be assigned with string or undefined type.
const nullableString?: string
nullableString = "string";
nullableString = undefined;

// On function definition, optional type must be placed later of non optional type.
function func(a: number, b: number, c?: number): void { ... }
```

## type guard
```ts
// type comparison
let strVar: string = "test";
console.log(typeof strVar) // print "string"

// class instance comparison
class C { 
	method(): void { ... }
}
const c = new C();
console.log(c instanceof C) // true
console.log(method in c) // true
console.log(another in c) // false
```

## type casting
```ts
// type casing
class Super { ... }
class Sub extends Super { ... }
const sub: Sub = new Sub;
// up casting
const sup: Super = sub as Super; // === <Super>sub
// down casing
const anotherSub = sup as Sub; // === <Sub>sup

// 아래와 같이 상황에 따라 다른 유형의 반환을 가진 함수가 있는 경우
// 어떤 유형의 반환형을 사용하는지를 명시하는데도 사용할 수 있다.
function getNetPrice(price: number, discount: number, format: boolean): number | string {
    let netPrice = price * (1 - discount);
    return format ? `$${netPrice}` : netPrice;
}
let netPrice = getNetPrice(100, 0.05, true) as string;
console.log(netPrice);
```
