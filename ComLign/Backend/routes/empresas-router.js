var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var empresa = require('../models/empresa');

// Obtener empresas
router.get('/', function (req, res) {
    empresa.find({},{
        _id: true,
        nombreEmpresa: true,
        descripcionEmpresa: true,
        imagenSitio: true
    })
    .then(result => {
        res.send(result);
        res.end();
    })
    .catch(error => {
        res.send(error);
        res.end();
    });
})

// Obtener una empresa
router.get('/:idEmpresa', function(req, res){
    empresa.findOne({
        _id: mongoose.Types.ObjectId(req.params.idEmpresa)
    })
    .then(result => {
        res.send(result);
        res.end();
    })
    .catch(error => {
        res.send(error);
        res.end();
    });
})

// Guardar Empresa
router.post('/', function (req, res) {
    const nuevaEmpresa = new empresa({
        nombreEmpresa: req.body.nombreEmpresa,
        descripcionEmpresa: req.body.descripcionEmpresa,
        imagenSitio: '',
        paginas: [],
        productos: [],
        pedidos: [],
        clientes: [],
        disponible: true
    });

    nuevaEmpresa.save().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    })
})

module.exports = router;