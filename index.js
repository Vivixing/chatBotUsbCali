const {responderMensaje} = require('./bot/respuestaMensaje');
const qrcode = require('qrcode-terminal');
const {obtenerUsuariosSaludados} = require('./bot/usuariosSaludadosManejo')
const {guardarUsuarioSaludado} = require('./bot/usuariosSaludadosManejo');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const contactosBienvenida = require('./bot/contactosBienvenida');
const mensajeBienvenida = require('./corpus/mensajeBienvenida');

//Autenticación local 
const client = new Client({
    authStrategy: new LocalAuth()
});

//control bienvenida
const usuariosSaludados = obtenerUsuariosSaludados();

//Generación del código QR por consola
client.on("qr", (qr) => {
    qrcode.generate(qr, {small: true});
    console.log("Escanea el código QR");
});

//Conexión del cliente
client.on("ready", async () => {
    console.log("✅ Bot conectado y listo");

    const mensaje = mensajeBienvenida[0];

    for (const contacto of contactosBienvenida) {

        if(!contacto.endsWith('@c.us')) {
            console.log(`⛔ No es un contacto válido: ${contacto}`);
            continue;
        }

        if (!usuariosSaludados.has(contacto)) {
            try {
                const imagenBienvenida = MessageMedia.fromFilePath(mensaje.image);
                await client.sendMessage(contacto, imagenBienvenida);
                await client.sendMessage(contacto, mensaje.message);
                console.log(`✅ Mensaje de bienvenida enviado a ${contacto}`);
                usuariosSaludados.add(contacto);
                guardarUsuarioSaludado(contacto);
            } catch (error) {
                console.error(`❌ Error al enviar mensaje a ${contacto}:`, error);
            }
        } else {
            console.log(`ℹ️ El usuario ${contacto} ya ha sido saludado.`);
        }
    }
});

//Escucha mensajes
client.on('message', async msg => {
    const chatId = msg.from;

    // Validar si es un contacto válido
    if (!chatId.endsWith('@c.us')) {
        console.log(`⛔ No es un contacto válido ${chatId}`);
        return;
    }

    const respuesta = responderMensaje(msg.body);

    //10 sg de espera antes de responder
    setTimeout(async () => {
        console.log("Enviando respuesta al usuario:", respuesta.answer);

        await client.sendMessage(chatId, respuesta.answer);
        console.log("Respuesta enviada al usuario:", chatId);

        if (respuesta.image) {
            const media = MessageMedia.fromFilePath(respuesta.image);
            await client.sendMessage(chatId, media);
        }
    }, 10000);
});


client.on('authenticated', () => {
    console.log('Cliente autenticado');
});
    
client.on('auth_failure', (msg) => {
    console.error('Error de autenticación:', msg);
});

client.on('disconnected', (reason) => {
    console.log('Cliente desconectado:', reason);
    client.destroy();
    client.initialize();
});

client.on('error', (error) => {
    console.error('Error del cliente:', error);
});

client.initialize();