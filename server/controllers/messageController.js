const Message = require('../models/Message');

exports.getMessages = async(req,res)=>{
    try{
        const messages = await Message.find({ room: req.params.roomId }).populate('sender','userName');
        if(!messages) return res.status(404).json({message: "message not found"});
        res.status(200).json(messages);
    }catch(err){
        console.error("error getting messages: ",err);
    }
}