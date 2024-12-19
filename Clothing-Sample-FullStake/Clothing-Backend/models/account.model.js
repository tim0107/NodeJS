const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const accountSchema = mongoose.Schema(
  {
    accountName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

accountSchema.pre('save', function (next) {
  const account = this;

  account.password = bcryptjs.hashSync(account.password, 12);

  next();
});

accountSchema.pre('findByIdAndUpdate', function (next) {
  const account = this.getUpdate();

  if (account.password) {
    account.password = bcryptjs.hashSync(account.password, 12);
  }

  next();
});

accountSchema.pre('findOneAndUpdate', function (next) {
  const account = this.getUpdate();

  if (account.password) {
    account.password = bcryptjs.hashSync(account.password, 12);
  }

  next();
});

accountSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.password;
  },
});

module.exports = mongoose.model('account', accountSchema);
