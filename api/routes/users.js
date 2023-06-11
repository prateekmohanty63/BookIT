import express from "express"
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router=express.Router();

// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("Hello user, you are logged in")
// })

// router.get("/checkuser/:id",verifyToken,(req,res,next)=>{
//     res.send("hello user , you are logged in and you can delet your account")
// })

// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("Hello admin , you are logged in and you can delete all accounts")
// })

router.get("/",verifyAdmin,getUsers)
router.get("/:id",verifyUser,getUser)
router.put("/:id",verifyUser,updateUser)
router.delete("/:id",verifyUser,deleteUser)

export default router