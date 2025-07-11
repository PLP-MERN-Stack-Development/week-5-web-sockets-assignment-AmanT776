const Room = require('../models/Room');

exports.createRoom = async(req,res)=>{
    try{
        const createRoom = await Room.create(req.body);
        if(!createRoom) return res.status(400).json({message: "can't create a room"});
        res.status(200).json(createRoom); 
    }catch(err){
        console.error('create room error: ',err);
    }
};

exports.getRooms = async(req,res)=>{
    try{
        const rooms = await Room.find();
        if(!rooms) return res.status(404).json({message: "room not found"});
        res.status(200).json(rooms)
    }catch(err){
        console.error('get room error',err);
    }
}