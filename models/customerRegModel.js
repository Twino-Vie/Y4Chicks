const mongoose = require("mongoose");
const customerRegSchema = new mongoose.Schema({
    farmerName: {
        type: String,
        required: true
    },

    farmerAge: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    recommenderName: {
        type: String,
        required: true
    },

    farmerNIN: {
        type: String,
        required: true,
        unique: true
    },

    farmerContact: {
        type: Number,
        required: true
    }

});


module.exports = mongoose.model('farmerRegister', customerRegSchema);