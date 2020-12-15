var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var empresa = require('../models/empresa');

// Obtener empresas
router.get('/', function (req, res) {
    empresa.find({}, {
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

// Obtener un limite de empresas
router.get('/muestra', function (req, res) {
    empresa.find({}, {
            _id: true,
            nombreEmpresa: true,
            descripcionEmpresa: true,
            imagenSitio: true
        }).limit(8)
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
router.get('/:idEmpresa', function (req, res) {
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

// Subir imagen sitio empresa
/*router.post('/:idEmpresa/uploads', function (req, res) {

})*/

// Guardar Empresa
router.post('/', function (req, res) {
    const nuevaEmpresa = new empresa({
        nombreEmpresa: req.body.nombreEmpresa,
        descripcionEmpresa: req.body.descripcionEmpresa,
        imagenSitio: null,
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