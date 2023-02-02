
### ex.PathVariable
```java
// 예시
@GetMapping(value = "/variable1/{variable}")
public String getVar1(@PathVariable String variable) {
	return variable;
}
```

## ex.RequestParam
```java
// 가정: /test?var1=t1&var2=t2
@GetMapping(value = "/test")
public String getRequestParam(
	@RequestParam String var1, // 반드시 키값과 변수의 이름이 동일해야 한다.
	@RequestParam String var2
) {
	return var1 + ", " + var2; // t1, t2
}
```

```java
public String getRequestParam(@RequestParam Map<String, String> param) {
	StringBuilder sb = new StringBuilder();
	param.entrySet().forEach(map -> {
		sb.append(map.getKey() + ": " + map.getValue() + "\n");
	});
	return sb.toString();
}
```

```java
// DTO를 이용한 방식

/* MemberDTO.java */
public class MemberDTO {
    private String name;
    private String email;
    public String getName() {
        return name;
    }
    public String getEmail() {
        return email;
    }
}

/* TestController.java */
@RestController
public class TestController {
    @GetMapping(value = "/member")
    public String showMemberList(MemberDTO memberData) {
	    // 이렇게 DTO를 사용할 때는 ``@RequestParam` 어노테이션을 붙이지 않는다.
        return "name: " + memberData.getName() + 
	        ", email: " + memberData.getEmail();
    }
}
```