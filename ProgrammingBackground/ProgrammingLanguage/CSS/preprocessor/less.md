# 개요
[CSS](../../CSS.md)를 보다 쉽게 사용할 수 있도록 다양한 편의 기능을 제공하는 *CSS 전처리기* 중 하나.

# NodeJs 환경 설정
참고: (ref:: [LESS 개발환경 설정](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=shadowbug&logNo=221360283599))

## 관련 모듈 설치
```bash
npm install --save-dev css-loader style-loader less less-loader
npm install --save-dev mini-css-extract-plugin
```

## webpack.config.js 설정
```js
module.exports = {
    ....,
    plugins : [
         new webpack.HotModuleReplacementPlugin(),
         new MiniCssExtractPlugin({
             filename: "[name].bundle.css",
             path: __dirname + "/dist"
         })
    ],
    module: {
        rules: [
            ....
            {
                test: /(\.css$)|(\.less$)/,
                include: path.join(__dirname),
                exclude: /(node_modules)|(node)|(dist)/,
                use : [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader" },
                    { loader: "less-loader" }
                ]
            }
        ]
    }
}
```

# 문법
참고
- (ref:: [Getting started | Less.js](https://lesscss.org/))
- (ref:: [Functions | Less.js](https://lesscss.org/functions/))
- (ref:: [Features In-Depth | Less.js](https://lesscss.org/features/))

## Variable
```less
@width: 10px;
@height: @width + 10px;

#header {
  width: @width;
  height: @height;
}
```

`@variable: value` 형태로 작성하면 변수를 정의할 수 있으며, 이 때 연산자를 이용해서 상대적인 값으로 지정할 수도 있다. (단 전처리기인 만큼 동적으로 비례해서 변화하진 않는다.)

## Mixin
```less
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

#menu a {
  color: #111;
  .bordered();
}

.post a {
  color: red;
  .bordered();
}
```

위와 같이 작성하면 `.bordered()` 위치에 `.bordered`의 스타일 값이 그대로 대입되어 스타일을 재사용할 수 있다.

## Nesting
```less
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}
```

위와 같이 하면 계층적으로 스타일을 지정할 수 있다. 만약 계층적으로 스타일을 정하는 것이 아니라 `:hover` 등을 계층적으로 정의하고자 하는 경우에는 `&`을 붙여 사용하면 된다.

```less
.clearfix {
  display: block;
  zoom: 1;

  &:after {
    content: " ";
    display: block;
    font-size: 0;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}
```

