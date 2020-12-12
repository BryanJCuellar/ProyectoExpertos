use ComLign;
db.createCollection('clientes');
db.createCollection('empresarios');
db.createCollection('administradores');
db.createCollection('empresas');
db.createCollection('planes');

db.planes.insertMany([{nombrePlan:'Empresarial', precio: 19.99},{nombrePlan:'Premium', precio: 49.99}]);

db.administradores.insert({
  "nombre": "Bryan",
  "apellido": "Cuellar",
  "email": "bryanb123@yahoo.com",
  "password": "asd.456123",
  "imagenPerfil": "",
  "codigoAdministrador": "qwery12345asdf810"
});