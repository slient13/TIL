# in process
```dataviewjs
dv.list(
	dv.pages('#inProcess')
	.map(e => e.file.link)
);
```

# low contents files (size < 30)
```dataviewjs
dv.list(dv.pages()
	.filter(e => e.file.size <= 50)
	.filter(e => e.file.name !== 'README')
	.file.link);
```

# recently edited
```dataviewjs
dv.table(
	["index", "link", "lastModifiedTime"],
	dv.pages()
	.map(p => [p.file.link, p.file.mtime])
	.sort(e => e[1], "desc")
	.map((e, i) => [i+1, e[0], e[1]])
	.limit(15)
);
```