const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {type: String,required: true},
    email: {type: String, required: true,unique: true},
    password: {type: String,required: true},
    isOnline: Boolean,
    socketId: String
}, { timestamps: true });

module.exports = mongoose.model('User',userSchema);