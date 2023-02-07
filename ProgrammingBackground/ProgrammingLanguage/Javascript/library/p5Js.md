#motionGraphic
*역링크*: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL" && e.path.substring(0, 11) !== "__reference").filter((e) => e.path !== dv.current().file.link.path)`

# 개요 
웹 환경에서 모션 그래픽을 구현하기 위한 기능을 제공하는 javascript 라이브러리

# 환경 설정
## CDN 방식
(ref::[p5.js CDN](https://cdn.jsdelivr.net/npm/p5/lib/))에서 원하는 파일의 내용을 파악하고 그것을 html script 태그에 집어넣어 다음과 같이 삽입한다. `<script src="$path"></script>`

## 로컬 파일 방식
`p5.js` 혹은 `p5.min.js` 파일을 다운로드하고 프로젝트 폴더에 옮긴 다음 `<script src="$path"></script>` 방식으로 로드할 수 있다.

## 자체 제공 편집기를 이용하는 방식
(ref::[p5.js Web Editor (p5js.org)](https://editor.p5js.org/))에서 바로 편집을 진행한다. 이 방법을 사용할 시 별도의 설정은 필요 없다.

# 사용법
## 이벤트
파일의 최상위 스코프에서 아래 이름을 가진 함수를 정의해두면 이에 따른 이벤트가 실행된다.

- `setup() { $setup-contents }` // ==p5.js==가 처음에 딱 한 번 실행하는 코드를 지정한다. 초기 설정을 지정할 때 사용한다. 해당 명칭을 가진 함수를 정의하면 별도의 과정 없이 ==p5.js==가 알아서 사용한다.
- `draw() { $draw-contents }` // ==setup== 이후 지속적으로 실행될 코드들을 지정한다. 실제 그리는 동작을 구성할 때 사용한다.
- `mousePressed() { $callback }` // 마우스가 클릭되었을 때 `$callback`을 실행한다. 클릭한 순간에만 딱 한 번 실행된다.

## 그리기 
*참고*
ref::[reference | p5.js (p5js.org)](https://p5js.org/reference/)

### 배경 그리기
- `background($color)` // 배경색을 `$color`로 변경한다. 이 때 이전에 그려진 다른 요소가 있다면 전부 지워진다.

### 도형 그리기
- `circle($pos-x, $pos-y, $size-diameter)` // `(x, y)` 좌표에 `size-deimeter`를 지름으로 하는 원을 그린다.

### 그리기 모드 변경
그리기 모드를 변경하는 함수들에 대한 것을 다룬다. 해당 코드 이후에 실행된 그리기 코드에 영향을 준다.

- `fill($color)` // 채우는 색상을 `$color`로 변경한다. 
	- `fill($r, $g, $b, $a = 0xff)` // 채우는 색상을 `rgba($r, $g, $b, $a)`로 변경한다. // 참고로 `$a`는 투명도를 표현하는 값이다. ==0==이 가장 투명하고, ==0xff==, 즉==255==가 가장 불투명하다.
- `nofile()` // 채우는 색상을 ==투명==으로 변경한다.
- `stroke($color)` // 선 색상을 `$color`로 변경한다.
- `strokeWeight($width)` // 선 굵기를 `$width`로 변경한다.

### 애니메이션

### 상호작용
사용자와의 상호작용을 지원하거나 혹은 사용자의 조작 정보(마우스의 위치 등)를 파악할 때 사용한다.

- `mouseX` // 마우스의 x 좌표
- `mouseY` // 마우스의 y 좌표
- `mouseIsPressed` // 마우스의 클릭 중 여부.

# 기타
## 좌표
웹 상에서의 좌표는 좌상단이 (0, 0) 이며, 우하단이 (x, y)가 된다. 즉, 일반적인 좌표계와 y축이 반전되어 있다.

# 참고 문서
- ref:: 생활코딩 - p5 강의 재생목록: [p5.js - YouTube](https://www.youtube.com/playlist?list=PLuHgQVnccGMCEvYJCyey1AlwT1yyBZK6c)
- ref:: 공식 홈페이지: [home | p5.js (p5js.org)](https://p5js.org/)