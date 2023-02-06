*역링크*: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL" && e.path.substring(0, 11) !== "__reference").filter((e) => e.path !== dv.current().file.link.path)`

# 개요
[Spring](../Spring.md)을 적용하기 위한 기본 세팅을 정리한 문서.

# 방법
## Spring Initializr 이용
- [spring initializr](https://start.spring.io/): **Springboot** 초기 설정을 도와주는 웹 앱이다. 해당 웹앱에서 사용할 빌더의 종류, 언어 및 언어의 버전, 스프링부트 버전, metadata, 사용할 라이브러리 등을 작성하면 자동으로 해당 구성이 세팅된 프로젝트 파일이 다운받아진다. 이를 **IntelliJ** 등에서 `project import` 해서 사용하면 된다.

## 수동
*maven을 통한 빌드를 가정한다.*

1. 프로젝트를 생성할 폴더를 마련한다.
2. [maven](../../../Infra/buildTool/maven.md)에서 사용하기 위한 [pom.xml](../../../Infra/buildTool/maven/pom.xml.md) 파일을 생성하고 기본 구조를 입력한다.
	1. 현 프로젝트의 `modelVersion, groupId, artifactId, version`를 입력한다.
	2. `parent`에 `spring-boot-starter-parent`를 추가해준다. 이 때 버전은 가능한 최신으로 하면 되지만 사용하는 java 버전이 8 이라면 `2.x`대 버전을 사용해야 한다.(`3.x` 버전은 17 버전부터 이용할 수 있다.)
	3. `dependencies`에 `dependency`로 `spring-boot-starter-web`을 올려준다.
3. [maven](../../../Infra/buildTool/maven.md)에서 소스 파일을 인식할 수 있도록 `src/...` 폴더를 만들어준다.
4. `main` 함수가 위치한 클래스를 `@SpringBootApplication`으로 수식하고 `SpringApplication.run`을 해준다. (자세한 것은 [Spring.Annotation](Spring.Annotation.md) 참고)
5. 컨트롤러를 작성한다. 
6. `mvn spring-boot:run`을 통해 작성한 웹 애플리케이션을 실행한다.
7. 통신을 시도하여 제대로 응답이 오고 가는지 확인한다. (통신을 테스트해볼 수 있는 도구는 여럿 있는데 필자는 그 중 [The Collaborative API Development Platform - Insomnia](https://insomnia.rest/) 를 사용하였다.)

참고: (ref:: [도구 없이 스프링 부트 프로젝트 만들기 | Engineering Blog by Dale Seo](https://www.daleseo.com/spring-boot-quick-start-without-tools/))