const mongoose = require('mongoose');

const feedRequestSchema= new mongoose.Schema({
   farmerName:{type:String, required:true},
   farmerPhone:{type:Number, required:true},
   feedType:{type:String, required:true},
   quantity:{type:Number, required:true, min:1, max:2},
   unitCost:{type:Number,default:100000},
   totalCost:{type:Number, required:true},
   paymentMethod:{type:String, required:true},
   requestDate:{type:Date, default:Date.now}
});

module.exports = mongoose.model('FeedRequests', feedRequestSchema);