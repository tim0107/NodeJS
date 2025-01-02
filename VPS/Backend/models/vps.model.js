const mongoose = require('mongoose');

const vpsSchema = mongoose.Schema(
  {
    vpsName: {
      type: String,
      required: true,
    },
    os: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive',
    },
    config_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'config',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('vps', vpsSchema);
