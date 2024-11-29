const mongoose = require('mongoose');

const cartSchema = mongoose.Schema(
  {
    isOrder: {
      type: Boolean,
      default: false,
    },
    account_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'account',
      required: true, 
    },
    items: [
      {
        product: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'product',
          required: true, 
        },
        quantity: {
          type: Number,
          default: 1
        },
      },
    ],
  },
);

module.exports = mongoose.model('cart', cartSchema);
