
# 출력 관련
```bash
clear # 콘솔 화면을 깨끗하게 치워준다.
pwd # 현재 위치를 출력한다.

ls # 현재 위치에 존재하는 파일과 폴더들을 출력한다.
ls -F # 포맷 정보를 붙여 출력한다.
	# 각 명칭 뒤에 보통 폴더면 `/`, 링크면 `@`, 실행 파일이면 `*`, 
	# 소켓이면 `\=`이 붙는다.
ls -l 
	# 각 폴더 및 파일에 대한 상세한 정보(권한, 소유주, 크기, ...)를 포함하여
	# 리스트 형태로 출력한다.

grep $pattern $file # `file`에서 `pattern`이 나타난 부분만 찾아 출력한다.
	# `pattern` 에는 정규식을 이용할 수 있다.
grep -m $count $pattern $file 
	# 검색하되 최대 `count`개가 조회될 때까지만 검색하여 출력한다.
$some_output_command | grep $pattern
	# 출력이 발생하는 명령어의 출력값을 파이프라인을 통해 `grep`으로 전달하고,
	# 이에 대해 `$pattern`을 적용하여 걸러낸다.
	# 거대한 출력에 대해 필요한 부분만 걸러내는데 활용할 수 있다.

tail $target # `target`의 마지막 10줄을 출력한다.
tail -n $line $target # `target`의 마지막 `line`줄을 출력한다.
tail -f $lnie $target 
	# `target`의 마지막 `line`줄을 interactive 방식으로 출력하며, 
	# 이 때 `target`의 내용이 변경되면 이를 반영해서 출력을 고쳐준다.
	# `^C`로 중단할 수 있다.
	# 실시간으로 값이 변하는 `log` 파일 등을 둘러볼 때 용이하다.
```

# 프로세스 관련
```bash
ps # 현재 실행 중인 프로세스 목록을 출력한다.
ps -e # 현재 실행 중인 모든 프로세스(백그라운드 포함) 목록을 출력한다.
ps -f # 현재 실행 중인 프로세스 목록을 보다 상세한 정보로 출력한다.
```

# 위치 이동 및 파일/폴더 생성/수정/조작
```bash
cd # 특정 폴더로 위치를 이동한다.
cd / # 최상위 폴더로 이동한다.
cd .. # 한 단계 위의 상위 폴더로 이동한다.
cd ~ # home 폴더로 이동한다.
cd - # 이전 디렉토리(이동 전 디렉토리)로 이동한다. 반복 입력하면 돌아갔다 나갔다를 반복한다.

mkdir $name # 현재 위치에 $name이라는 이름을 가진 폴더를 생성한다.
cp $origin_file $new_file # $origin_file을 복사하여 $new_file으로 생성한다.
mv $file $new_path # $file을 $new_path로 이동한다.
rm $(file|folder) # $(file|folder)를 삭제한다. 
	# 단, 폴더의 경우 내용물이 있으면 삭제되지 않는다.
rm -r $folder 
	# $folder 안에 내용물이 존재하는 경우 
	# 내용물 혹은 하위 폴더까지 재귀적으로 제거한다.
```

# 파일 관련
- `touch $file`: `$file`의 접근, 수정, 변경 시각을 변경. 만약 파일이 존재하지 않는 경우 빈 파일 생성.
- `chmod $mod $file`: `$file`의 접근 권한을 `$mod`로 수정한다. `$mod`가 `755`이면 `rwxr-xr-x` 권한을 의미한다. `$mod`가 `ugo+x` 이면 `user, group, other`에게 실행 권한을 추가한다.
- `vi $name`: 현재 위치의 `$name`이라는 파일을 `vi(vim)`으로 연다.

# 압축
- `zip -r $compressFile $(targetFile | targetFolder)...`: `$(targetFile | targetFolder)`들을 압축한 결과물을 `$compressFile`이라는 이름으로 출력한다. 
	- `zip $compressFile $(targetFile | targetFolder)...`: `$(targetFile | targetFolder)`들을 압축 파일 `$compressFile`에 추가한다.
	- `zip -r $compressFile $(targetFile | targetFolder)... -x '*$exceptFiles*'`: 압축하되 `$exceptFiles`는 제외하고 압축한다.
- `unzip $compressFile`: 압축 파일 `$compressFile`을 압축 해제하여 그 결과물을 현재 폴더에 생성한다.
	- `unzip -l $compressFile`: 압축 파일 `$compressFile`의 내용물을 출력한다. (압축 해제된 파일을 생성하지 않는다.)
	- `unzip $compressFile -d $targetPath`: `$compressFile`을 압축해제하여 그 결과물을 `$targetPath`에 생성한다.

# 탐색
- `find $loot-path -name $name`: `$loot-path` 이하에서 이름이 `$name`인 파일 탐색 및 출력. 와일드카드 사용 가능.

# 권한
- `sudo ...`: 다음의 명령어를 다른 사용자의 권한(가령 관리자 권한 등)으로 수행한다. 실행 시 사용자의 계정 비밀번호를 요구한다. `sudo` 뒤에 오는 인수는 자동으로 *명령어*로 인식되기 때문에 만약 명령어가 아니라 특정 파일을 실행하거나 할 목적이라면 아래와 같이 해당 인수가 경로임을 명시해주어야 한다.
``` bash
sudo `./target`
```

### daemon
```bash
systemctl status $service # 해당 서비스의 상태를 표시한다.
systemctl start $service # 해당 서비스를 시작시킨다.
systemctl stop $service # 해당 서비스를 종료시킨다.
systemctl enable $service # 해당 서비스를 등록하여 부팅 시 자동으로 실행시킨다.

sudo systemctl list-units # 서비스 목록을 출력한다.
sudo systemctl list-units --state=enabled 
	# state가 `enabled`인 서비스 목록을 출력한다.
sudo systemctl list-unit-files # 설치된 모든 unit 파일 목록을 출력한다.

sudo systemctl mask $service # 특정 서비스를 마스킹하여 구동되지 않게 막는다.
	# 동일한 기능을 하는 서로 다른 서비스가 동시에 실행되어
	# 충돌나거나 하는 경우를 방지하기 위해 사용한다.
sudo systemctl unmask $service # 마스킹을 해제하여 구동 가능하게 해준다.
```

# 외부 파일 다운로드
- `wget $url`: `$url`의 내용을 다운로드 받는다. 가령 이미지의 url이라면 해당 이미지를 다운로드 받는다.
- `sudo $command`: `$command`를 관리자 모드로 수행한다. 암호가 걸려있는 경우 암호 입력을 요구한다.

# 콘솔 환경에서의 동작
- `ctrl + shift + V`: 붙여넣기
- 블록 지정 후 우클릭: 복사
- 커서 상태에서 우클릭: 붙여넣기
- `tab`: 자동 완성(만약 일치하는 대상이 여러개라면 그 목록을 출력한다)
	
# 참고 자료
- ref:: [리눅스 grep 명령어 사용법: 파일 내 특정 문자열 찾기](https://coding-factory.tistory.com/802)
- ref:: [systemd을 관리하는 systemctl 명령어 사용법](https://www.lesstif.com/system-admin/systemd-system-daemon-systemctl-24445064.html)