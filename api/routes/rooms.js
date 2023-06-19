import express from "express"
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom,updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router =express.Router();

router.get('/',getRooms)
router.get("/:id",getRoom)

router.post("/:hotelid",verifyAdmin,createRoom)
router.put("/availability/:id",updateRoomAvailability)

router.delete("/:id/:hotelid",verifyAdmin,deleteRoom)
export default router