import React, { useContext, useState } from 'react'
import "./reserve.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faL } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Reserve = ({ setOpen, hotelId,date}) => {

    const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`)
    // console.log(data)
    const [selectedRooms,setSelectedRooms]=useState([])

    const navigate=useNavigate()

    const startDate=date.startDate
    const endDate=date.endDate

    // const {dates}=useContext(SearchContext)
    // console.log(dates)

    const handleSelect=(e)=>{
        const checked=e.target.checked
        const value=e.target.value 
        setSelectedRooms(checked ? [...selectedRooms,value]: selectedRooms.filter(item=>item!==value))
    }

    // console.log(selectedRooms)

    const getDatesInRange=(startDate,endDate)=>{
        const start=new Date(startDate)
        const end=new Date(endDate)
        const date=new Date(start.getTime())

        let list=[]

        while(date<=end)
        {
            list.push(new Date(date).getTime())
            date.setDate(date.getDate()+1)
        }
        return list
    }

    console.log(getDatesInRange(startDate,endDate));

    const allDates=getDatesInRange(startDate,endDate)

    // checking if the room is available

    const isAvailable=(roomNumber)=>{
        const isFound=roomNumber.unavailableDates.some((date)=>
            allDates.includes(new Date(date).getTime()))

            return !isFound   // false if not available
    }  

    const handleClick=async()=>{
        try{
      await Promise.all(selectedRooms.map(roomId=>{
        const res=axios.put(`/rooms/availability/${roomId}`,{dates:allDates})
        return res.data
      }))
        }
        catch(err){

        }
        setOpen(false)
        navigate("/")
    }
    return (
        <div className="reserve">
          <div className="rContainer">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="rClose"
              onClick={() => setOpen(false)}
            />
            <span>Select your rooms:</span>
            {data.map((item) => (
              <div className="rItem" key={item._id}>
                <div className="rItemInfo">
                  <div className="rTitle">{item.title}</div>
                  <div className="rDesc">{item.desc}</div>
                  <div className="rMax">
                    Max people: <b>{item.maxPeople}</b>
                  </div>
                  <div className="rPrice">{item.price}</div>
                </div>
                <div className="rSelectRooms">
                  {item.roomNumbers.map((roomNumber) => (
                    <div className="room">
                      <label>{roomNumber.number}</label>
                      <input
                        type="checkbox"
                        value={roomNumber._id}
                        onChange={handleSelect}
                        //  disabled={!isAvailable(roomNumber)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={handleClick} className="rButton">
              Reserve Now!
            </button>
          </div>
        </div>
      );
    };
    
    export default Reserve;