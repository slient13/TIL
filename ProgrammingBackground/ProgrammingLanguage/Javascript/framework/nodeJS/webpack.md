# 개요
**webpack**이란 *[javascript](../../../javascript.md) 어플리케이션*을 위한 정적 모듈 번들러이다. *javascript*만을 위한 일반적인 모듈 시스템을 넘어 *ES 모듈, common JS 모듈, CSS imports* 등 *javascript 어플리케이션*과 관련된 모든 모듈을 *javascript 코드*로 합쳐서 import 할 수 있도록 제공한다.

# 실습
## package.json 파일 생성
`npm install -y`를 입력한다. 그러면 자동으로 기본형태를 갖춘 *package.json* 파일을 생성해준다.

## 필수 webpack 모듈 설치
`npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin`를 입력해서 설치한다.
- `--save-dev`는 해당 *node module*이 개발시에만 사용되는 것임을 의미한다. `devDependencies`에 포함되며, 빌드시에는 제외된다.
- `webpack`은 **webpack**의 기능을 가지고 있는 기본 모듈이다.
- `webpack-cli`는 **webpack**의 기능을 **CLI 환경**에서 이용할 수 있도록 제공하는 모듈이다.
- `webpack-dev-server`는 개발용 서버를 제공하는 모듈이다.
- `html-webpack-plugin`은 모든 웹 어플리케이션에 최소 하나는 포함되는 html 파일을 자동으로 빌드에 포함, js 파일과 연결시켜주는 **webpack**용 플러그인이다.

## 스크립트 설정
스크립트를 간단히 사용하기 위해 *package.json* 파일의 `scripts` 속성에 대해 필요한 스크립트를 지정한다. 가령 `"dev": "webpack --mode development"`를 추가하면. `npm run dev`라는 간단한 명령으로 `webpack --mode development` 라는 일련의 명령을 간단하게 수행할 수 있게 된다. 사용하는 스크립트 목록은 다음과 같다.
- `"dev": "webpack --mode development"`
- `"build: "webpack --mode production"`
- `"start": "webpack-dev-server --mode development"`

## webpack 설정
root 경로에 *webpack.config.js* 파일을 추가한다. 여기에 각종 설정을 추가한다.

### Entry Point 변경
*Entry Point*란 진입점, 즉 어플리케이션이 실행되었을 때 가장 처음 실행되는 파일을 의미한다. 기본값으로 `/src/index.js`로 되어있다. 변경하고자 하면 다음 코드를 입력한다.

```js
module.exports = {
	entry: './$진입점으로-지정하고-싶은-파일-경로'
}
```

### Output 변경
*Output*이란 번들링한 결과물이 출력되는 위치를 의미한다. 기본값은 `./dist/main.js` 이다. 변경하고자 하면 다음 코드를 입력한다.

```js
module.exports = {
	output: {
		path: './$결과물이-출력되길-원하는-폴더-경로',
		filename: '$결과물-js-파일-이름.js'
	}
}
```

### plug in 설정
```js
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	...
	plugins: [
		new HTMLWebpackPlugin({
			template: '$포함하고자-하는-HTML-파일-경로'	
		}),
	],
}
```

번들링 과정 등에서 사용할 **plug in** 등을 설정한다. 설정할 때는 위와 같이 객체를 동적 할당해 집어넣어 준다.

### loader 설정
```js
module.exports = {
	...
	module: {
		rules: [
			{
				test: /\.expr$/,
				use: [
					{ 
						loader: '로더-명칭', 
						options: {
							... // 옵션 목록
						}
					},
					...
				]
			},
			...
		]
	}
}
```

`.js` 파일 외 다른 파일들을 로딩하기 위한 loader를 설정한다. 
- 필요한 규칙은 `module.rules` 라는 속성에 배열로 추가한다.
- `module.rules` 배열의 각 원소는 `{ test, use }` 두 가지 속성을 가지고 있다. 각각 어떤 이름을 가진 파일에 적용하는지, 해당 파일을 불러올 때 어떤 로더를 사용하는지를 의미한다.
- `use`는 배열로, 각 원소는 사용할 로더를 명시한다. `{ loader, option, ... }`의 속성을 가지며, 

```js
{
	test: /\.파일-확장자$/,
	exclude: /\.제외-파일$/,
	use: [{
		loader: '로더-명칭', option: {...},
	}],
}
// 위는 아래와 같이 약식 표현으로 사용할 수 있다.
{
}
```

# 스크립트 상세
## 명령
- `webpack`: 지정한 설정에 따라 번들링을 수행한다.
- `webpack-dev-server --open`: **webpack**용 개발 서버를 열어서 빌드 결과물을 로컬에서 보여준다.

## 옵션
- `--mode $모드`: 해당 명령을 어떠한 모드로 수행하는지를 의미한다. `$모드`에는 `development`와 `production` 모드가 있으며, 각각 *개발 모드*, *실 서비스 모드*를 의미한다.
	- 개발 모드에서는 개발 및 테스트에 필요한 모듈까지 모두 포함되며 알아볼 수 있도록 적절히 줄바꿈이나 들여쓰기가 제공되지만, 제품 모드에서는 개발용 모듈들은 제외되고 줄바꿈등도 제거되어 한줄로 표현된다.

# 플러그인 상세
## html-webpack-plugin
**webpack**을 통한 번들링을 수행할 때 결과물을 html 파일에 연결하는 작업을 자동으로 수행해준다.

# Loader 상세

**참고**: (ref:: [Loaders | webpack](https://webpack.js.org/loaders/))


# 참고
(ref:: [10분 만에 웹팩 배우기](https://serzhul.io/JavaScript/learn-webpack-in-under-10minutes/))