var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var plan = require('../models/plan');

// Obtener planes
router.get('/', function (req, res){
    plan.find({},{
        nombrePlan: true,
        precio: true
    })
    .then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    })
});

module.exports = router;