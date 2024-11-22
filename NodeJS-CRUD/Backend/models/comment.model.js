const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
    {
        commentName: {
            type: String,
            require: true,   
        },
        description: {
            type: String,
            require: true,
        },
        product_id: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'product',
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

module.exports = mongoose.model('comment', commentSchema);