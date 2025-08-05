const mongoose = require("mongoose");
const chicksRequestSchema = new mongoose.Schema({

    FarmerType: {
        type: String,
        required: true
    },

    chickType: {
        type: String,
        required: true
    },
    chickCategory: {
        type: String,
        required: true
    },
    numChicks: {
        type: Number,
        required: true
    },
    chickAge: {
        type: Number,
        required: true
    },
    dateAdded: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('chicksRequest', chicksRequestSchema) ;