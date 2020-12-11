var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var SECRET_KEY = 'secretkey12345678';
var usuarioCliente = require('../models/usuarioCliente');

// Obtener emails para verificar duplicacion
router.get('/emails', function (req, res) {
    usuarioCliente.find({}, {
            email: true,
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

// Registrar un usuario cliente
router.post('/signup', function (req, res) {
    const cliente = new usuarioCliente({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password: req.body.password,
        imagenPerfil: '',
        compras: []
    });
    cliente.save().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    })
});

// Loguear un usuario cliente
router.post('/login', function (req, res) {
    usuarioCliente.findOne({
            email: req.body.email
        }, {
            _id: true,
            email: true,
            nombre: true,
            apellido: true,
            password: true
        })
        .then(result => {
            if (result.password === req.body.password) {
                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({
                    _id: result._id
                }, SECRET_KEY, {
                    expiresIn: expiresIn
                });
                const dataEnviar = {
                    nombre: result.nombre,
                    apellido: result.apellido,
                    email: result.email,
                    rol: 'Cliente',
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }
                res.status(200).send({
                    mensaje: 'OK',
                    data: dataEnviar
                });
                res.end();
            } else {
                res.status(401).send({
                    mensaje: 'No-Autorizado: Password incorrecta'
                });
                res.end();
            }
        })
        .catch(error => {
            res.status(401).send({
                mensaje: 'No-Autorizado: Email no encontrado'
            });
            res.end();
        });
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

// Verificar Token
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return req.status(401).send('No-Autorizado');
    }

    const token = req.headers.authorization.split(' ')[1];
    if (token === null) {
        return req.status(401).send('No-Autorizado');
    }

    const payload = jwt.verify(token, SECRET_KEY);
    req.userClientId = payload._id;
    next();
}