const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    number : {type:Number,require:true}
})

const logins = mongoose.model('login',loginSchema);

module.exports = logins;