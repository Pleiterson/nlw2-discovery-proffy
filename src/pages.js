const Database = require('./database/db');
// desestruturando os comandos de format.js
const {subjects, weekdays, getSubject, convertHoursMinuts} = require('./utils/format');

// função que retorna a página "Home" da plataforma Proffy
function pageLanding(req, res) {
    return res.render("index.html");
}

// função que retorna a página "Estudar" da plataforma Proffy
async function pageStudy(req, res) {
    const filters = req.query; // requerindo os dados dos formulários da página

    if (!filters.subject || !filters.weekday || !filters.time) {
        return res.render("study.html", {filters, subjects, weekdays});
    }

    // convertendo horas em minutos
    const timeToMinutes = convertHoursMinuts(filters.time);
    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT *
            FROM classes_schedule
            WHERE classes_schedule.classes_id = classes.id
            AND classes_schedule.weekday = ${filters.weekday}
            AND classes_schedule.time_from <= ${timeToMinutes}
            AND classes_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}';
    `

    // caso haja erro na consulta do banco de dados
    try {
        const db = await Database;
        const proffys = await db.all(query);

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject);
        });

        return res.render("study.html", {proffys, filters, subjects, weekdays});
    } catch (error) {
        console.log(error);
    }
}

// função que retorna a página "Dar Aulas" da plataforma Proffy
function pageGiveClasses(req, res) {    
    // se nao tiver dados, não adiciona e mostra a página    
    return res.render("give-classes.html", {subjects, weekdays});
}

async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy');

    // inserindo os dados no banco de dados
    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost        
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {            
            weekday,
            time_from: convertHoursMinuts(req.body.time_from[index]),
            time_to: convertHoursMinuts(req.body.time_to[index])
        }
    });

    try {
        const db = await Database;
        await createProffy(db, proffyValue, classValue, classScheduleValues);
        
        let queryString = "?subject=" + req.body.subject;
        queryString += "&weekday=" + req.body.weekday[0];
        queryString += "&time=" + req.body.time_from[0];

        // redirecionando os dados para a página study, já com o novo professor
        return res.redirect("/study" + queryString);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    pageLanding, pageStudy, pageGiveClasses, saveClasses
};