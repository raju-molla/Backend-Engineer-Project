const mongoose = require('mongoose')
const {Schema} = mongoose  
const userSchema = new Schema({
    userName: {
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        trim:true,
        enum:['student', 'mentor', 'admin']
    },


})

module.exports = mongoose.model('User', userSchema);