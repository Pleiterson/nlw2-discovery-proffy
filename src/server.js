// criando o servidor para rodar o projeto Proffy
const express = require('express');
const server = express();
const port = 5500;

// chamando as funções estruturais de cada página
const {pageLanding, pageStudy, pageGiveClasses, saveClasses} = require('./pages');

// configurando o nunjucks (templates engine)
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
    express: server,
    noCache: true // guardando arquivos em cache, deixando mais rápida a navegação
});

server  // início e configuração do servidor
// configuando arquivos estáticos (css, scripts, imagens)
.use(express.static("public")) // puxando todas as imagens e scripts da pasta public
.use(express.urlencoded({extended: true})) // recebendo os dados do req.body
// rotas da aplicação
.get("/", pageLanding) // chamado a páginda Home
.get("/study", pageStudy) // chamado a página Estudar
.get("/give-classes", pageGiveClasses) // chamado a página Dar Aulas
.post("/save-classes", saveClasses) // enviando os dados do formulário
.listen(port) // start, porta utilizada para carregar as páginas