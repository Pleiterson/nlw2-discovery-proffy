// dados dos formulários dos professores
const proffys = [
    {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "89998562147",
        bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    },
    {
        name: "Mayk Brito",
        avatar: "https://avatars2.githubusercontent.com/u/6643122?s=400&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4",
        whatsapp: "89971963289",
        bio: "Instrutor de Educação Física para iniciantes, minha missão de vida é levar saúde e contribuir para o crescimento de quem se interessar. Comecei a minha jornada profissional em 2001, quando meu pai me deu dois alteres de 32kg com a seguinte condição: 'Aprenda a fazer dinheiro com isso!'",
        subject: "Educação Física",
        cost: "40",
        weekday: [1],
        time_from: [720],
        time_to: [1220]
    }
]
// dados do fomulário de matérias dos formulários dos professores
const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]
// dados do fomulário de semanas dos formulários dos professores
const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

// criando o servidor para rodar o projeto Proffy
const express = require('express')
const server = express()

// configurando o nunjucks (templates engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true // guardando arquivos em cache, deixando mais rápida a navegação
})

server
// configuando arquivos estáticos (css, scripts, imagens)
.use(express.static("public")) // puxando todas as imagens e scripts da pasta public
// rotas da aplicação
.get("/", pageLanding) // chamado a páginda Home
.get("/study", pageStudy) // chamado a página Estudar
.get("/give-classes", pageGiveClasses) // chamado a página Dar Aulas
.listen(5500) // start, porta utilizada para carregar as páginas

// função que retorna a página "Home" da plataforma Proddy
function pageLanding(req, res) {
    return res.render("index.html")
}

// função que retorna a página "Estudar" da plataforma Proffy
function pageStudy(req, res) {
    const filters = req.query // requerindo os dados dos formulários da página
    return res.render("study.html", {proffys, filters, subjects, weekdays})
}

// função que retorna a página "Dar Aulas" da plataforma Proffy
function pageGiveClasses(req, res) {
    const data = req.query // requerindo os dados dos formulários da página    
    const isNotEmpty = Object.keys(data).length > 0 // transformando data em array, [name, avatar, whatsapp, bio. subject, weekdar, time_from, time_to]

    // se tiver dados adiciona os dados na lista dos proffys
    if (isNotEmpty) {      
        data.subject = getSubject(data.subject) // enviando o índice do array
        proffys.push(data) // adicionando os dados na lista dos proffys
        // redirecionando os dados para a página study, já com o novo professor
        return res.redirect("/study")
    }

    // se nao tiver dados, não adiciona e mostra a página    
    return res.render("give-classes.html", {subjects, weekdays})
}

// transformando o número do array de matérias em texto
function getSubject(subjectNumber) {
    const index = +subjectNumber - 1

    return subjects[index] // retornando o índice do array como texto para ser exibido na tela
}