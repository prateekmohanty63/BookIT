import { response } from "express"
import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"


export const createHotel=async(req,res,next)=>{
    const newHotel=new Hotel(req.body)
    try{
      const savedHotel=await newHotel.save()
      res.status(200).json(savedHotel)
    }
    catch(err){
       next(err)
    }
}

export const updateHotel=async(req,res,next)=>{
    try{
        const updatedHotel=await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedHotel)
  
      }
      catch(err){
       next(err)
      }
}

export const deleteHotel=async(req,res,next)=>{
    try{
       const deletedHotel=await Hotel.findByIdAndDelete(req.params.id)
       res.status(204).json(deletedHotel)
    }
    catch(err){
        next(err)
    }
}

// get all hotels
export const getAllHotel=async(req,res,next)=>{
    try{
     const allHotels=await Hotel.find()
     res.status(200).json(allHotels)
    }
    catch(err){
        next(err)
    }
}

export const getHotels = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    try {
      const hotels = await Hotel.find({
        ...others,
        cheapestPrice: { $gt: min | 1, $lt: max || 999 },
      }).limit(req.query.limit);
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  };


// // get featured hotels

// export const getFeaturedHotel=async(req,res,next)=>{
//     const {min,max,...other}=req.query
//     try{
//         const featuredHotels=await Hotel.find({...other,chepeastPrice:{$gt:min || 1,$lt:max || 9999}}).limit(req.query.limit)
//         res.status(200).json(featuredHotels)
//     }
//     catch(err){
//        next(err)
//     }

// }

// export const getHotelByCity=async(req,res,next)=>{
//     const {min,max,...others}=req.query;

//     try{
//         const hotels=await Hotel.find({
//             ...others,
//             chepeastPrice:{$gtt:min | 1,$lt:max || 999},
//         })
//         res.status(200).json(hotels)
//     }
//     catch(err){
//         next(err)
//     }
// }

export const getHotelById=async(req,res,next)=>{
    try{
       const hotel=await Hotel.findById(req.params.id)
       res.status(200).json(hotel)
    }
    catch(err){
      next(err)
    }
}

// get count by cities
export const countByCity=async (req,res,next)=>{
    const cities=req.query.cities.split(",")

    try{
       const list=await Promise.all(cities.map(city=>{
         return Hotel.countDocuments({city:city})
       }))
       res.status(200).json(list)
    }
    catch(err){
        next(err)
    }
}

// get count by type

export const countByType=async(req,res,next)=>{
    
    try{
        const hotelCount=await Hotel.countDocuments({type:"hotel"})
        const apartmentCount=await Hotel.countDocuments({type:"apartment"})
        const resortCount=await Hotel.countDocuments({type:"resort"})
        const villaCount=await Hotel.countDocuments({type:"villa"})
        const cabinCount=await Hotel.countDocuments({type:"cabin"})

        res.status(200).json([
            {type:"hotel",count:hotelCount},
            {type:"apartments",count:apartmentCount},
            {type:"resorts",count:resortCount},
            {type:"villas",count:villaCount},
            {type:"cabins",count:cabinCount}
        ])

    }
    catch(err){
        next(err)
    }
}

// get hotel rooms

export const getHotelRooms=async(req,res,next)=>{
  try{
     const hotel=await Hotel.findById(req.params.id)

     const list=await Promise.all(hotel.rooms.map(room=>{
      return Room.findById(room)
     }))
     res.status(200).json(list)
  }
  catch(err){
    next(err)
  }
}