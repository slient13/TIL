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