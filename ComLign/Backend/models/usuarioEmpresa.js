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
    tarjeta: Array,
    planPagado: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('empresarios', esquemaEmpresario);