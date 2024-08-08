//configuring dotenv
const dotenv = require('dotenv');
dotenv.config()

//express
const express = require('express');
const app = express();
app.use(express.json());

//cors 
const cors = require('cors');
app.use(cors());


//routes

const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

app.get('/', (req, res) => {
    res.send('API is running');

})

//connecting database
const port = process.env.PORT;
const connectDB = require('./config/db');
const { Socket } = require('socket.io');
connectDB();


const server = app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})

const io = require('socket.io')(server, {
    pingTimeout : 60000,
    cors : {
        origin : "http://localhost:3000"
    }
})

io.on("connection", (socket) => {
    console.log('connected to socket.io')

    socket.on('setup', (userData)=> {
        socket.join(userData._id);
        //console.log(userData._id);
        socket.emit("connected")

    })

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User joined room :" + room)
    })

    socket.on('typing', (room) => socket.in(room).emit("typing"))
    socket.on('stop typing', (room) => socket.in(room).emit("stop typing"))
    socket.on('new message', (newMessageReceived) => {
        var chat = newMessageReceived.chat;

        if(!chat.users) return console.log("chat.users not defined")

        chat.users.forEach(user => {
            if(user._id == newMessageReceived.sender._id) return;

            socket.in(user._id).emit("message received", newMessageReceived)
        })
    })

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });


})