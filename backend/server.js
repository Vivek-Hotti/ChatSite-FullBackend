const express = require('express');
const { chats } = require('./data/data');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const app = express();
dotenv.config();
connectDB();

app.use(express.json());

app.get('/', (req, res)=>{
    res.send("API is running");
})

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

// Error handling middlewares:

app.use(notFound)
app.use(errorHandler)

// app.get('/api/chat', (req, res)=>{
//     res.send(chats);
// })

// app.get('/api/chat/:id', (req, res)=>{
//     // console.log(req.params.id);
//     const singleChat = chats.find(c=>c._id === req.params.id);
//     res.send(singleChat);
// })

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started at PORT ${PORT}`));