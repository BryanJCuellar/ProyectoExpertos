var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var database = require('./modules/database');
var usuariosClienteRouter = require('./routes/usuariosCliente-router');
var usuariosEmpresaRouter = require('./routes/usuariosEmpresa-router');
var empresasRouter = require('./routes/empresas-router');

var app = express();

// Middleware
app.use(cors()); // Permita peticiones de otros origenes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//Cliente
app.use('/usuarios/clientes', usuariosClienteRouter);
//Empresario
app.use('/usuarios/empresas', usuariosEmpresaRouter);
//Empresas
app.use('/empresas', empresasRouter);

app.listen(8888, function () {
    console.log('Servidor Backend de ComLign levantado');
});