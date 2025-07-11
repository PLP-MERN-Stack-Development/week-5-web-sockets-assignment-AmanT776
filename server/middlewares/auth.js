const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.protect = (req,res,next)=>{
    const auth = req.headers.authorization;
    if(!auth || !auth.startsWith('Bearer ')) return res.status(403).json({message: "unauthorized"});
    const token = auth.split(" ")[1];
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET); 
        req.user = decoded;
    }catch(err){
        console.error('jwt decoding error: ',err);
    }
}