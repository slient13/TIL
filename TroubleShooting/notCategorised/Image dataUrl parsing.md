# 개요
정규식과 문자열 가공 함수들을 이용해 처리하는 로직

# 내용
```ts
const dataUrls = content
	?.match(/<img[^>]*>/gm)
	?.map(str => str.slice(0, -1).split(' '))
	?.map(strList => strList.filter(str => str.startsWith('src="data:image')))
	?.filter(strList => strList.length !== 0)
	?.map(strList => strList[0])
	?.map(str => str.slice(5, -1)) ?? [];
```

