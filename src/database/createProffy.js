module.exports = async function(db, {proffyValue, classValue, classScheduleValues}) {
    // inserindo dados na tabela proffys
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `);

    const proffy_id = insertedProffy.lastID;

    // inserindo dados na tabela classes
    const insertedClasses = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `);

    const classes_id = insertedClasses.lastID;

    // inserindo dados na tabela classes_schedule
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO classes_schedule (
                classes_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${classes_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `);
    });

    // executando todos os db.runs() da tabela classes_schedule
    await Promise.all(insertedAllClassScheduleValues);
}