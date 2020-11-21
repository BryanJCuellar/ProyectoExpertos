var mongoose = require('mongoose');
var esquemaEmpresa = new mongoose.Schema({
    nombreEmpresa: String,
    descripcionEmpresa: String,
    imagenSitio: String,
    paginas: Array,
    productos: Array,
    pedidos: Array,
    clientes: Array,
    disponible: Boolean
});

module.exports = mongoose.model('empresas', esquemaEmpresa);