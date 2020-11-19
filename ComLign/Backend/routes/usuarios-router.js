var express = require('express');
var router = express.Router();
var usuarios = [];

//Guardar usuario
router.post('/', function (req, res) {
    let usuario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        tipoUsuario: req.body.tipoUsuario
    };
});