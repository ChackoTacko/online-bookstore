const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  userId: { type: String, required: true },
  books: [new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
  })]
});

module.exports = mongoose.model('Cart', CartSchema);
