# ConflictingBeanDefinitionException
## 오류 코드
```
org.springframework.context.annotation.ConflictingBeanDefinitionException: Annotation-specified bean name 'userController' for bean class [{기존 패키지}.UserController] conflicts with existing, non-compatible bean definition of same name and class [{변경된 패키지}.UserController]
```

## 원인
클래스 명이나 패키지 명 등을 변경하는 경우 `target` 폴더 내 동일한 이름을 가진 클래스가 여러 곳에 생성되는 문제가 생길 수 있는데, 그러면 위와 같은 오류가 발생한다.

이를 해결하기 위해서는 `mvn clean`을 입력하여 `target` 부분을 청소해주어야 한다.

참고: (ref:: [Class 혹은 Interface의 패키지를 변경할 때 유의할 점 : 네이버 블로그 ](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=muchine98&logNo=140160603454))

# MissingServletRequestParameterException
## 오류 코드
```
Resolved [org.springframework.web.bind.MissingServletRequestParameterException: Required request parameter 'id' for method parameter type long is not present]
```

`request parameter`에 인자가 제공될 때 타입이 맞지 않거나 `null` 값이 제공된 경우 발생하는 오류. 

## 원인
편의를 위해 `session`을 모든 트랜잭션 통틀어 하나로 유지했는데, 이 때문에 한 번 트랜잭션이 커밋되면 이후로는 변경사항을 적용하거나 할 수 없게 되었기 때문이다.

공통적으로 사용하는 것은 `session factory` 하나로 하고 `session`은 필요할 때마다 생성하고 종료하니 문제 없이 동작함을 확인할 수 있었다.