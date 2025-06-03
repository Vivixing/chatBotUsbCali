const saludos = require('./saludos');
const beneficios = require('./beneficiosIntitucionales');
const espacios = require('./espaciosAcademicos');
const informacion = require('./infoGeneral');

const corpusGeneral = [
    ...saludos,
    ...beneficios,
    ...espacios,
    ...informacion
];

module.exports = corpusGeneral;