# 개요

# type 종류
- A(*address record*): 구체적인 주소에 대한 도메인 정보. IPv4 기반
- AAAA(*IPv6 address record*): 구체적인 주소에 대한 도메인 정보. IPv6 기반.
- NS(*name server record*): 다른 [[DNS#DNS server]]에 대한 정보를 담은 레코드. 자신이 처리하지 못하는 정보에 대한 처리를 위임할 때 사용함.
- CNAME(*canonical name record*): 특정 [[domain name]]에 대한 별명을 지정하는 레코드. [[domain name]]조차 너무 복잡한 경우나, [[domain name]]이 자주 바뀌는 경우에 사용함.


# 기타 정보
## TTL
도메인 정보가 질의된 다음 캐시에 저장되어 유지될 수 있는 시간. 이것을 길게하면 캐시 활용도를 높여 속도가 빨라지지만 도메인 정보가 변경되었을 때 신속하게 반영되지 않을 가능성이 있다.
