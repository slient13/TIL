*역링크*: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL" && e.path.substring(0, 11) !== "__reference").filter((e) => e.path !== dv.current().file.link.path)`

# 개요
참고: (ref:: [Drawer - Ant Design](https://ant.design/components/drawer))

상하좌우 특정 면에서 날라오는 *Modal*과 유사한 컴포넌트이다. *Modal*과 다르게 기본적으로 한 면을 꽉 채워 나오며 모달과 다르게 custom dom 에 띄우는 등의 행동이 가능하다.