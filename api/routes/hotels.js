import express from "express"
import Hotel from "../models/Hotel.js"
import { createError } from "../utils/error.js"

const router=express.Router()

// CREATE
router.post("/",async(req,res)=>{
    const newHotel=new Hotel(req.body)
   try{
     const savedHotel=await newHotel.save()
     res.status(200).json(savedHotel)
   }
   catch(err){
      res.status(500).json(err)
   }
})

// UPDATE 
router.put("/:id",async(req,res)=>{
    try{
      const updatedHotel=await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
      res.status(200).json(updatedHotel)

    }
    catch(err){
     res.status(500).json(err)
    }
})

// GET BY ID 
router.get("/:id",async(req,res)=>{
    try{
        const hotel=await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    }
    catch(err){
       res.status(500).json(err)
    }
})

// GET ALL HOTELS 
router.get("/",async(req,res,next)=>{
    
    const failed=true;

    if(failed)return next(createError(401,"you are not authenticated"))

    try{
      const hotels=await Hotel.findById("djadjdjoa")
      res.status(200).json(hotels)
    }
    catch(err){
    next(err)
    }
})

// DELETE HOTEL BY ID
router.delete("/:id",async(req,res)=>{
    try{
        const delHotel=await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json(delHotel)
    }
    catch(err){
    res.status(500).json(err)
    }
})

export default router