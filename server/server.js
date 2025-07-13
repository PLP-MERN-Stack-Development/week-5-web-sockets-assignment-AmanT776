require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {Server} = require('socket.io')
const {createServer} = require('node:http');
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});
const PORT = process.env.PORT || 7000;
const connectDb = require('./config/db')
app.use(cors());
app.use(express.json());

require('./socket/index')(io);

app.use('/api/auth/',require('./routes/authRoutes'));
app.use('/api/messages/',require('./routes/messageRoutes'));
app.use('/api/rooms/',require('./routes/roomRoutes'));


server.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
});

