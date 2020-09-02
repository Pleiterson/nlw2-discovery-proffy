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
];

// dados do fomulário de semanas dos formulários dos professores
const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
];

// transformando o número do array de matérias em texto
function getSubject(subjectNumber) {    
    return subjects[+subjectNumber - 1]; // retornando o índice do array como texto para ser exibido na tela
}

// convertendo horas em minutos
function convertHoursMinuts(time) {
    const [hour, minutes] = time.split(":");
    return Number((hour * 60) + minutes);
}

module.exports = {
    subjects, weekdays, getSubject, convertHoursMinuts
};