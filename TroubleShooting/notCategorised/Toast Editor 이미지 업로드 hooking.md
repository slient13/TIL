# 개요
*Toast Editor*를 사용하던 중 이미지 업로드 기능을 지원해야 하는데, 직접 이미지를 업로드하는 경우 base64 기반의 문자열이 그대로 내용으로 들어가 그 내용이 너무 방대해지는 문제가 있다.

# 접근
base64 기반의 데이터가 모두 전달되는 것이 문제이므로 직접 업로드 하는 순간 데이터를 가로채 다른 서버에 저장하고 실제 src 부분에는 접근하기 위한 url만 남겨두는 식으로 처리하면 될 것으로 보인다.

찾아본 결과 이를 위한 것으로 TUIEditor는 `addImageBlobHook` 이라는 것을 제공한다. 저 hook을 overriding 하면 원하는 동작을 수행할 것으로 판단된다.

# 적용
```tsx
// css 생략
import { Editor } from '@toast-ui/react-editor';
import React, {useEffect} from 'react';

const App = () => {
	const editorRef = useRef<Editor>
	// ...
	useEffect(() => {
		editor.current
		?.getInstance()
		.addHook(
			'addImageBlobHook',
			async (blob: File, callback: HookCallback) => {
				const url = '...' // url creating logic
				callback(url, blob.name)
				return false
			}
		)
	}, [])
	///
	return (
		<Editor 
			ref={editorRef}
			// ...			
		/>
	)
}
```

- `.addHook`의 2번째 인자로 들어가는 `callback`은 기존의 동작을 구현하는 함수가 들어가는데, `addImageBlobHook`의 경우 `(대입할 url, alt 등에 들어갈 이름)`으로 구성된다.

# 참고
- ref::[TOAST UI Editor 사진 첨부 문제](https://velog.io/@matajeu/React-TOAST-UI-Editor-%EC%82%AC%EC%A7%84-%EC%B2%A8%EB%B6%80-%EB%AC%B8%EC%A0%9C)
- ref::[nhn.github.io/tui.editor/latest/ToastUIEditorCore/](https://nhn.github.io/tui.editor/latest/ToastUIEditorCore)
- ref::[nhn.github.io/tui.editor/latest/ToastUIEditorCore#addHook](https://nhn.github.io/tui.editor/latest/ToastUIEditorCore#addHook)
- ref::[nhn.github.io/tui.editor/latest/ToastUIEditorCore/#removeHook](https://nhn.github.io/tui.editor/latest/ToastUIEditorCore#removeHook)