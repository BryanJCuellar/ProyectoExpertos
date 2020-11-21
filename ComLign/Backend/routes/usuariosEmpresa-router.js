var express = require('express');
var router = express.Router();
var usuarioEmpresa = require('../models/usuarioEmpresa');

//Guardar usuario (empresa)
router.post('/', function (req, res) {
    const empresario = new usuarioEmpresa({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password: req.body.password,
        imagenPerfil: '',
        empresa: req.body.idEmpresa,
        plan: null,
        planPagado: false
    });

    empresario.save().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    })
})

module.exports = router;