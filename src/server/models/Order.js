const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      book: { type: Schema.Types.ObjectId, ref: 'Book' },
      quantity: { type: Number, default: 1 }
    }
  ],
});

module.exports = mongoose.model('Order', OrderSchema);
