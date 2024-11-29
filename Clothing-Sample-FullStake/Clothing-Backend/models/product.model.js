const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category_id: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "category",
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model('product', productSchema);