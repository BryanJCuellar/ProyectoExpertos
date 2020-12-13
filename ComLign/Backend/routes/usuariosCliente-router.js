var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var SECRET_KEY = 'secretkey12345678';
var usuarioCliente = require('../models/usuarioCliente');

// Obtener ID de token
router.get('/tokenID', verifyToken, function (req, res) {
    res.send({
        text: 'This is your token ID and Rol',
        id: req._id,
        rol: req.rol
    });
})

// Obtener un usuario cliente
router.get('/:idCliente', verifyToken, function (req, res) {
    usuarioCliente.findOne({
            _id: mongoose.Types.ObjectId(req.params.idCliente)
        }, {
            id: true,
            nombre: true,
            apellido: true,
            email: true,
            password: true,
            imagenPerfil: true
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

// Duplicacion de email
router.post('/emails', function (req, res) {
    usuarioCliente.findOne({
        email: req.body.email
    }, (err, email) => {
        if (err) return res.status(500).send('Server error');
        if (!email) {
            res.status(200).send({
                mensaje: 'OK'
            });
            res.end()
        } else {
            res.status(403).send({
                mensaje: 'Email ya registrado'
            });
            res.end();
        }
    })
})

// Registrar un usuario cliente
router.post('/signup', function (req, res) {
    const cliente = new usuarioCliente({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password: req.body.password,
        imagenPerfil: null,
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
            password: true
        })
        .then(result => {
            if (result.password === req.body.password) {
                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({
                    _id: result._id,
                    rol: 'Cliente'
                }, SECRET_KEY, {
                    expiresIn: expiresIn
                });
                const dataEnviar = {
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

// Obtener todos los clientes
/*router.get('/', function (req, res) {
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
});*/

module.exports = router;

// Verificar Token
function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        if (bearerToken === null) {
            return res.status(401).send('No-Autorizado');
        }
        const payload = jwt.verify(bearerToken, SECRET_KEY);
        if (payload.rol !== 'Cliente') {
            return res.status(401).send('No-Autorizado');
        }
        req._id = payload._id;
        req.rol = payload.rol;
        next();
    } else {
        res.status(401).send('No-Autorizado');
    }
}

/*function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.status(401).send('No-Autorizado');
    }
}*/