const mongoose = require('mongoose');
require('dotenv').config()
try{
    const conn =  mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('database connnected')
    module.exports = conn;
}catch(err){
    console.error('database connection error',err);
}

