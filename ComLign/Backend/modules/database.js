var mongoose = require('mongoose');

var servidor = 'localhost:27017';
var db = 'ComLign';

class Database {
    constructor() {
        mongoose.connect(`mongodb://${servidor}/${db}`,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => {
                console.log('Conexion a mongoDB exitosa');
            }).catch((error) => {
                console.log(error);
            });
    }
}

module.exports = new Database();