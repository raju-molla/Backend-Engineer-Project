const mongoose = require('mongoose')
const {Schema} = mongoose  
const assignmentSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    mentor:{
            type:Schema.Types.ObjectId,
            ref:'User'  
    },
    dateLine: String,
},
{
    timestamps:{
        createdAt:'crAt'
    }
}
)

module.exports = mongoose.model('Assignment', assignmentSchema);