import express from "express"
import Hotel from "../models/Hotel.js"
import { createHotel,updateHotel,deleteHotel,getHotels,getHotelById, countByCity, countByType,getHotelRooms} from "../controllers/hotel.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const router=express.Router()

// CREATE
router.post("/",verifyAdmin,createHotel)

// UPDATE 
router.put("/:id",verifyAdmin,updateHotel)

// GET BY ID 
router.get("/find/:id",getHotelById)

// GET ALL HOTELS 
router.get("/",getHotels)



// // GET FEATURED HOTELS
// router.get("/feat/featured/true",getFeaturedHotel)



// DELETE HOTEL BY ID
router.delete("/:id",verifyAdmin,deleteHotel)

router.get("/countByCity",countByCity);
router.get("/countByType",countByType)
router.get("/room/:id",getHotelRooms)
export default router