# 개요
[[../DBMS/MySQL]]의 데이터 타입 목록을 정리한 문서이다.

참고:: [MySQL - MySQL 8.0 Reference Manual - 11 Data Types](https://dev.mysql.com/doc/refman/8.0/en/data-types.html)*

# 종류
## 숫자 관련 
*참고*: 괄호 속 입력값 `m`은 입력 데이터의 문자로 표현했을 때의 길이를 의미한다. 가령 `INT`의 경우 최대 자리수 10자리에 음수 표현 시 음수 기호까지 포함하여 11자리를 표현할 수 있어야 정상적으로 출력되므로 모든 값을 온전히 출력하고 싶다면 `m = 11`이 되어야 한다.

- `INT(m)` // 32bit 정수형 데이터를 담을 수 있는 자료형.
- `INTEGER(m)` // `INT(m)`과 동일.
- `BIGINT(m)` // 64bit 정수형 데이터를 담을 수 있는 자료형.

## 문자열 관련
*참고*: 괄호 속 입력값 `size`는 담을 수 있는 문자열의 최대 크기를 의미한다. 타입에 따라 적용할 수 있는 최대 문자열 개수가 정해져있다.

- `CHAR(size <= 255)` // `size`만큼의 고정 크기 문자열을 저장한다. 
- `VARCHAR(size <= 255)` // 최대 `size` 만큼의 가변 크기 문자열을 저장한다. 문자열의 길이가 짧으면 적은 메모리를, 크면 많은 메모리를 사용한다. 
- `TEXT(size <= 2^16)` // 최대 `2^16`개의 문자를 저장할 수 있다.
- `LONGTEXT(size <= (4GB | 2^32))` // `4GB` 크기 이내의 텍스트 파일이나, `2^32`개 이하의 문자를 저장할 수 있다.

## 날짜, 시간 관련
- `DATE` // 날짜를 표현하는 자료형.
- `DATETIME` // 날짜와 시간을 동시에 표현하는 자료형
- `TIME` // 시간을 표현하는 자료형. 상대적인 자료로써 `-838:59:59 ~ 838:59:59` 범위의 값을 가질 수 있음.
- `TIMESTAMP` // `1970-01-01`부터 시작하여 특정 시점까지 몇 초가 흘렀든지`1970-01-01 ~ 2038-01-19` 범위 내에서 값을 가질 수 있다.