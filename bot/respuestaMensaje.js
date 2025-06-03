const corpusGeneral = require("../corpus/generalCorpus");
const fs = require("fs");
const natural = require("natural");
const similarity = natural.JaroWinklerDistance;

function guardarMensajeDesconocido(mensaje) {
  const rutaArchivo = "./mensajesDesconocidos.json";

  const nuevoMensaje = {
    question: mensaje,
    answer:
      "Lo siento, no entendí tu pregunta. ¿Puedes reformularla o preguntar sobre otro tema?",
  };

  let mensajesExistentes = [];

  if (fs.existsSync(rutaArchivo)) {
    const data = fs.readFileSync(rutaArchivo, "utf-8");
    mensajesExistentes = JSON.parse(data);
  }

  const yaExiste = mensajesExistentes.some(
    (m) => m.question.toLowerCase() === mensaje.toLowerCase()
  );
  if (!yaExiste) {
    mensajesExistentes.push(nuevoMensaje);
    fs.writeFileSync(rutaArchivo, JSON.stringify(mensajesExistentes, null, 2));
  }
}

//Función búsqueda por similitud
function responderMensaje(inputUsuario) {
    let mejorCoincidencia = {
        puntuacion: 0,
        answer: "Lo siento, no entendí tu pregunta. ¿Puedes reformularla o preguntar sobre otro tema?",
        image: null
    };
    corpusGeneral.forEach((item) => {
        const puntuacion = similarity(
        inputUsuario.toLowerCase(),
        item.question.toLowerCase()
        );
        if (puntuacion > mejorCoincidencia.puntuacion) {
            mejorCoincidencia = { puntuacion, answer: item.answer, image: item.image || null };
        }
    });

    if (mejorCoincidencia.puntuacion < 0.7) {
        guardarMensajeDesconocido(inputUsuario);
        return{
            answer: "Lo siento, no entendí tu pregunta. ¿Puedes reformularla o preguntar sobre otro tema?",
            image: null
        };
    }
    return {
        answer: mejorCoincidencia.answer,
        image: mejorCoincidencia.image || null
    };
}

exports.responderMensaje = responderMensaje;
