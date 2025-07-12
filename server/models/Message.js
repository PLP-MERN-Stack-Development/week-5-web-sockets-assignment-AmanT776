const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: String,
    sender: {type: mongoose.Schema.Types.ObjectId,ref: "User"},
    room: {type: mongoose.Schema.Types.ObjectId,ref: "Room"}
}, { timestamps: true });

module.exports = mongoose.model('Message',messageSchema);