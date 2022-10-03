## TIL list
```dataviewjs
dv.table(["link", "tags"],
	dv.pages('"__TIL"')
	.map(e => [
		e.file.name, e.file.link, dv.span(e.file.tags)
	])
	.sort(e => e[0], "desc")
	.map(e => [e[1], e[2]])
	.limit(20)
)
```
