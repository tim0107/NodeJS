const mongoose = require('mongoose');

const topUpSchema = mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'account',
  },
  bankId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'bank',
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['accepted', 'pending', 'failed'],
  },
},
{
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('topUp',topUpSchema);
