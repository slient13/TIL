*역링크*: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL" && e.path.substring(0, 11) !== "__reference").filter((e) => e.path !== dv.current().file.link.path)`

# Function
## Function
```ts
// Function
function someFunction(param: Type, ...): returnType {
	// function body
}
function add(a: number, b: number): number {
	return a + b;
}
function print(input: boolean | number | string | object): void {
	console.log(input);
}

// Function type
let func = (param: Type) => ReturnValue;
```

## rest parameters
```ts
// "Rest Parameter" matches arbitrary arguments.
// "Rest Parameter" must be place later of other definite params.
function func (a: number, ...params: number[] ): returnType { ... }
func(10);
func(10, 20);
func(10, 20, 30);
```

## function overloading
```ts
// If a: number, b: number then return type must be number.
function add(a: number, b: number): number;
// If a: string, b: string then return type must be string.
function add(a: string, b: string): string;
// Function definition.
function add(a: any, b: any): any {
   return a + b;
}

// This can use with optional parameters
function sum(a: number, b: number): number;
function sum(a: number, b: number, c: number): number;
function sum(a: number, b: number, c?: number): number {
    if (c) return a + b + c;
    return a + b;
}
```
