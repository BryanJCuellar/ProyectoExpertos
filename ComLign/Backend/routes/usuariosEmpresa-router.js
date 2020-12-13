var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var SECRET_KEY = 'secretkey87654321';
var usuarioEmpresa = require('../models/usuarioEmpresa');

// Obtener ID de token
router.get('/tokenID', verifyToken, function (req, res) {
    res.send({
        id: req._id
    });
})

// Obtener un usuario empresa
/*router.get('/:idEmpresario', verifyToken, function (req, res) {
    usuarioEmpresa.findOne({
            _id: mongoose.Types.ObjectId(req.params.idEmpresario)
        })
        .then(result => {
            res.send(result);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
})*/

// Obtener un usuario empresa con aggregate
router.get('/:idEmpresario', verifyToken, function (req, res) {
    usuarioEmpresa.aggregate([{
                $lookup: {
                    from: "empresas",
                    localField: "empresa",
                    foreignField: "_id",
                    as: "empresa"
                }
            },
            {
                $match: {
                    _id: mongoose.Types.ObjectId(req.params.idEmpresario)
                }
            }
        ])
        .then(result => {
            res.send(result[0]);
            res.end();
        })
        .catch(error => {
            res.send(error);
            res.end();
        });
});

// Guardar o actualizar plan en empresario
router.put('/:idEmpresario/planes/:idPlan', verifyToken, function (req, res) {
    usuarioEmpresa.updateOne({
        _id: mongoose.Types.ObjectId(req.params.idEmpresario)
    },{
       tarjeta: {
           nombreTarjeta: req.body.nombreTarjeta,
           numeroTarjeta: req.body.numeroTarjeta,
           mesVencimiento: req.body.mesVencimiento,
           anioVencimiento: req.body.anioVencimiento
       },
       plan: mongoose.Types.ObjectId(req.params.idPlan),
       planPagado: true
    })
    .then(result => {
        res.send(result);
        res.end();
    })
    .catch(error => {
        res.status(500).send(error);
        res.end();
    });
});

// Duplicacion de email
router.post('/emails', function (req, res) {
    usuarioEmpresa.findOne({
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

// Registrar un usuario empresa
router.post('/signup', function (req, res) {
    const empresario = new usuarioEmpresa({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password: req.body.password,
        imagenPerfil: null,
        empresa: req.body.idEmpresa,
        plan: null,
        tarjeta: [],
        planPagado: false
    });

    empresario.save()
        .then(result => {
            const expiresIn = 24 * 60 * 60;
            const accessToken = jwt.sign({
                _id: result._id,
                rol: 'Empresario'
            }, SECRET_KEY, {
                expiresIn: expiresIn
            });
            const dataEnviar = {
                email: result.email,
                rol: 'Empresario',
                accessToken: accessToken,
                expiresIn: expiresIn
            }
            res.status(200).send({
                mensaje: 'Registrado',
                data: dataEnviar
            });
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        })
});

// Loguear un usuario empresa
router.post('/login', function (req, res) {
    usuarioEmpresa.aggregate([{
                $lookup: {
                    from: "empresas",
                    localField: "empresa",
                    foreignField: "_id",
                    as: "empresa"
                }
            },
            {
                $match: {
                    email: req.body.email
                }
            },
            {
                $project: {
                    _id: true,
                    email: true,
                    password: true,
                    "empresa.nombreEmpresa": true
                }
            }
        ])
        .then(result => {
            if (result[0].password !== req.body.password) {
                res.status(401).send({
                    mensaje: 'No-Autorizado: Password incorrecta'
                });
                res.end();
            }
            if (result[0].empresa[0].nombreEmpresa !== req.body.nombreEmpresa) {
                res.status(401).send({
                    mensaje: 'No-Autorizado: Empresa no encontrada'
                });
                res.end();
            }
            const expiresIn = 24 * 60 * 60;
            const accessToken = jwt.sign({
                _id: result[0]._id,
                rol: 'Empresario'
            }, SECRET_KEY, {
                expiresIn: expiresIn
            });
            const dataEnviar = {
                email: result[0].email,
                rol: 'Empresario',
                accessToken: accessToken,
                expiresIn: expiresIn
            }
            res.status(200).send({
                mensaje: 'OK',
                data: dataEnviar
            });
            res.end();
        })
        .catch(error => {
            res.status(401).send({
                mensaje: 'No-Autorizado: Email no encontrado'
            });
            res.end();
        });
});

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
        if (payload.rol !== 'Empresario') {
            return res.status(401).send('No-Autorizado');
        }
        req._id = payload._id;
        req.rol = payload.rol;
        next();
    } else {
        res.status(401).send('No-Autorizado');
    }
}