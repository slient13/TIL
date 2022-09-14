- [ ] [[ES6 basic]]

# low contents files
```dataviewjs
dv.list(dv.pages()
	.filter(e => e.file.size <= 50)
	.filter(e => e.file.name !== 'README')
	.file.link);
```