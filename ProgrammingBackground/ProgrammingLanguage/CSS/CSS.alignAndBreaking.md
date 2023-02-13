*역링크*: `$= dv.current().file.inlinks.filter((e) => e.path.substring(0, 5) !== "__TIL" && e.path.substring(0, 11) !== "__reference").filter((e) => e.path !== dv.current().file.link.path)`

# 단어 분리
```css
word-break: normal;
word-break: break-all;
word-break: keep-all;
word-break: break-word; /* deprecated */
```

- `normal`: 영어는 `keep-all` 한자, 일본어, 한국어 등은 `break-all`을 따름
- `break-all`: 글자 하나하나 단위로 줄바꿈
- `keep-all`: 단어 단위로 줄바꿈. 단어의 길이보다 *container*의 크기가 작으면 뚫고 나감.

```css
word-wrap: normal;
word-wrap: normal;
```