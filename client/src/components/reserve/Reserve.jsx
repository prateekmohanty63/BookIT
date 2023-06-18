import React from 'react'
import "./reserve.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faL } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../hooks/useFetch'

const Reserve = ({ setOpen, hotelId }) => {

    const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`)
    console.log(data)
    return (
        <div>
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} onClick={() => setOpen(false)} />

                <span>Select your rooms: </span>
                {data.map(item => (
                    <div className='rItem'>
                        <div className="rTitle">{item.title}</div>
                        <div className="rDesc">{item.desc}</div>
                        <div className="rMax">
                            Max people: <b>{item.maxPeople}</b>
                        </div>
                        <div className="rPrice">{item.price}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Reserve