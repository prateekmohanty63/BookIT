import express from "express"
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router =express.Router();

router.get('/',getRooms)
router.get("/:id",getRoom)

router.post("/:hotelid",verifyAdmin,createRoom)
router.put("/:id",verifyAdmin,updateRoom)
router.delete("/:id/:hotelid",verifyAdmin,deleteRoom)
export default router