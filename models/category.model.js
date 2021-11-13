const mongoose = require('mongoose')


const cayegorySchema = new mongoose.Schema({
    name:{type:String,required:true},
    item:[{type:Object,required:true}]
    },{
        timestamps:true
        })







const category = mongoose.model('category',cayegorySchema);

module.exports = category;