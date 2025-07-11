const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config()

exports.signup = async (req,res)=>{
    try{
        const {userName,email,password} = req.body;
        const user = await User.find(email);
        if(user) return res.status(409).res({message: "email already found"});
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const createUser = await User.create({userName,email,password: hash});
        const token = jwt.sign({id: createUser._id,userName: createUser.userName});
        res.status(200).json(token);
    }catch(err){
        console.error('signup error: ',err);
    }
}

exports.login = async(req,res)=>{
    try{
        const {userName,email,password} = req.body;
        const user = await User.find(email);
        if(!user) return res.status(401).res({message: 'user not found'});
        const match = bcrypt.compare(password,user.password);
        if(!match) return res.status(401).json({message: "password doesn't match"});
        const token = jwt.sign({id: user._id,userName: user.userName});
        res.status(200).json(token);
    }catch(err){
        console.error('login error: ',err);
    }
}