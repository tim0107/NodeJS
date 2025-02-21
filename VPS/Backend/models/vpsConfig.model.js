const mongoose = require('mongoose');

const vpsConfigs = mongoose.Schema(
    {
        ram: {
            type: Number,
            required: true,
        },
        cpu: {
            type: String,
            required: true,
        },
        gpu: {
            type: String,
            required: true,
        },
        os: {
            type: String,
            required: true,
        },
        storage: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        img: {
            type: String,
            default: 'https://dummyimage.com/300'
        }
    },
    {
        timestamps: true,
        versionKey: false,
      },
);

module.exports = mongoose.model('config', vpsConfigs)