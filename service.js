const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv').config();

// router
const userRouter = require('./router/user')
app.use(express.json());

app.use('/user',userRouter)

// database connect 
mongoose.connect('mongodb://localhost:27017/assessment')
.then(()=>{
    console.log('Database connect successfully');
})
.catch((err)=>{
    console.log(err);
})


const port = process.env.PORT;
app.listen(port, ()=>{
    console.log('server is running at port', port);
})