const mongoose = require('mongoose');

const commentShema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  account_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'account',
  },
  product_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'product',
  },
});


module.exports = mongoose.model('comment', commentShema);