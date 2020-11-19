var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var usuariosRouter = require('./routes/usuarios-router');


// Middleware
app.use(cors()); // Permita peticiones de otros origenes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/usuarios', usuariosRouter);

app.listen(8888, function () {
    console.log('Servidor de ComLign levantado');
});