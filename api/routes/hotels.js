import express from "express"
import Hotel from "../models/Hotel.js"
import { createHotel,updateHotel,deleteHotel,getAllHotel,getHotelById} from "../controllers/hotel.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const router=express.Router()

// CREATE
router.post("/",verifyAdmin,createHotel)

// UPDATE 
router.put("/:id",verifyAdmin,updateHotel)

// GET BY ID 
router.get("/:id",getHotelById)

// GET ALL HOTELS 
router.get("/",getAllHotel)

// DELETE HOTEL BY ID
router.delete("/:id",verifyAdmin,deleteHotel)

export default router