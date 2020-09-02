// importando o módulo que será utilizado
const Database = require('sqlite-async');

// executando o Database, banco de dados "database.sqlite"
function execute(db) {
    // inserindo comandos em SQL, criando as tabelas do banco de dados
    return db.exec(`
        CREATE TABLE IF NOT EXISTS proffys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );

        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject INTEGER,
            cost TEXT,
            proffy_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS classes_schedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            classes_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        );
    `);
};

// abrindo o Database, criando banco de dados "database.sqlite" e executando na função "execute"
module.exports = Database.open(__dirname + './database.sqlite').then(execute);