*역링크*: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL" && e.path.substring(0, 11) !== "__reference").filter((e) => e.path !== dv.current().file.link.path)`


# 기본 상태 관리
## add
```bash
git add $file
# 변경사항이 있는 모든 파일을 stage
git add -A
# staged 파일 취소
git reset HEAD $file
# staged 파일들 전체 취소
git reset HEAD
```

파일 등의 변경사항을 일시적으로 인덱스에 등록한다. [commit](#commit) 전까지는 자유로이 새로운 변경사항을 등록하거나 등록된 변경사항을 취소할 수 있다.

이 명령이 적용된 파일은 [staged](git.fileState.md#staged) 상태가 된다.

## commit
```bash
# 커밋
git commit
# 메시지를 지정하며 커밋
git commit -m $message
# 직전에 커밋한 이력에 대해 빠진 내용을 추가
git commit --amend
# 직전에 커밋한 이력에 대해 빠진 내용을 추가 + 메시지 재정의
git commit --amend -m $message
```

[staged](git.fileState.md#staged) 상태인 파일들의 변경사항을 확정하고 기록하여 특정 이력으로 남긴다. 이렇게 만들어진 이력들은 변경사항을 비교하거나 유사시 롤백하는 용도로 사용된다.

[commit](#commit) 된 파일은 [committed](git.fileState.md#committed) 상태가 되며 한 번 이상 기록된 파일은 이후 별도로 조치하지 않는 이상 반영구히 변경사항이 추적된다. (한 번 이상 기록되었다면 [git.gitignore](git.gitignore.md)에 추가하더라도 추적이 중단되지는 않는다. 이 경우 강제로 캐시를 제거해 인덱스를 제거해주어야만 한다.)

# 원격
## remote
```bash
# 현재 저장소와 연결된 원격 저장소 이름 출력
git remote 
# 현재 저장소와 연결된 원격 저장소의 이름과 주소 출력
git remote -v 
# 원격 저장소 추가
git remote add $shortName $URL
# 원격 저장소 이름 변경
git remote rename $oldName $newName
# 원격 저장소 정보 삭제
git remote remove 'remote-repo-name'
```

참고: (ref:: [Git - 리모트 저장소 (git-scm.com)](https://git-scm.com/book/ko/v2/Git%EC%9D%98-%EA%B8%B0%EC%B4%88-%EB%A6%AC%EB%AA%A8%ED%8A%B8-%EC%A0%80%EC%9E%A5%EC%86%8C))

## fetch
```bash
# 원격 저장소의 이력을 내려받음
git fetch 'remote-repo-name'
```

## pull
```bash
# 원격 저장소의 이력을 내려받고 로컬 환경과 병합함.
git pull 'remote-repo-name'
```

## push
```bash
# 로컬 저장소의 변경사항을 원격 저장소에 반영
# 만약 `branchName`에 해당하는 원격 브랜치가 없다면 새로 생성함.
git push 'remote-repo-name' 'branch-name'
# 위 동작에 추가로 `upstream`을 설정함.
git push --set-upstream 'remote-repo-name' 'branch-name'
git push -u 'remote-repo-name' 'branch-name'
# 원격 브랜치를 삭제함.
git push -d 'remote-repo-name' 'branch-name'
```

*참고:* upstream 이란 원격 저장소의 일종으로, 보통 오픈 소스 프로젝트에 기여하기 위해 `fork`를 한 경우에 개인 작업용 저장소의 `origin`과 구분하기 위해 사용된다. `--set-upstream` 옵션은 push를 하면서 자동으로 이를 지정하는 옵션으로, 한 번 이것을 하게 되면 대상 원격 저장소가 그것으로 설정되어 저장소 이름과 브랜치 이름을 생략할 수 있게 된다.

# 브런치
## branch
```sh
# branch 생성
git branch 'branch-name'
# branch 삭제. 단 모든 내용이 다른 브런치에 merge 된 상태여야 함.
git branch -d 'branch-name'
# branch 강제로 삭제. merge 되지 않은 내용이 있어도 삭제
git branch -D 'branch-name'

# branch 목록 출력
git branch
# branch 목록을 각각의 최신 커밋 정보와 함께 출력
git branch -v
# 모든 내용이 현재 branch에 merge 된 branch 목록 출력
git branch --merged
# 현재 branch에 반영되지 않은 내용을 보유한 branch 목록 출력
git branch --no-merged
# 지정한 branch에 반영되지 않은 내용이 있는 branch 목록 출력
git branch --no-merged 'branch-name'
```

## checkout
```bash
# 대상 branch로 HEAD 이동
git checkout 'branch-name'
# branch를 생성하면서 동시에 checkout
git checkout -b 'branch-name'
```