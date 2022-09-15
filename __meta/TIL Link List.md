## TIL list
```dataviewjs
dv.table(["link", "tags"],
	dv.pages('"__TIL"')
	.map(e => [e.file.link, dv.span(e.file.tags)])
)
```
