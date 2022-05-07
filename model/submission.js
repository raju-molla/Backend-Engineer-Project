const mongoose = require('mongoose')
const {Schema} = mongoose  
const submissionSchema = new Schema({
   link:{
       type:String,
       default:null
   },
   grades:{
       type:String,
       default:null
   },
   student:{
       type:Schema.Types.ObjectId,
       ref:"User"
   },
   mentor:{
    type:Schema.Types.ObjectId,
    ref: "User"
   }

},
{
    timestamps:{
        createdAt:'submissionDate'
    }
}
)

module.exports = mongoose.model('Submission', submissionSchema);