use ComLign;
db.createCollection('clientes');
db.createCollection('empresarios');
db.createCollection('administradores');
db.createCollection('empresas');
db.createCollection('planes');

db.planes.insertMany([{nombrePlan:'Empresarial', precio: 19.99},{nombrePlan:'Premium', precio: 49.99}]);