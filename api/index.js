import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from "cors"

import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"




const app =express()


dotenv.config()

const connect=async()=>{

try{
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB")
}
catch(error){
   
    throw error
}

}

// cors (needed only if not using proxy in frontend to fetch data || we are using proxy in frontend )
app.use(cors())     

// middlewares
app.use(cookieParser())


// important to send json data
app.use(express.json())

app.use("/api/auth",authRoute)
app.use("/api/users",usersRoute)
app.use("/api/rooms",roomsRoute)
app.use("/api/hotels",hotelsRoute)


// error handling middleware
app.use((err,req,res,next)=>{
    const errorStatus=err.status || 500 
    const errorMessage=err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})




// checking if mongodb is connected
mongoose.connection.on("discconncted",()=>{
    console.log('mongodb disconnected')

})

// checking if the connection is on
mongoose.connection.on("connected",()=>{
    console.log("MongoDB connected")
})

app.listen(8800,()=>{
    connect()
    console.log("Connected to backend.")
})