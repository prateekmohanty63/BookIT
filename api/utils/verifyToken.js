import jwt from "jsonwebtoken"
import { createError } from "./error.js"

// general verificatio to check if user has logged in
export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        return next(createError(401,"You are not authenticated!"))
    }

    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err){
            return next(createError(403,"Token is not valid!!"))
        }
        // setting the req.user variable to user
        req.user=user;
        next()
    })
}

export const verifyUser=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
       if(req.user.id===req.params.id || req.user.isAdmin){
           next()
       }else{
       
            return next(createError(403,"You are not authorized"))
        
       }
    })
}

export const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        console.log(req.user)
        if(req.user.isAdmin){
            next()
        }
        else{
            return next(createError(403,"You are not authorized"))
        }
    })
}
