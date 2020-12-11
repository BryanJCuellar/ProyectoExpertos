var mongoose = require('mongoose');
var esquemaCliente = new mongoose.Schema({
    nombre: String,
    apellido: String,
    email: String,
    password: String,
    imagenPerfil: String,
    compras: Array
},{
    timestamps: true
});

module.exports = mongoose.model('clientes', esquemaCliente);