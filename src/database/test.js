const Database = require('./db');
const createProffy = require('./createProffy');

Database.then(async(db) => {
    // inserindo os dados no banco de dados
    proffyValue = {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "89998562147",
        bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões."
    }

    classValue = {
        subject: 1,
        cost: "20"
        // o proffy_id vem pelo banco de dados        
    }

    classScheduleValues = [
        // o classes_id vem pelo banco de dados, após o cadastro das aulas
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ];

    createProffy(db, {proffyValue, classValue, classScheduleValues});

    // consultando os dados do bando de dados
    // consultando todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys");
    // console.log(selectedProffys)

    /* consultar as classes (matérias) de um determinado professor
    e trazer junto os dados deste professor */
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffy_id)
        WHERE classes.proffy_id = 1;
    `);
    // console.log(selectClassesAndProffys)

    /* o horário que a pessoa trabalha, por exemplo, é de 08hrs as 18hrs
    o horário do time_from é 08hrs, e precisa ser menor ou igual ao horário solicitado
    o time_to precisa ser acima */
    const selectClassesSchedules = await db.all(`
        SELECT classes_schedule.*
        FROM classes_schedule
        WHERE classes_schedule.classes_id = 1
        AND classes_schedule.weekday = 0
        AND classes_schedule.time_from <= 1300
        AND classes_schedule.time_to > 1300;
    `);
    // console.log(selectClassesSchedules)
});