# 개요
1차원 배열 형태로 무수히 많은 객체 정보가 들어오는 경우 이를 적절히 표시하기 위해 그룹화 하려면 어떤 방법을 사용해야 하는가에 대한 문제

# 접근
- 하나 혹은 그 이상의 기준을 가지고 계층형으로 분류할 필요가 있다.
- 분류된 각 객체가 어떤 기준에 의해 분리되었는지를 식별할 수 있어야 한다.
- 개발자는 손쉽게 분류 기준을 정하거나 늘리고 줄일 수 있어야 한다.

# 풀이
## 초반 풀이
```js
const testData = [
    { a: 1, b: 3, c: 6, d: 3},
    { a: 1, b: 3, c: 6, d: 6},
    { a: 1, b: 4, c: 7, d: 8},
    { a: 2, b: 3, c: 6, d: 1},
    { a: 2, b: 5, c: 4, d: 6},
    { a: 2, b: 3, c: 5, d: 5},
    { a: 3, b: 2, c: 2, d: 7},
    { a: 3, b: 2, c: 2, d: 5},
    { a: 3, b: 3, c: 6, d: 1},
]

Array.prototype.groupBy = function (callback) {
    let output = {};
    for (let i = 0; i < this.length; ++i) {
        const data = callback(this[i]);
        if (output[data] === undefined) output[data] = [];
        output[data].push(this[i]);
    }
    return output;
}

Object.prototype.map = function(callback) {
    let newObj = {};
    const entries = Object.entries(this);
    for (let i = 0; i < entries.length; ++i) {
        newObj[entries[i][0]] = callback(entries[i][1]);        
    }
    return newObj;
}

console.log(testData);
console.log("===================================");
console.log(JSON.stringify(
    testData.groupBy(e => e.a).map(l => {
        return l.groupBy(e => e.b).map(l => l.groupBy(e => e.c))        
    })
, null, 2));
```

1차원 배열이라는 부분에 착안해, 개별의 각 원소를 콜백의 결과값에 따라 객체의 속성으로 분류하고 거기에 집어넣는 식으로 구현하였다. 다만 이렇게 해서는 1차원 배열로 이루어진 첫 순간에만 분류가 가능했으며, 이를 해소하기 위해 `Object` 전용 map 메소드를 직접 구현하고 콜백 안에서 콜백을 쓰는 등 콜백 지옥이 발생하여 사용법이 매우 까다로웠다.

## 향상된 풀이
```js
// 실험용 값
const testData = [
    { a: 1, b: 3, c: 6}, // d가 빈 값(그룹 기준이 아님)
    { a: 1, b: 3, c: 6, d: 6},
    { a: 1, b: 4, c: 7, d: 8},
    { a: 2, b: 3, c: 6, d: 1},
    { a: 2, b: 5, c: 4}, // d가 빈 값(그룹 기준이 아님)
    { a: 2, b: 3, c: 5, d: 5},
    { a: 3, b: 2, d: 7}, // c가 빈 값(그룹 기준이며 마지막 기준임)
    { a: 3, b: 2, c: 2, d: 5},
    { b: 3, c: 6, d: 1}, // a가 빈 값(그룹 기준이며 첫번째 기준임)
]
/*
 * arr: 지정한 규칙대로 그룹화 할 배열 (원본 손상 없음)
 * callback: 처리할 규칙을 지정하는 콜백 함수. { e => [조건들] }의 형태를 가짐.
 * isAllowNull: 그룹화 기준 속성을 가지지 않은 경우도 허용하는지 여부.
 */
function groupBy(arr, callback, isAllowNull = true) {
    let output = {};
    for (let i = 0; i < arr.length; ++i) {
        const dataList = callback(arr[i]);
        const size = dataList.length;
        let tmp = output;
        // 기준 값 중 undefined가 포착되면 해당 데이터의 입력은 생략.
        if (!isAllowNull) {
            let hasNull = false;
            for (let k = 0; k < size; ++k) {
                if (dataList[k] === undefined) {
                    hasNull = true;
                    break;
                }
            }
            if (hasNull) {
                continue;
            }
        }
        // 점진적으로 적절한 위치로 접근하며 포인터 이동. 필요시 초기화 병행
        for (let k = 0; k < size; ++k) {
            const data = dataList[k] ?? "NULL";            
            if (k < size - 1) { 
                tmp[data] = tmp[data] ?? {}; 
            } else { // 맨 마지막은 객체가 아니라 배열을 사용해야 하므로
                tmp[data] = tmp[data] ?? [];
            }
            tmp = tmp[data];
        }
        // 데이터 추가
        tmp.push(arr[i]);
    }
    return output;
}
// 출력 테스트
console.log(testData);
console.log("==========================");
const groupedTestData = groupBy(testData, e => [e.a, e.c]);
console.log(JSON.stringify(groupedTestData, true, 2));
console.log("==========================");
const groupedTestDataWithoutIncorrectData = groupBy(testData, e => [e.a, e.c], false);
console.log(JSON.stringify(groupedTestDataWithoutIncorrectData, null, 2));
```

그룹화 할 때는 한 번에 조건을 전달하는 것이 편하다는 부분에서 `callback` 함수가 단일 값이 아닌 배열을 반환하도록 고치고, 반복문 내에서 재귀를 본딴 점진적 확장을 행하여 한 번에 필요한 분류 구조를 구축하였다.

원본 배열은 손상시키지 않으면서도 불필요하게 객체나 배열을 복사하지 않아 준수한 성능을 보여주고 사용법도 훨씬 간편해졌다.

또한 추가로 정렬 기준으로 사용하는 속성이 없는 원소에도 대응할 수 있도록 함수를 개조하였다.

### 개선해야 할 부분
여전히 각 분류가 `무슨 기준으로` 분류되었는지는 알 수 없어 이에 대한 정보는 별도로 관리해야만 한다는 단점이 있다. 