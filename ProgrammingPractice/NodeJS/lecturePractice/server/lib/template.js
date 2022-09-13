const path = require('path'); // 경로 데이터를 다루기 위한 모듈

const template = {
    base: (title, header, contents) => {
        return `
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
    },
    mainPage: (files) => {
        const getFileLinkList = (files) => {
            let linkList = "";
            files.filter(f => path.extname(f) === '.txt')
                .map(f => `<a href="./?id=${path.basename(f, '.txt')}">${path.basename(f, '.txt')}</a>`)
                .map(e => `<li>${e}</li>`)
                .forEach(e => linkList += e);
            linkList = `<ul>${linkList}</ul>`;
            return linkList;
        }
        let linkList = getFileLinkList(files);
        return `${linkList}<br/><br/>`
    }, 
    contentPage: (id, data) => {
        return `<pre style="white-space: pre-wrap">${data}</pre>`
            + `<br><a href="/update?id=${id}">update</a>`
            + `<form method="post" action="./delete/process?id=${id}" onsubmit="return confirm('정말로 삭제하시겠습니까?')">
                    <input type="hidden" name="id" value="${id}"/>
                    <input type="submit" value="삭제"/>
               </form>`
            + `<br/>`;
    }
}

module.exports = template;