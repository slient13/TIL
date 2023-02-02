# Controller
- `@Controller`: 해당 클래스가 컨트롤러임을 명시해줌.
	- `@RequestMapping(value: string, [method: RequestMethod])`: 요청에 대해 응답을 지정한다. `method`를 생략 시 모든 요청에 대응해서 응답해준다.
	- `@GetMapping(value: string)`: *get* 메소드 요청에 대응해 응답을 준다. `@RequestMapping(value = v, method = RequestMethod.GET)`과 같다.
		- (참고) `value` 부분에는 고정적인 URI를 작성할 수도 있지만 `"/test/{variable}"`과 같은 형태로 임의의 값에 대응하도록 할 수도 있다. 단 이 경우 해당 annotation이 가리키는 함수는 지정한 것과 같은 이름을 가지고 `@PathVariable`으로 수식된 인자를 가져야 한다. [ex.PathVariable](Annotation.Example.md#ex.PathVariable) 참고.
		- `@RequestParam`: `Get` 방식의 경우 URI를 통해 맵 형태로 데이터를 전달해줄 수있는데, 여기서 데이터를 추출할 때 사용한다. `@GetMapping`으로 수식되는 함수의 인자부분에서 명시해주면 된다. 
			- 받는 방법은 총 3가지가 있다. 하나는 변수의 이름을 직접 지정하여 받는 방법, 두번째는 `Map<String, String>` 꼴로 모든 데이터를 받는 방법, 세번째는 `DTO`를 정의해서 받는 방법이다. 단 `DTO`를 이용할 때는 `@RequestParam`을 사용하지 않는다. 자세한 것은 [ex.RequestParam](Annotation.Example.md#ex.RequestParam) 참고.
- `@RestController`: `@Controller` + `@ResponseBody`. 주로 *json* 형태로 데이터를 반환할 때 사용한다. 
# View
# Model

# 예시 코드 목록