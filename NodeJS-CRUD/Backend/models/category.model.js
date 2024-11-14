const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name: {
        type: String, 
        required: true,
        unique: true
    },
    image: {
        type: String,
        default: "https://www.shutterstock.com/image-vector/category-icon-flat-illustration-vector-600nw-2431883211.jpg"
    },
    order: Number,
}, {
   timestamps: true,
   versionKey: false,
});

module.exports = mongoose.model("category", categorySchema);