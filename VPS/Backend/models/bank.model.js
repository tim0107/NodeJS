const mongoose = require('mongoose');

const bankSchema = mongoose.Schema(
  {
    bankName: {
      type: String,
      required: true,
    },
    bankNumber: {
      type: Number,
      required: true,
    },
    bankOwner: {
      type: String,
      required: true,
    },
    status: {
      type: String, 
      enum: ['active', 'inactive'], 
      default: 'inactive', 
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
module.exports = mongoose.model('bank', bankSchema);
