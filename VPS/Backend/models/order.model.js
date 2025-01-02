const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'account',
    },
    vpsId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'vps',
    },
    amount: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'success', 'completed', 'failed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('order', orderSchema);
