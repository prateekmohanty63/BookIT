import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js"
import jwt from "jsonwebtoken"

export const register=async(req,res,next)=>{
    try{
        const salt=bcrypt.genSaltSync(10)
        const hash=bcrypt.hashSync(req.body.password,salt)

        // this way it can be also done
    //    const newUser=new User({
    //       username:req.body.username,
    //       email:req.body.email,
    //       password: hash,
    //       country:req.body.country,
    //       city:req.body.city,
    //       phone:req.body.phone
    //    })
     
    // here we are taking all the fields 
    // only changing the password to the hashed version
    const newUser=new User({
        ...req.body,
        password: hash
    })
       await newUser.save()
       res.status(201).send("User has been created")
    }
    catch(err){
      next(err)
    }
}

export const login=async(req,res,next)=>{
    try{
       const user=await User.findOne({username:req.body.username})
       if(!user)return next(createError(404,"user not found"))

       const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password)
       if(!isPasswordCorrect)return next(createError(400,"wrong password or username!"))

       const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)   // process.env.JWT is the secret key
       
       const {password,isAdmin,...otherDetails}=user._doc  // sending everything apart from password and isAdmin

       // storing the jwt token in the response as a cookie
       res.cookie("access_token",token,{
        httpOnly: true
       }).status(200).send({details:{...otherDetails},isAdmin})

    }
    catch(err){
        next(err)
    }
}