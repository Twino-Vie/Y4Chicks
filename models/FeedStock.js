const mongoose = require('mongoose');

const feedStockSchema = new mongoose.Schema({
  feedType: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true}
});

module.exports = mongoose.model('FeedStock', feedStockSchema);

