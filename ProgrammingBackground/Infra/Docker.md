#infra 

# 개요
하나의 컴퓨터 및 운영체제 안에서 여러개의 독립된 개발 및 서비스 환경을 구축할 수 있도록 제공하는 소프트웨어.

# 용어
## 구성 요소
### host
[[Docker]]가 설치되며, [[#container]]가 저장 및 구동되는 컴퓨터
### container
[[#host]] 내 설치되고, 또한 외부의 환경과 격리된 공간. 여기서 [[web server]]나 [[database]]등을 돌린다.
### docker hub
사용자들이 자신이 구성한 환경 설정을 공유하고 내려받을 수 있는 서비스
### image
[[#docker hub]]에서 내려받을 수 있는 일련의 설정 집합. 하나의 [[#image]]는 여러개의 [[#container]]를 가질 수 있다.

## 동작
### pull
`docker pull $name`

[[#docker hub]]에서 [[#image]]를 내려받는 행위. 자세한 것은 다음 링크 참고. 
- ref:: [docker pull | Docker Documentation](https://docs.docker.com/engine/reference/commandline/pull/)

사용할 수 있는 이미지는 [[#docker hub]]에서 검색해볼 수 있으며, [[#pull]]하는데 로그인이 필요할 수도 있다.

### run
- `docker run [$option] $image [$command[ args...]] ` // [[#image]]를 기반으로 새로운 [[#container]]를 만들어 실행한다. 다음 링크 참고. (ref:: [docker run | Docker Documentation](https://docs.docker.com/engine/reference/commandline/run/))
	- `docker run $image` // 아무 옵션 없이 `$image`를 바탕으로 [[#container]]를 생성한다. 이름은 자동지정된다.
	- `docker run --name $name $image` // `$image`를 바탕으로 [[#container]]를 생성하며 동시에 [[#container]]의 이름을 지정한다.
	- `docker run --publish 8080:80 $image` // `$image`를 바탕으로 [[#container]]를 생성하며, 동시에 포트에 대해 [[#host]]의 8080번 포트로 들어온 요청을 [[#container]]의 80번 포트로 연결하도록 설정한다. 이 때 [[#image]]에 따라 ==container port==는 변경이 제한될 수 있다.
	- `docker run -v $base/$target $image` // 위와 같은 동작을 함과 동시에 `$target`의 내용을 `$base`로 일치시키도록 한다. 이를 통해 [[#container]] 내부의 데이터를 직접 수정하지 않고서도 실행 내용을 바꿀 수 있으며, [[#container]]를 삭제할 때 데이터 유실을 방지할 수 있다. (*참고: ==httpd==를 이용해 [[#container]]를 생성한 경우에는 `/usr/local/apache2/htdocs/index.html`을 최우선적으로 찾는다.* ) (*참고 2: 변경사항은 즉시 반영된다.*)

### stop
`docker stop $container`

`$container`를 종료시킨다. 이 명령 대신 ==container 콘솔== 상에서 `ctrl + C`를 주어도 종료된다. 다만 종료하였다고 해도 생성한 [[#container]]가 삭제되지는 않는다. 삭제하고자 한다면 [[#rm]] 명령을 사용해주어야 한다.

### start
`docker start $container`

[[#stop]] 명령을 통해 중단된 [[#container]]를 다시 실행시킨다. 다만 이 경우 실행만 시켜줄 뿐 ==log==를 출력해주진 않는다. 만약 ==log==가 보고 싶다면 [[#log]] 명령을 활용해야 한다.

### rm
- `docker rm [$option] $container...` // `$container`를 완전히 삭제한다. 삭제하기 위해서는 반드시 먼저 [[#stop]] 명령을 통해 `$container`를 종료시켜야 한다.
	- `docker rm --force $container...` // `$container`가 실행중이더라도 [[#stop]]을 거치지 않고서 바로 삭제한다.

### rmi
- `docker rmi [$option] $image...` // `$image`를 삭제한다.

## 조회
### ps
- `docker ps [$option]` // 현재 실행중인 [[#container]]들의 목록을 출력한다.
	- `docker ps -a` // 현재 존재하는 (중단되었지만 삭제되지 않은 것 포함) [[#container]]의 목록을 출력한다.

### log
- `docker logs $container` // `$container`의 로그를 1회 출력한다.
	- `docker logs -f $conainer` // 출력 프로세스가 켜지며 `$conainer`의 로그를 지속적으로 출력한다.

## 실행
### exec
- `docker exec [$option] $container $command $args...` // `$container`에 대해 특정 명령어를 전달하여 실행한다. 해당 명령어는 그 위치로 가서 `$command $args...`로 구성된 명령어를 직접 타이핑 하는 것과 동일하다. 다음 링크 참고: (ref::[docker exec | Docker Documentation](https://docs.docker.com/engine/reference/commandline/exec/))
	- `docker exec -it $container /bin/sh` // `/bin/sh`에는 유저의 명령어 입력을 받는 프로그램인 [[shell]]이 존재하는데, 이를 실행하도록 한다. 이를 통해 사용자는 `docker exec $container`를 일일히 타이핑하지 않고서도 원하는 명령 동작을 실행할 수 있다. (*참고: 만약 `-it` 옵션을 빠뜨린다면 [[shell]]은 키자마자 즉시 꺼진다.*)

# 참고
- ref:: 생활코딩 - docker 강의: [생활코딩 Docker 입구 수업 - YouTube](https://www.youtube.com/playlist?list=PLuHgQVnccGMDeMJsGq2O-55Ymtx0IdKWf)
- ref:: 공식 docs: [Docker Documentation | Docker Documentation](https://docs.docker.com/)
