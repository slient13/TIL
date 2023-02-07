*역링크*: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL" && e.path.substring(0, 11) !== "__reference").filter((e) => e.path !== dv.current().file.link.path)`

# 참고
(ref:: [CRA 없이 React 개발환경 구축하기](https://velog.io/@kimeunseo/CRA-%EC%97%86%EC%9D%B4-React-%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B8%B0))

# webpack 세팅
[webpack](../../framework/nodeJS/webpack.md) 참고

# babel 세팅
```
npm i -D @babel/core @babel/cli @babel/preset-env @babel/preset-react babel-loader
```

 - `i` 옵션: `install`의 축약어. 모듈을 설치함을 의미.
 - `-D` 옵션: `--save-dev` 옵션의 축약식으로, 오직 개발용으로만 사용하고 제품용 빌드에서는 제외됨을 의미.
 - **@babel/core**: *babel*의 동작을 구현한 코어 모듈.
 - **@babel/cli**: *babel*의 동작을 cli 환경에서 사용할 수 있도록 제공하는 모듈
 - **@babel/preset-env**: 이전 버전 브라우저에서의 호환을 자동으로 챙겨주는 프리셋 집합
 - **@babel/preset-react**: [React](../../library/React.md)변환을 위한 프리셋 집합.
 - **babel-loader**: [webpack](../../framework/nodeJS/webpack.md)에서 *babel*을 로드하기 위한 로더.

```js 
// webpack.config.js 세팅
{
	test: /\.(js|jsx|ts|tsx)$/, // 해당 파일명으로 끝나면 babel-loader가 처리
	exclude: /node_modules/, // node_modules는 대상에서 제외
	loader: "babel-loader", // 바벨 로더 추가
},
```

```js
// babel.config.js 세팅
module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
};
```

# React 설치
`npm install react react-dom`

- **react**: react 컴포넌트를 사용할 수 있게 해줌.
- **react-dom**: react 컴포넌트를 html에 적용할 수 있게 해줌.

# index.js 구성
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
```

# Typescript 설치 (필요 시)
*참고: (ref:: [CRA없이 React, TypeScript 셋팅하기](https://chanyeong.com/blog/post/7))*

## 설치 
```bash
npm install --save-dev typescript @types/react @types/react-dom
```
- **typescript**: *typescript*를 사용할 수 있게 해줌
- **@types/react**: *react*에서 사용할 수 있는 *typescript*용 타입 힌트들을 제공함.
- **@types/react-dom**: *react-dom*에서 사용할 수 있는 *typescript*용 타입 힌트들을 제공함.

```bash
npm i -D @babel/preset-react @babel/preset-typescript
```
- React 개발 환경에서 typescript에 관한 intellisense를 이용할 수 있게 해줌.

## 설정
`node_modules/.bin/tsc --init` 명령을 이용하여 `tsconfig.json` 파일을 생성한다. 생성 후 `target: es5`로 설정하여 변환 규격이 es5가 되도록 해준다.

```json
// 예시
{
  "compilerOptions": {
    "jsx": "react",
    "target": "ES5",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```
