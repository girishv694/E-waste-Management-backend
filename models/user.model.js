const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    username : {type:String},
    email : {type:String},
    password : {type:String}
})

const logins = mongoose.model('user',loginSchema);

module.exports = logins;