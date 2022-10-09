# 기타
- `USE $database` // `$database`를 명령의 대상으로 변경한다.
- `SHOW (DATABASE | SCHEMAS) [LIKE $pattern | where $expr]` // `database`의 목록을 출력한다. `$pattern`이나 `$expr`으로 출력 대상을 한정할 수 있다.
- `SHOW TABLES` // 현재 사용중인 [[MySQL#database]]에 포함된 [[MySQL#table]]목록을 출력한다.

# 명령어
## DDL
### schema 관련
#### 생성
- `CREATE DATABASE $database-name;` // `$database`를 생성한다.

#### 삭제
- `DROP DATABASE $database-name;` // `$database`를 제거한다.

### table 관련
#### 생성
```mysql
CREATE TABLE $tableName (
	$column-name $type $constraint, ...
	PRIMARY KEY($primaryKeyColumn)
);
```
테이블을 생성하는 명령어
- `$type` // [[MySQL dataType]] 참고
- `$constraint` // [[MySQL constraint]] 참고

*참고*
ref:: [MySQL 8.0 Reference Manual - 13.1.20 CREATE TABLE Statement](https://dev.mysql.com/doc/refman/8.0/en/create-table.html)

```mysql
CREATE TABLE $table_name
	$select_subquery
```

`$subquery`의 결과를 이용하여 새로운 테이블을 생성한다.

#### 갱신
```mysql
RENAME TABLE $before TO $after
```

[[MySQL#table]]의 이름을 `$before`에서 `$after`로 변경한다.

```mysql
ALTER TABLE $table_name
$action
```

- `$action = ADD $col $col_type $constraint` // `$table`에 새로운 속성을 추가한다.
- `$action = MODIFY $col $col_type $constraint` // `$table`의 속성 중 `$col`의 정의를 변경한다.
- `$action = DROP $col` // `$table`에서 `$col`을 제거한다.

*참고*
ref:: [SQL ALTER TABLE Statement (w3schools.com)](https://www.w3schools.com/sql/sql_alter.asp)

#### 삭제
- `DROP TABLE $table-name;` // `$table`을 제거한다.

## DML
### 조회
```mysql
SELECT $col [AS $name], ...
[FROM $table]
[WHERE $condition]
[GROUP BY $col, ...]
[HAVING $groupCondition]
[ORDER BY $col [ASC | DESC], ...]
[LIMIT $limitCount]
```

- `SELECT` // 가지고 올 행을 지정한다. `$col`은 표현식에 따라 단순히 행을 가지고 오는 것 이외에 행간 연산을 지정할 수도 있다.
	- `AS $name` // 행의 이름을 `$name`으로 출력한다.
- `FROM` // 질의 대상으로 하는 [[MySQL#table]]을 지정한다.
- `WHERE` // 질의 대상의 [[MySQL#record]] 중 `$condition`에 적합한 것만 추출한다.
- `GROUP BY` // 질의 대상을 특정 속성의 값을 대상으로 그룹화 한다. 지정되지 않은 속성의 값은 하나로 합쳐지며, `SELECT` 문에서 [[#그룹 함수]]로만 호출할 수 있다.
- `HAVING` // `GROUP BY`로 묶이지 않은 속성들을 대상으로 필터링 조건을 지정한다. `WHERE`과 유사하지만 여기서는 [[#그룹 함수]]를 조건의 연산으로 사용한다.
- `ORDER BY` // 결과물을 특정 속성을 기준으로 정렬하여 출력한다. 정렬 방향의 기본값은 `AES`, 즉 오름차순이다.
- `LIMIT` // 출력되는 결과물의 개수를 `$limitCount`로 제한한다.

*참고*
ref::[SQL SELECT Statement (w3schools.com)](https://www.w3schools.com/sql/sql_select.asp)

### 삽입
- `INSERT INTO $table-name ($col, ...) values ($value, ...) ` // `$table`에 `$col`에 맞춰 `$value`를 대응해 새로운 [[MySQL#record]]를 추가한다. 생략된 `$col`에는 `null`값이 들어가며, 만약 해당 column이 `NOT NULL` 제약 조건을 가진 경우 오류가 발생하고 추가되지 않는다.
- `INSERT INTO $table-name values ($value, ...)` // [[MySQL#table]]의 [[MySQL#column]] 순서에 따라 매칭해서 새로운 [[MySQL#record]]를 추가한다. 이 때는 모든 속성에 대응해서 값을 입력시켜주어야 한다.
- `INSERT INTO $table-name ($col, ...) $subquery` // `$subquery`의 결과물을 `$table`에 매칭하여 추가한다. 이 때 대응되는 column들의 이름은 동일해야 한다.

### 변경
```mysql
UPDATE [LOW_PRIORITY] [IGNORE] $table_reference
	SET $assignment_list
	[WHERE $condition]
```

```
$assignment_list: $assignment, ...
$assignment: $col = $value
$value: $expr | DEFAULT
```

`$table`의 모든 [[MySQL#record]]에 대해 `$col`의 값을 `$value`로 변경한다.
- `WHERE` 변경 대상을 필터링한다.

*참고*
ref::[SQL UPDATE Statement (w3schools.com)](https://www.w3schools.com/sql/sql_update.asp)

```mysql
UPDATE $target_table, $subquery as $alter_name
SET $target_table.$col = $alter_name.$col, ...
WHERE $condition
```

위와 같은 방법으로 subquery를 이용해 일괄적인 업데이트를 진행할 수 있다.

*참고*
ref::[Mysql, Select결과를 Update 문에 반영하기 - 겨울팥죽 여름빙수 (tistory.com)](https://shakddoo.tistory.com/entry/Mysql-Select%EA%B2%B0%EA%B3%BC%EB%A5%BC-Update-%EB%AC%B8%EC%97%90-%EB%B0%98%EC%98%81%ED%95%98%EA%B8%B0)

### 삭제
``` sql
DELETE FROM $table_name
	[WHERE $condition]
```

`$table` 내 [[MySQL#record]]를 제거한다.
- `WHERE` // 삭제 대상을 필터링한다. 만약 생략하면 `$table` 내 모든 원소를 제거한다. (*참고: 모든 원소가 삭제된다고 테이블 자체가 사라지는 것은 아니다. 테이블 삭제는 [[#table 관련#삭제]]를 참고할 것*)

## DCL

# 연산
## 논리 연산
- `$cond_L OR $cond_R` // `$coud_L`, `$cond_R` 둘 중 하나라도 `TRUE`이면 결과도 `TRUE`이다. 아니라면 `FALSE`이다.
- `$cond_L AND $cond_R` // `$coud_L`, `$cond_R` 둘 다 `TRUE`라면 결과도 `TRUE`이다. 아니라면 `FALSE`이다.
- `NOT $cond` // `$cond`가 `TRUE`이면 `FALSE`, 반대로 `FALSE`이면 `TRUE`이다.

## 조인 연산
두 개의 테이블을 특정 기준으로 결합하는 연산이다.

### left join
두 개의 테이블을 결합할 때 매칭되지 않는 [[MySQL#record]]가 있다면 좌항의 것만 남긴다.

```mysql
$table_L LEFT JOIN $table_R
	ON $table_L.$col = $table_R.$col
```

`$table_L`과 `$table_R`을 `$col` 속성을 기준으로 값이 같은 것끼리 매칭해 [[#left join]]한다. (두 테이블의 대응 속성 이름은 다를 수 있다.)

### right join 
[[#left join]]과 유사하나, 반대로 우항의 것만 남긴다.


```mysql
$table_L RIGHT JOIN $table_R
	ON $table_L.$col = $table_R.$col
```

`$table_L`과 `$table_R`을 `$col` 속성을 기준으로 값이 같은 것끼리 매칭해 [[#right join]]한다. (두 테이블의 대응 속성 이름은 다를 수 있다.

### full join
[[#left join]]과 유사하나 좌항, 우항 둘 다 남긴다.

# 함수
## 그룹 함수