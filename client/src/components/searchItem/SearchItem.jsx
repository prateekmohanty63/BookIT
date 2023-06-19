import "./searchItem.css";
import { Navigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

const SearchItem = ({item,date,noRooms}) => {
  let navigate=useNavigate();
  // console.log("start date",date.startDate)
  // console.log("end date",date.endDate)
  // console.log(noRooms.rooms)

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(date.endDate, date.startDate);
  const numberOfRooms=noRooms.rooms

  const checkAva=()=>{
    navigate(`/hotels/${item._id}` , {state:{days:days,rooms:numberOfRooms,date:date}})
  }
  
  // console.log(days)

  return (
    <div className="searchItem">
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">
         {item.desc}
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
      {item.rating &&  <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton" onClick={checkAva}>See availability</button>
        
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
