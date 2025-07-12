const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    name: {type: String, unique: true},
}, {timestamps: true});

module.exports = mongoose.model('Room',roomSchema);