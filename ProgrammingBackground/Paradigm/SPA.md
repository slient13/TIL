*Single Page Application*

# 개요
*웹 앱*을 구축할 때 매 순간 새로 페이지를 구성하는 대신 첫 1회에만 페이지를 내려받고 그 후에는 [Ajax](../ProgrammingLanguage/Javascript/advanced/Ajax.md)를 이용해 데이터만 내려받아 스크립트로 페이지를 재구성하여 화면을 변화시키는 방식.

처음 한 번 내려받을 때 이후로는 화면 중 일부만 변화하므로 사용자는 훨씬 부드러운 사용 환경을 경험할 수 있으며, 공급자측에서도 리소스 소비를 최소화할 수 있다는 장점이 있다.

다만 원래 이렇게 하면 즐겨찾기나 앞으로, 뒤로 가기 등이 제대로 동작하지 않는 문제가 있는데, 이를 `window.history` 객체를 이용해 실제 페이지를 이동하지 않고서도 마치 페이지가 이동한 것처럼 설정하여 문제를 해결한다.

이를 위한 대표적인 라이브러리로 [React](../ProgrammingLanguage/Javascript/library/React.md)가 있다.