const mongoose = require('mongoose');


const orderSchema = mongoose.Schema(
    {
        customer: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        totalMoney: {
            type: Number,
            required: true,
        },
        paymentMethod: {
            type: String,
            enum: ["Online","On delivery"],
            default: "On delivery",
        },
        isPayment: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ["Received", "Shipping","Confirmed","Pending"],
            default: "Pending",
        },
        cart_id: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'cart'
        },

    },
);

module.exports = mongoose.model('order', orderSchema);