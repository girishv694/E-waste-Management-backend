const express = require('express')
const user = require('../models/user.model')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/register',async (req,res)=>{
    // const newPassword = await bcrypt.hash(req.body.password,10)
    const log = await user.create({
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    })
    res.status(201).send({log});
})



router.post('/signin',async (req,res)=>{
    const User = await user.findOne({
        email : req.body.email,
        password : req.body.password,
    })

    if(User){
        const token  = jwt.sign({
         username : User.username,
         email : User.email,
        },
        'secret123')

        return res.json({status:'ok',User : token})
        console.log(token)
    }

})

module.exports = router;

