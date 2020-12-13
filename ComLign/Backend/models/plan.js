var mongoose = require('mongoose');
var esquemaPlan = new mongoose.Schema({
    nombrePlan: String,
    precio: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('planes', esquemaPlan);