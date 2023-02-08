`$= "작성일: " + new Intl.DateTimeFormat("ko-KR").format(dv.current().file.cday)`

# 개요
*React* 앱을 빌드하는데 *AppRouter.tsx*에서 다른 컴포넌트를 부르도록 했더니 `Module not found: Error: Can't resolve` 라고 하는 에러가 뜨며 진행되지 않는 현상

## 환경
```
# package.json dependencies
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-router-dom": "^6.8.1"
```

```js
/* webpack.config.js */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'main.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new miniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    hot: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /(\.css$)|(\.less$)/,
        include: path.join(__dirname),
        exclude: /(node_modules)|(node)|(dist)/,
        use: [
          miniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          { loader: 'less-loader' },
        ],
      },
    ],
  },
};


```

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES5",
    "jsx": "react",
    "module": "commonjs",
    "rootDir": "./",
    "baseUrl": "./",
    "allowJs": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}

```

# 경과
- *webpack.config.js* 의 `resolve.extensions`에 적절한 확장자가 없어서 그런 것인가 하여 `'...'`을 추가해 기본 확장자도 접근 가능하도록 설정 -> 해결되지 않음.
- (ref:: 참고 1: [Module not found: Error: Can't resolve .. In .. 오류 ](https://victory-ju.tistory.com/entry/React-Module-not-found-Error-Cant-resolve-In-%EC%98%A4%EB%A5%98-TypeScript-React))을 참고하여 *tsconfig.json* 파일과 *webpack.config.js* 파일을 수정.
	- `'.../tsconfig.json' 구성 파일에서 입력을 찾을 수 없습니다. 지정된 '포함' 경로는 '[".src"]'이고 '제외' 경로는 '["node_modules","dist"]'이었습니다.` 라는 오류가 발생함.
	- 다시 확인하니 그냥 오타였음 -> 번외 문제 해결.
	- 하지만 여전히 해결되지 않음.
- (ref:: 참고 2: [Enable "--display-error-details" in webpack · Issue #6596 · storybookjs/storybook · GitHub](https://github.com/storybookjs/storybook/issues/6596))를 참고하여 *webpack*이 보다 상세한 오류를 띄우도록 *webpack.config.js* 수정.
	- 자꾸 `node_modules`에서 `/src`를 찾으려고 시도하는 것을 확인.
	- 혹시 탐색 범위가 한정되어 있어 그런가 하고 검색하던 중 *webpack.config.js.resolve* 설정 중 `modules`라고 어디에 모듈이 위치해있는지 알려주는 설정값이 있다는 것을 확인 -> 해당 값에 `__dirname`을 추가 -> 제대로 인식하고 빌드됨.

# 결과
- 해결

## 원인 분석
- 정확히는 모르나 *webpack*은 *resolve* 할 때 `node_modules` 폴더만이 기본 탐색 범위에 속해 있는 듯하다. 혹은 해당 프로젝트가 앱의 UI 부분에 해당하는 서브 프로젝트 부분이라 꼬였을 가능성도 추측.
- 여전히 정확한 원인은 모르겠지만, 만약 다음에도 이런 현상이 발생한다면 `resolve: {modules: [__dirname, ...]}`으로 해결할 수 있을 듯 하다.