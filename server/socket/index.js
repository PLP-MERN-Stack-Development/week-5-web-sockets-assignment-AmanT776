const User = require('../models/User');
const Message = require('../models/Message');

module.exports = (io)=>{
    // Helper to get all users in a room
    const getUsersInRoom = async (roomId) => {
        // Find all users whose socketId is in the room and are online
        const sockets = await io.in(roomId).fetchSockets();
        const socketIds = sockets.map(s => s.id);
        const users = await User.find({ socketId: { $in: socketIds } }, 'userName isOnline');
        return users;
    };

    io.on("connection",(socket)=>{
        console.log('socket connected: ',socket.id);
        socket.on("joinRoom",async({roomId})=>{
            // You need to authenticate the user and set req.user, but for now, we'll skip this for demo
            // Assume userId and userName are sent in handshake query for demo
            const { userId, userName } = socket.handshake.query;
            await User.findByIdAndUpdate(userId,{
                isOnline: true,
                socketId: socket.id,
            });
            socket.join(roomId);
            io.to(roomId).emit("user joined",{userName,roomId});
            // Emit updated user list
            const users = await getUsersInRoom(roomId);
            io.to(roomId).emit("user list", users);

            socket.on("typing",()=>{
                socket.to(roomId).emit("typing",userName);
            });
            socket.on("stop typing",()=>{
                socket.to(roomId).emit("stop typing",{userName,roomId});
            });
            socket.on("send message",async(data)=>{
                const sender = userId;
                const message = await Message.create({sender: sender,content: data,room: roomId});
                const fullMessage = await message.populate("sender","userName");
                io.to(roomId).emit("new message",fullMessage);
            });
            socket.on("getUsersInRoom", async ({ roomId }) => {
                const users = await getUsersInRoom(roomId);
                socket.emit("user list", users);
            });
            socket.on("disconnect",async()=>{
                const offlineUser = await User.findOneAndUpdate({socketId: socket.id},{isOnline: false});
                if (offlineUser) {
                    io.emit("offlineUser",offlineUser.userName);
                }
                // Emit updated user list to all rooms this socket was in
                for (const roomId of socket.rooms) {
                    if (roomId !== socket.id) {
                        const users = await getUsersInRoom(roomId);
                        io.to(roomId).emit("user list", users);
                    }
                }
            });
        }); 
    });
};