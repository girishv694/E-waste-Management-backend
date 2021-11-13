const mongoose = require('mongoose')


const appointmentSchema = new mongoose.Schema({
    num : {type:String,required:true},
    date:{type:String,required:true},
    time:{type:String,required:true},
    day:{type:String,required:true},
    month:{type:String,required:true}},{
        timestamps:true
        })







const apppointment = mongoose.model('appointment',appointmentSchema);

module.exports = apppointment;