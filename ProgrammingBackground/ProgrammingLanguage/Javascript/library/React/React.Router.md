*React Router*
# 개요
[React](../React.md) 환경에서 [SPA](../../../../Paradigm/SPA.md)를 구축할 때, URL에 따라 다른 페이지를 보여주는 기능을 손쉽게 제공하는 라이브러리.

(ref:: 공식 사이트: [React Router](https://reactrouter.com/en/main))

# 구성
## Router Components
## Route
### Route
```tsx
interface RouteObject {
  path?: string;
  index?: boolean;
  children?: React.ReactNode;
  caseSensitive?: boolean;
  id?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
  element?: React.ReactNode | null;
  errorElement?: React.ReactNode | null;
  handle?: RouteObject["handle"];
  shouldRevalidate?: ShouldRevalidateFunction;
}
```

라우팅 대상 정보를 명시하는 객체이다.
- `path`: 대응하고자 하는 진입 URL이다.
	- `teams/:teamId`과 같이 작성하면 임의의 *id* 값에도 대응할 수 있으며, 이 때 *id* 값은 `element`로 지정된 컴포넌트에 *props*로 전달된다. 즉 `props.teamId`와 같은 방식으로 사용 가능하다. 그 외에도 [useParams](#useParams)을 이용하면 해당 값들만 받아낼 수도 있다.
	- `teams/*`와 같은 방식으로 작성하면 `/teams`를 포함해 `/teams/something`, `/teams/somthing/other`, ... 과 같은 URL에 모두 대응하도록 할 수 있다.
	- `teams/:teamId?`와 같이 작성하면 `teamId` 부분은 옵션이 된다.
- `index`: 
- `children`: `<Route>` 컴포넌트로 감싸진 자식 노드들은 *상위_Route.path*를 공통 진입점으로 인식하고 호출 시 *상위_Route.element*의 자식 요소로 전달된다. 이를 이용해 *Layout*을 지정해 라우팅 할 수 있다.
- `caseSensitive`: 
- `id`: 
- `loader`: 
- `action`: 
- `element`: 해당 라우팅 정보에 해당될 시 호출할 컴포넌트이다. 컴포넌트를 넣어주는 대신 직접 *jsx* 혹은 *tsx* 방식으로 Layout을 정의해주어도 된다.
- `errorElement`: 
- `handle`: 
- `shouldRevalidate`: 

참고: (ref:: [Route v6.8.1 | React Router](https://reactrouter.com/en/main/route/route))

## Other Components
### Link
```tsx
<Link to={$url}>$link_text</Link>
```

링크의 기능을 하는 컴포넌트. 기본적으로는 `<a>` 태그의 wrapper로써 동일한 기능을 하지만, [SPA](../../../../Paradigm/SPA.md)에서의 사용에 걸맞게 클릭 시 페이지를 직접 이동하는 대신 화면만 재구성하고 *history*에 추가하는 기능을 제공한다.

## hooks
*React Router*에서 사용하는 전용 [React.Hooks](React.Hooks.md)

### useParams
```tsx
const params = useParams(); 
```

*path*를 정의할 때 `:value` 형태로 작성했던 값들을 객체 형태로 반환한다. 이 때 사용하는 이름은 `:` 뒤에 작성했던 것을 그대로 이용한다. [구조분해](../../../../../CodingTest/background/javascript%20참고.md#구조분해) 방식으로 필요한 값만 빼낼 수도 있다.

### useLocation
```jsx
const location = useLocation();
```

*url*에 관한 정보를 받아온다.
- `location.pathname`: 경로명을 받아온다.
- `location.search`: `?` 뒤쪽으로 기술된 *query string*을 받아온다.

### useSearchParams
```jsx
const [qs, setQs] = useSearchParams();
```

*url* 뒤쪽에 붙어오는 *query string*에 대해 쉽게 다룰 수 있도록 제공하는 객체를 반환한다.
- `qs.get($key)`: *key* 값이 `$key`인 *query string*의 값을 반환한다.