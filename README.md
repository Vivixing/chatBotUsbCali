
# 🤖 Bot Académico USB Cali

Este proyecto es un bot automatizado diseñado para brindar atención académica a estudiantes y usuarios interesados en la Universidad San Buenaventura de Cali. Utilizando técnicas de **Procesamiento de Lenguaje Natural (PLN)** para responder a preguntas frecuentes mediante WhatsApp.



## 📌 Descripción
El bot responde de forma automática a mensajes de texto enviados a través de WhatsApp. Está alimentado por un **corpus de preguntas y respuestas** sobre temas institucionales como:

- Mensajes de bienvenida
- Saludos y atención inicial
- Beneficios institucionales
- Espacios académicos
- Información general (carreras, horarios, misión, etc.)

Además, hace uso de algoritmos de similitud para encontrar la respuesta más adecuada utilizando la librería `natural`.
## 🧠 Bot

El bot utiliza el algoritmo **Jaro-Winkler** para medir la similitud entre el mensaje del usuario y las posibles preguntas del corpus, eligiendo la respuesta más cercana.
## ⚙️ Tecnologías Utilizadas

- [Node.js](https://nodejs.org/)
- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
- [natural](https://www.npmjs.com/package/natural) (`JaroWinklerDistance`)
- [qrcode-terminal](https://www.npmjs.com/package/qrcode-terminal)
## 🚀 Instalación y Ejecución
1. Clonar el repositorio
```
git clone https://github.com/tuusuario/bot-academico-usb.git
cd bot-academico-usb
```
2. Instalar las dependencias
```
npm install
```
3. Antes de ejecutar el programa es necesario crear el siguiente archivo en esta ruta y contendrá lo siguiente:

`bot/contactosBienvenida.js`
```
const contactosBienvenida = new Set([
    "<Prefijo de área><Número>@c.us"
])

module.exports = contactosBienvenida;
```

4. Ejecutar el bot
```
node index.js
```
5. **Escanear el código QR** que aparecerá en la consola con tu WhatsApp para autenticar la sesión.
## 💬 Funcionamiento
- El bot escucha los mensajes entrantes y responde automáticamente después de una espera de 10 segundos.

- Si el usuario ya ha sido saludado, no vuelve a enviar el mensaje de bienvenida.

- Las respuestas pueden incluir imágenes si están definidas en el corpus.
## 👤 Público Objetivo
Este bot está diseñado principalmente para:

- Estudiantes actuales de la USB Cali

- Aspirantes interesados en ingresar a la universidad

- Personal administrativo que desea automatizar respuestas frecuentes
