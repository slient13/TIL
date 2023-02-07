# 개요
**Java** 환경에서 사용하는 빌드 도구. 의존성을 자동으로 관리해주는 기능이 있음.

# 구성
## 명령어
- `complie`: *Java code*를 *Byte code*로 변환
- `test`: `compile` 후 테스트 케이스를 실행함.
- `package`: `compile` 후 해당 소스를 패키징해서 *war* 혹은 *jar* 형식으로 지정한 경로에 생성
- `install`: `package` 후 *로컬 repository*에 배포
- `deploy`: `install` 후 *원격 repository*(nexus)에 배포.
- `clean`: `./target` 폴더 내 모든 내용을 삭제한다. 새로 컴파일 등을 진행할 때 충돌을 방지하기 위해 사용.

출처: (ref:: [Maven 명령어 및 옵션 모음](https://oingdaddy.tistory.com/56))

# 구성
- [pom.xml](maven/pom.xml.md): maven 프로젝트를 생성하면 루트 디렉토리에 생성되는 메인 설정파일.

# 기타
[Spring](../../ProgrammingLanguage/Java/Spring.md)과 [React](../../ProgrammingLanguage/Javascript/library/React.md)를 연결하고 동시에 빌드하는 방법.

참고: (ref:: [명월 일지: Java 64. String boot와 React를 연결하는 방법](https://nowonbun.tistory.com/275))

# 참고
- https://mvnrepository.com/: **Maven**측에서 제공하는 라이브러리 사이트로, 지원되는 다양한 라이브러리들을 확인할 수 있다.
- 