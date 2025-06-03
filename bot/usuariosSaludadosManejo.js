const usuariosSaludadosArchivo = './usuariosSaludados.json';
const fs = require('fs');

function obtenerUsuariosSaludados() {
    if (!fs.existsSync(usuariosSaludadosArchivo)) {
        fs.writeFileSync(usuariosSaludadosArchivo, JSON.stringify([]));
    }
    const data = fs.readFileSync(usuariosSaludadosArchivo, 'utf-8');
    return new Set(JSON.parse(data));
}

function guardarUsuarioSaludado(chatId) {
    const usuarios = JSON.parse(fs.readFileSync(usuariosSaludadosArchivo, 'utf-8'));
    if (!usuarios.includes(chatId)) {
        usuarios.push(chatId);
        fs.writeFileSync(usuariosSaludadosArchivo, JSON.stringify(usuarios, null, 2));
    }
}
exports.obtenerUsuariosSaludados = obtenerUsuariosSaludados;
exports.guardarUsuarioSaludado = guardarUsuarioSaludado;