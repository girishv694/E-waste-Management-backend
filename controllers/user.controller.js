const express = require('express')
const logins = require('../models/user.model')
const router = express.Router();


router.post('/signin',async (req,res)=>{
    const log = await logins.create(req.body)
    res.status(201).send({log});
})

module.exports = router;

