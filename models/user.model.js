const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    username : {type:String,required:true},
    email : {type:String,required:true},
    password : {type:String,required:true},
    // tokens :[{
    //     token : {
    //         type:String,
    //         required:true
    //     }
    // }]
},{
    timestamps:true
})

const logins = mongoose.model('user',loginSchema);

module.exports = logins;