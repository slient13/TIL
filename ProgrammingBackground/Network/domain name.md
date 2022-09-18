#network

# 개요 
[[domain name]]이란 사용하기 어렵고 또한 노출되면 위험이 초래될 수 있는 [[ip#IP 주소|IP 주소]] 대신 사람들이 기억하기 쉬운 의미 있는 문자열을 접근을 위한 주소로 사용하는 방식이다. `google.com` 이러한 일반적인 웹 주소를 의미한다.

# 구조
`sub.second-level.top-level.`

보통 주소를 적을 때 맨 뒤의 `.`은 생략하곤 하는데, 본래는 이것도 의미를 가진 정보로써 ==root domain==이라고 한다. 뒤에서부터 차례대로 ==top, second, sub==라는 이름을 가지며 [[domain name]]을 점차 상세하게 표현한다.

[[DNS#DNS server]]는 혼자서 모든 [[domain name]]을 관리하지 않고 위에 언급된 각각의 구조 중 특정 구조에 대해서만 담당한다. 실제 [[DNS]] 과정은 이들의 조합으로 이루어진다.

상위 구성 요소를 담당하는 [[DNS#DNS server]]는 하위 요소를 담당하는 [[DNS#DNS server]]의 목록들을 전부 알고 있어야 한다. 

어떤 도메인이든 `root domain`을 담당하는 [[DNS#DNS server]]를 기점으로 탐색을 시작하므로 해당 [[DNS#DNS server]]의 주소는 반드시 모든 클라이언트들에게 공개되고 공유되어야만 한다.