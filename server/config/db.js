const mongoose = require('mongoose');
require('dotenv').config()
try{
    const conn = await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    },()=>{
        console.log('database connnected');
    })
}catch(err){
    console.error('database connection error',err);
}

module.exports = conn;