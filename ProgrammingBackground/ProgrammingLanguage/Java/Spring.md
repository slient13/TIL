# 개요
**Spring**은 **java**기반의 프레임워크이다. **java**를 이용해 애플리케이션을 만드는 것을 수월하게 해주며, 덕분에 현 **java** 생태계에서는 돋보적인 위치에 있다.

**Springboot**는 **Spring**에서 초기 설정과정이 너무 번거롭고 오래 걸려 사람들이 지친다는 문제에 착안하여 의존성 관리를 위한 라이브러리 하나만 부착하면 나머지 의존성 관리를 알아서 해줄 수 있도록 개선한 것이다. 현재는 사실상의 표준이다.

# 특징
## 제어의 역전(IOC, Inversion Of Control)
개발자가 **Spring**의 코드를 실행시키는 것이 아니라, 반대로 개발자는 특정 시점에 실행되었으면 하는 코드를 제공하고, **Spring**은 상황에 따라 개발자가 작성한 코드를 실행시키는 역할을 한다.

## 의존성 주입(DI, dependency Injection)
**Spring**의 코드는 클래스에 바로 세세한 구현을 기록하는 것이 아니라, 특정 상황에 따라 호출되는 인터페이스만을 구축하고 세세한 구현은 외부에서 클래스를 주입함으로써 이루어지도록 되어 있다. 덕분에 기존 코드의 재사용성이 높아질 수 있었다.

# 개념
## Spring Bean
**Spring**에서는 개발자가 직접 클래스에 `new`를 해서 객체를 생성하지 않고 **Spring**에서 제공하는 인터페이스를 이용해 객체를 생성하는데, 이렇게 생성되는 객체는 **Spring**의 관리를 받을 수 있도록 구성되어 있다. 이것이 **Spring Bean** 이다.

이 때 **Spring Bean**을 관리하는 Spring 내부 객체를 **Spring IoC Container**라고 한다.

### Spring IoC Container에 등록하는 방법
Java Annotation 이용
- `@Component`: 해당 클래스가 **Conponent**임을 명시한다. 이것이 작성되어 있으면 **Spring**은 해당 클래스를 **Bean**으로써 등록하고 관리하게 된다.
- `@Contraoller`: 해당 클래스가 **Controller**임을 명시한다. `@Component`를 상속하고 있다.

Bean Configuration File에 직접 등록

# 하위 문서
- [Annotation](Spring/Annotation.md)

# 참고
[spring initializr](https://start.spring.io/): **Springboot** 초기 설정을 도와주는 웹 앱이다. 해당 웹앱에서 사용할 빌더의 종류, 언어 및 언어의 버전, 스프링부트 버전, metadata, 사용할 라이브러리 등을 작성하면 자동으로 해당 구성이 세팅된 프로젝트 파일이 다운받아진다. 이를 **IntelliJ** 등에서 `project import` 해서 사용하면 된다.

## 빌드 도구
- Ant
- [maven](../../Infra/buildTool/maven.md)
- [gradle](../../Infra/buildTool/gradle.md)