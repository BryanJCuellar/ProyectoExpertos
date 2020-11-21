var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var database = require('./modules/database');
var usuariosClienteRouter = require('./routes/usuariosCliente-router');
var usuariosEmpresaRouter = require('./routes/usuariosEmpresa-router');
var empresasRouter = require('./routes/empresas-router');

var app = express();

var nodemailer = require('nodemailer');

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


//Send mails

/*var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        email: 'tucorreo@gmail.com'
    }
});

var mensaje = "Hola desde nodejs...";

var mailOptions = {
  from: 'tucorreo@gmail.com',
  to: 'mi-amigo@yahoo.com',
  subject: 'Asunto Del Correo',
  text: mensaje
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email enviado: ' + info.response);
  }
});*/



app.listen(8888, function () {
    console.log('Servidor de ComLign levantado');
});