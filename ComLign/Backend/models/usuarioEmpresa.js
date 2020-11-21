var mongoose = require('mongoose');
var esquemaEmpresario = new mongoose.Schema({
    nombre: String,
    apellido: String,
    email: String,
    password: String,
    imagenPerfil: String,
    empresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "empresas"
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "planes"
    },
    planPagado: Boolean
});

module.exports = mongoose.model('empresarios', esquemaEmpresario);