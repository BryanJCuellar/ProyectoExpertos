var express = require('express');
var router = express.Router();
var usuarioCliente = require('../models/usuarioCliente');

//Guardar usuario (cliente)
router.post('/', function (req, res) {
    let cliente = new usuarioCliente({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password: req.body.password,
        imagenPerfil: ''
    });
    cliente.save().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    })
});

// Obtener todos los clientes (Opcional)
router.get('/', function (req, res) {
    usuarioCliente.find({}, {
            _id: true,
            nombre: true,
            apellido: true,
            email: true
        })
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
});

module.exports = router;