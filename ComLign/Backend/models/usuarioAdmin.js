var mongoose = require('mongoose');
var esquemaAdmin = new mongoose.Schema({
    tipoUsuario: String,
    nombre: String,
    apellido: String,
    email: String,
    password: String,
    imagenPerfil: String,
    codigoAdministrador: String
});

module.exports = mongoose.model('usuarios', esquemaAdmin);