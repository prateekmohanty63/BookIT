import express from "express"
import Hotel from "../models/Hotel.js"
import { createHotel,updateHotel,deleteHotel,getAllHotel,getHotelById} from "../controllers/hotel.js"

const router=express.Router()

// CREATE
router.post("/",createHotel)

// UPDATE 
router.put("/:id",updateHotel)

// GET BY ID 
router.get("/:id",getHotelById)

// GET ALL HOTELS 
router.get("/",getAllHotel)

// DELETE HOTEL BY ID
router.delete("/:id",deleteHotel)

export default router