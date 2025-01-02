const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/VPSBackEnd');
        console.log('db contected')
    } catch (error) {
    console.log('connect failed',error.message)

    }
}

module.exports = connectDB;