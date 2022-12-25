*역링크*: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL" && e.path.substring(0, 11) !== "__reference").filter((e) => e.path !== dv.current().file.link.path)`

## class
### access modifiers
```ts
// All accesses are checking on compile time, not run time.
class C {
	// This var can be accessed only in this class.
	private privateVar: string;
	// This var can be accessed only in this class and sub class.
	protected protectedVar: string;
	// This var can be accessed from outside.
	public publicVar: string;
	// This is same with public modifier.
	autoPublicVar: string;

	// These can also be placed in constructor's parameters.
	constructor(private anotherPrivateVar: string) { 
		this.readonlyVar = "value";
		... 
	}
}
```

### readonly
```ts
class C {
	// This var can be assigned on only constructor.
	readonly readonlyVar: string;
}
```
### static
```ts
class C {
	// Next var is only one across all classes, and it is shared.
	private static staticVar: number;
}
```

### abscract class
```ts
// Abstract class can't have it's instance.
// This must be inherits.
abstract class Ab_C {
	// This function does not contain inplementation.
	// THis must be implemented in the derived class.
	abtract someFunc(param: number): number;
}
```
