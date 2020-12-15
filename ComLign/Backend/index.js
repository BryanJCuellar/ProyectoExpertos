var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var database = require('./modules/database');
var usuariosClienteRouter = require('./routes/usuariosCliente-router');
var usuariosEmpresaRouter = require('./routes/usuariosEmpresa-router');
var empresasRouter = require('./routes/empresas-router');
var planesRouter = require('./routes/planes-router');

var app = express();

// Middleware
app.use(cors()); // Permita peticiones de otros origenes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/', function (req, res){
    res.send('Ruta principal de servidor Backend de ComLign activa');
})
// Cliente
app.use('/clientes', usuariosClienteRouter);
// Empresario
app.use('/empresarios', usuariosEmpresaRouter);
// Administradores

// Empresas
app.use('/empresas', empresasRouter);
// Planes
app.use('/planes', planesRouter);

app.set('port', process.env.PORT || 8888);

app.listen(app.get('port'), function () {
    console.log(`Servidor ComLign en el puerto ${app.get('port')}`);
});