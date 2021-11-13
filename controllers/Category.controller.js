const express = require('express')
const Category =require('../models/category.model')


const router = express.Router();

router.post('',async(req,res)=>{

    let r= await Category.create(req.body)

    return res.send(r)
})

router.get('',async(req,res)=>{

    let r= await Category.find({})
    return res.send(r)
})

router.get("/:name",async(req,res)=>{
    let r= await Category.find({name:req.params.name})
    
    return res.send(r)
})

module.exports = router;