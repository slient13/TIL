# 개요
[[MySQL]]의 제약 조건을 정리한 문서이다.

# 종류
- `NOT NULL` // 해당 속성에 대해 `null값`을 허용하지 않는다. 즉, 해당 속성을 비워놓고 입력할 수 없다.
- `UNIQUE` // 해당 속성은 `null값`을 제외하고 다른 [[MySQL#record]]와 중복되는 값을 가질 수 없다.
- `AUTO_INCREMENT` // 해당 속성은 임의로 입력할 수 없으며, 자동으로 증가하는 값이 적용된다.
- `PRIMARY KEY` // 해당 속성을 **기본키**로 정의한다. 기본키는 기본적으로 `NOT NULL`, `UNIQUE` 두 가지 제약조건이 자동으로 적용된다.