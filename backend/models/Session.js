const mongoose = require('mongoose');




const SessionSchema = new mongoose.Schema({
    title :{ type :String ,required:true},
    description:{type:String , required:true},
    Date :{type:Date, required:true},
    trainer :{type:mongoose.Schema.Types.ObjectId , ref:'User', required:true},

});

module.exports = mongoose.model('Session', SessionSchema);