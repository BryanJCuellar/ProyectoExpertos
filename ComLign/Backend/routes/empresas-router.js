var express = require('express');
var router = express.Router();
var empresa = require('../models/empresa');

//Guardar Empresa
router.post('/', function (req, res) {
    const company = new empresa({
        nombreEmpresa: req.body.nombreEmpresa,
        descripcionEmpresa: req.body.descripcionEmpresa,
        imagenSitio: '',
        paginas: [],
        productos: [],
        pedidos: [],
        clientes: [],
        disponible: true
    });

    company.save().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    })
})

module.exports = router;