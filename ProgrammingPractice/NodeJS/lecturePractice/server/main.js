const http = require('http'); // http 프로토콜 통신을 위한 모듈 로드.
const fs = require('fs');     // 파일 입출력을 위한 모듈 로드
const url = require('url');   // url 파싱을 위한 모듈 로드
const template = require('./lib/template');
//
var app = http.createServer(function (req, res) {   // 서버를 만들며 이에 대한 요청 수령 및 응답 코드 작성
    let pathData, queryData;
    const setUrlData = () => {
        var url_string = req.url;  // 요청한 url을 저장
        pathData = url_string   // 질의문을 제외한 요청 경로
        var queryStartIndex = url_string.indexOf('?');
        queryStartIndex !== -1 ? pathData = url_string.substring(0, queryStartIndex) : "";
        queryData = url.parse(url_string, true).query;
    }
    setUrlData();
    //
    const render = (title, header, contents) => {
        !header ?? (header = title);

        res.writeHead(200);    // 정상 출력 되었다는 의미로 헤더에 200을 기록해 반환.
        res.end(template.base(title, header, contents)); // `fs`로 로컬에서 파일을 읽어 그 내용을 요청한 클라이언트에게 전달함.
    };
    const displayPage = (id) => {
        if (id) {
            title = id;
            const setContents = (err, data) => {
                if (err) {
                    // console.log(`Error: No matched file [${title}]`);
                    header = "undefined";
                    contents = "There is no matched file.";
                }
                else {
                    header = title;
                    contents = template.contentPage(id, data);
                }
                render(title, header, contents);
            }
            fs.readFile(`./data/${title}.txt`, 'utf-8', setContents);
        }
        else {
            title = "Home";
            header = "Welcome";
            contents = "";

            fs.readdir("./data", (err, files) => {
                !err ?? console.log(err);
                contents += template.mainPage(files);
                render(title, header, contents);
            });
        }
    };
    const redirect = (target) => {
        try {
            // res.writeHead(302, { Location: target }); // 이와 같이 하면 한글 주소가 주어질 시 오류가 남.
            res.writeHead(302, { Location: encodeURI(target) });
            res.end();
        }
        catch {
            console.log(`Error: location = ${target}`);
            res.writeHead(302, { Location: '/' }).end();
        }        
    }
    //
    let id = queryData.id;
    let title, header, contents;
    if (pathData === '/') {
        displayPage(id);
    }
    else if (pathData === '/create') {
        const getCreateFormField = () => {
            return [""]
                .map(e => e + `<input type="text" name="title" placeholder="제목을 적으시오">`)
                .map(e => e + `<br><textarea name="desc" placeholder="내용을 적으시오"></textarea>`)
                .map(e => e + `<br><input type="submit">`)
                .map(e => `<form action="http://localhost:3000/create/process" method="POST" enctype="Application/json">${e}</form>`);
        }
        title = "Create";
        header = "Create File";
        contents = getCreateFormField();
        render(title, header, contents);
    }
    else if (pathData === '/create/process') {
        if (req.method == 'POST') {
            let data = '';
            const writeFile = () => {
                const urlSP = new URLSearchParams(data);
                title = urlSP.get("title");
                contents = urlSP.get("desc");
                contents = contents.replace(/</g, '&lt;').replace(/>/g, '&gt;');

                fs.writeFile(`./data/${title}.txt`, contents, 'utf-8', (err) => {
                    if (err) console.log(err);
                    redirect(`/?id=${title}`)
                })
            }
            req.on('data', (chunk) => {
                data += chunk;
            })
            req.on('end', writeFile);
        }
    }
    else if (pathData === '/update') {
        if (!id) res.writeHead(404).end("Not found");

        title = `Update: ${id}`;
        const getUpdateFormField = (contents) => {
            return `
                <form method="post" action="/update/process">
                    <input type="hidden" name="old_title" value="${id}"/><br/>
                    <input type="text" name="new_title" value="${id}"/><br/>
                    <textarea name="new_contents">${contents}</textarea><br/>
                    <input type="submit"/>
                </form>
            `;
        }
        fs.readFile(`./data/${id}.txt`, encoding = 'utf8', (err, data) => {
            if (err) console.log(err);
            file_contents = data;
            contents = getUpdateFormField(file_contents);
            render(title, header, contents);
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
                new_contents = new_contents.replace(/</g, '&lt;').replace(/>/g, '&gt;');

                fs.rename(`./data/${old_title}.txt`, `./data/${new_title}.txt`, (err) => { !err ?? console.log(err); });
                fs.writeFile(`./data/${new_title}.txt`, new_contents, 'utf-8', (err) => {
                    if (err) console.log(err);
                    redirect(`/?id=${new_title}`);
                })
            });
        }
    }
    else if (pathData === '/delete/process') {
        if (req.method == 'POST') {
            let data = '';
            req.on('data', (chunk) => {
                data += chunk;
            })
            req.on('end', () => {   // 서버가 모든 데이터를 수신했을 때
                const urlSP = new URLSearchParams(data);
                let id = urlSP.get('id');

                fs.unlink(`./data/${id}.txt`, (err) => {
                    !err ?? console.log(err);
                    redirect('/');
                })
            });
        }
    }
    else res.writeHead(404).end("Not found");
});
app.listen(3000);