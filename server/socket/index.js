const User = require('../models/User');
const Message = require('../models/Message');

module.exports = (io)=>{
    io.on("connection",(socket)=>{
        console.log('socket connected: ',socket.id);
        socket.on("joinRoom",async({roomId})=>{
            const user = await User.findAndUpdateById(req.user.id,{
                isOnline: true,
                socketId: socket.id,
            })
            socket.join(roomId)
            io.to(roomId).emit("user joined",{userName: req.user.userName,roomId});
            socket.on("typing",()=>{
                socket.to(roomId).emit("typing",req.user.userName);
            });
            socket.on("stop typing",()=>{
                socket.to(roomId).emit("stop typing",{userName: req.user.userName,roomId});
            })
            socket.on("send message",async(data)=>{
                const sender = req.user.id;
                const message = await Message.create({sender: sender,content: data,room: roomId});
                const fullMessage = await message.populate("sender","username");
                io.to(roomId).emit("new message",fullMessage);
                
            })
            socket.on("disconnect",async()=>{
                const offlineUser = await User.findOneAndUpdate({socketId: socket.id},{isOnline: false});
                io.emit("offlineUser",offlineUser.userName);
            })
        }); 
    });
};