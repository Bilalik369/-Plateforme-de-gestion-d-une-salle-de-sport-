const mongoose = require('mongoose');



const ReservationSchema = new mongoose.Schema({
    mombre : {type : mongoose.Schema.Types.ObjectId , required:true},
    session : {type : mongoose.Schema.Types.ObjectId , required:true},
})

module.exports = mongoose.model('Reservation' ,ReservationSchema);