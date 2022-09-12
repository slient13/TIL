const http = require('http'); // http 프로토콜 통신을 위한 모듈 로드.
const fs = require('fs');     // 파일 입출력을 위한 모듈 로드
const url = require('url');   // url 파싱을 위한 모듈 로드
const path = require('path'); // 경로 데이터를 다루기 위한 모듈
const { checkPrimeSync } = require('crypto');


var app = http.createServer(function (req, res) {   // 서버를 만들며 이에 대한 요청 수령 및 응답 코드 작성
    let url_string = req.url;  // 요청한 url을 저장
    let pathData = url_string
    var queryStartIndex = url_string.indexOf('?');
    queryStartIndex !== -1 ? pathData = url_string.substring(0, queryStartIndex) : "";
    let queryData = url.parse(url_string, true).query;
    let id = queryData.id;
    let title, header, contents = undefined;
    const render = () => {
        !header ? header = title : "";

        let template = `
            <!DOCTYPE html>
            <html lang="ko">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${title}</title>
            </head>
            <body>
                <h1>${header}</h1>
                ${contents}
                <a href="/create">create</a>
                <a href="/">home</a>
            </body>
            </html>
        `;

        res.writeHead(200);    // 정상 출력 되었다는 의미로 헤더에 200을 기록해 반환.
        res.end(template); // `fs`로 로컬에서 파일을 읽어 그 내용을 요청한 클라이언트에게 전달함.
    }
    const display = () => {
        if (id) {
            title = id;
            fs.readFile(`./data/${title}.txt`, 'utf-8', (err, data) => {
                if (err) {
                    // console.log(`Error: No matched file [${title}]`);
                    header = "undefined";
                    contents = "<p>There is no matched file.</p>";
                }
                else {
                    header = title;
                    contents = `<pre style="white-space: pre-wrap">${data}</pre>`;
                    contents += `<br><a href="/update?id=${id}">update</a>`;
                }
                render();
            });
        }
        else {
            title = "Home";
            header = "Welcome";
            contents = "";
            const getFileList = (files) => {
                let linkList = "";
                files.filter(f => path.extname(f) === '.txt')
                    .map(f => `<a href="./?id=${path.basename(f, '.txt')}">${path.basename(f, '.txt')}</a>`)
                    .map(e => `<li>${e}</li>`)
                    .forEach(e => linkList += e);
                linkList = `<ul>${linkList}</ul>`;
                return linkList;
            }

            fs.readdir("./data", (err, files) => {
                if (err) {
                    console.log(err);
                }
                let linkList = getFileList(files);

                contents += `${linkList}<br/><br/>`
                render();
            });
        }
    }
    if (pathData === '/') {
        display();
    }
    else if (pathData === '/create') {
        const setForm = () => {
            return [""].map(e => e + `<input type="text" name="title" placeholder="제목을 적으시오">`)
                .map(e => e + `<br><textarea name="desc" placeholder="내용을 적으시오"></textarea>`)
                .map(e => e + `<br><input type="submit">`)
                .map(e => `<form action="http://localhost:3000/create/process" method="POST" enctype="Application/json">${e}</form>`);
        }

        title = "Create";
        header = "Create File";
        contents = setForm();

        render();
    }
    else if (pathData === '/create/process') {
        if (req.method == 'POST') {
            let data = '';
            req.on('data', (chunk) => {
                data += chunk;
            })
            req.on('end', () => {   // 서버가 모든 데이터를 수신했을 때
                const urlSP = new URLSearchParams(data);
                title = urlSP.get("title");
                contents = urlSP.get("desc");

                fs.writeFile(`./data/${title}.txt`, contents, 'utf-8', (err) => {
                    res.writeHead(302, { Location: `/?id=${title}` });
                    res.end();
                })
            });
        }
    }
    else if (pathData === '/update') {
        if (!id) {
            res.writeHead(404);
            res.end("Not found");
        }

        title = `Update: ${id}`;
        let file_contents
        const createFormField = () => {
            return `
                <form method="post" action="/update/process">
                    <input type="hidden" name="old_title" value="${id}"/><br/>
                    <input type="text" name="new_title" value="${id}"/><br/>
                    <textarea name="new_contents">${file_contents}</textarea><br/>
                    <input type="submit"/>
                </form>
            `;
        }
        fs.readFile(`./data/${id}.txt`, encoding = 'utf8', (err, data) => {
            if (err) console.log(err);
            file_contents = data;
            contents = createFormField();
            render();
        });
    }
    else if (pathData === '/update/process') {        
        
        if (req.method == 'POST') {
            let data = '';
            req.on('data', (chunk) => {
                data += chunk;
            })
            req.on('end', () => {   // 서버가 모든 데이터를 수신했을 때
                const urlSP = new URLSearchParams(data);
                let old_title = urlSP.get('old_title');
                let new_title = urlSP.get('new_title');
                let new_contents = urlSP.get('new_contents');
                
                fs.rename(`./data/${old_title}.txt`, `./data/${new_title}.txt`, (err) => {!err ?? console.log(err);});

                fs.writeFile(`./data/${new_title}.txt`, new_contents, 'utf-8', (err) => {
                    res.writeHead(302, { Location: `/?id=${new_title}` });
                    res.end();
                })
            });
        }
    }
    else {
        res.writeHead(404);
        res.end("Not found");
    }
});
app.listen(3000);