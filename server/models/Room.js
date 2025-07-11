const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    name: {type: String, unique},
    timeStamps: true
});

module.exports = mongoose.model('Room',roomSchema);