*Secure Shell*
# 개요
*CLI* 환경에서 원격지 호스트에 접속하기 위해 사용되는 인터넷 프로토콜 중 하나이다. *Telnet*이 통신을 암호화하지 않아 데이터가 탈취될 수 있는 위험을 해결하기 위해 통신에 암호화를 적용한 것이다.

기본적으로 `22`번 포트를 사용해 통신을 진행하며, 공개키를 이용해 암호화를 진행한다. (*remote*가 공개키, *client*가 비밀키를 보유하고 접속 시도시 비밀키를 전달함으로써 인증을 시도한다.)

# 사용
*참고*
- (ref:: [리눅스 - ssh란?](https://velog.io/@hyeseong-dev/%EB%A6%AC%EB%88%85%EC%8A%A4-ssh%EB%9E%80))
- (ref:: [SSH command usage, options, and configuration in Linux/Unix](https://www.ssh.com/academy/ssh/command))

## 키 생성
```bash
ssh-keygen
ssh-keygen -t rsa
```

```
Generating public/private rsa key pair.
Enter file in which to save the key (기본경로):

Created directory '경로'
Enter passphrase (empty for no passphrase):
```

사용할 암호키를 생성한다. `-t` 옵션을 통해 어떤 타입의 암호화를 사용할지를 정할 수 있으며, 기본값은 `rsa` 이다.

이후 생성한 키를 어디에 저장할지, 이에 대해 암호를 지정할지 등을 정하면 키가 저장된다.

이 때 생성되는 파일은 2가지로, 확장자가 없는 쪽이 비밀키, `.pub` 확장자를 가지는 쪽이 공개키이다. 비밀키는 `600`, 공개키는 `644`의 접근 권한을 가진다.

## 키 등록
```bash
cat $HOME/id_rsa.pub >> $HOME/.ssh/authorized_keys
```

`.ssh/authorized_keys`에 공개키 정보를 저장한다. 

만약 `.ssh` 폴더가 없다면 직접 만들어주고 `chmod 700 /.ssh`로 소유자 외에는 아무도 접근하지 못하도록 권한을 제한해주면 된다.

## 원격지에서 접속
```bash
ssh user_name@server_ip
ssh -p port_number user_name@server_ip
ssh -i privated_key_path user_name@server_ip
```

- `server`에 `user_name`으로 접속한다.
- `-p` 옵션을 이용하면 접속 포트를 지정할 수 있다. 기본 포트는 `22` 이다.
- `-i` 옵션을 이용하면 사용할 개인키 위치를 직접 지정할 수 있다. 한 번 지정하면 그 위치가 기억되어 다음에는 생략할 수 있다.
