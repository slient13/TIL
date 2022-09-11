# By Linux x64 binary
1. ==리눅스 x64==용 binary file을 공식 다운로드 페이지에서 내려받는다.  [link](https://nodejs.org/ko/download/)
2. 받은 파일을 설치할 위치를 결정(예: `/usr/local/lib/`)하고 그 위치에 ==tar==를 이용해 압축을 해제한다. 
	명령어 예: 
``` bash
sudo tar -xJvf node-$VERSION-$DISTRO.tar.xz -C /usr/local/lib/nodejs
```
3. `~/.profile` 파일을 열어서 다음의 내용을 추가한다.
``` bash
VERSION=v10.15.0
DISTRO=linux-x64
export PATH=/usr/local/lib/nodejs/node-$VERSION-$DISTRO/bin:$PATH
```
4. `. ~/.profile`을 입력하여 ==refresh==한다.
5. 다음 명령어를 입력하여 테스트한다.
``` bash
node --version # check node.js version
npm version # check npm and below lib's version
npx --version # check npx version
```