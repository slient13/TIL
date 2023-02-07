*역링크*: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL" && e.path.substring(0, 11) !== "__reference").filter((e) => e.path !== dv.current().file.link.path)`

# 기본 구조
```js
expect($testValue).$matcher($expectValue)
expect($testValue).not.$matcher($expectValue)
```
- `$testValue`는 테스트 대상 값이다. 보통은 테스트하고자 하는 함수를 실행한 결과값을 대입한다.
- `$expectValue`는 기대값이다. `$testValue`가 `$expectValue`에 대해 특정 기준의 범위 내 들어가면 성공으로 취급된다. 성공, 실패를 판단하는 기준은 `$matcher`에 따라 달라진다.
- 중간에 `not`을 포함시킬 수 있는데, 이 경우 조건이 반대로 적용된다. 즉 `$matcher`를 실행한 결과가 실패해야 성공으로 나온다.

# Common Matchers
```js
toBe($value)
toEqual($value)
toStrictEqual($value)
```

# Truthiness
```js
expect(n).toBeNull(); // pass only `null`
expect(n).toBeDefined(); // pass only `not undefined`
expect(n).toBeUndefined(); // pass only `undefined`
expect(n).toBeTruthy(); // pass only true
expect(n).toBeFalsy(); // pass only false
```

# Number
```js
  expect(value).toBeGreaterThan(3); // pass if `n > 3`
  expect(value).toBeGreaterThanOrEqual(3.5); // pass if `n >= 3`
  expect(value).toBeLessThan(5);// pass if `n < 5`
  expect(value).toBeLessThanOrEqual(4.5); // pass if `n <= 5`

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4); // pass if `n === 4`
  expect(value).toEqual(4); // pass if `n === 4`
```

# String
```js
expect('Christoph').toMatch(/stop/); // pass if 
```

# Array, iterable
```js
expect(arr).toContain(element); // pass if arr contain element
```

# Exception
```js
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK!');
}

test('compiling android goes as expected', () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  // You can also use a string that must be contained in the error message or a regexp
  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
  expect(() => compileAndroidCode()).toThrow(/JDK/);

  // Or you can match an exact error message using a regexp like below
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK$/); // Test fails
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/); // Test pass
});
```

# 참고
- (ref:: [Using Matchers · Jest](https://jestjs.io/docs/using-matchers))