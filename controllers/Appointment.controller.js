const mongoose= require('mongoose')
const express =require('express')
const router= express.Router()
const appointment=require('../models/Appointment.model')

router.get("",async(req,res)=>{

    let r=await appointment.find()

   return res.send(r)


})

router.post("",async(req,res)=>{

    let r=await appointment.create(req.body)

  return  res.send(r)


})


module.exports=router