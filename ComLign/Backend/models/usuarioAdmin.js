var mongoose = require('mongoose');
var esquemaAdmin = new mongoose.Schema({
    nombre: String,
    apellido: String,
    email: String,
    password: String,
    imagenPerfil: String,
    codigoAdministrador: String
}, {
    timestamps: true
});

module.exports = mongoose.model('usuarios', esquemaAdmin);