import { useContext } from "react"
import "./navbar.css"
import {Navigate} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

const Navbar = () => {
   
  const {user}=useContext(AuthContext)
  //console.log(user.username)

  return (
    <div className="navbar">
      <div className="navContainer">
        {/* <Navigate to="/" style={{color:"inherit",textDecoration:"none"}}>
        <span className="logo">lamabooking</span>
        </Navigate> */}
        <span className="logo">lamabooking</span>
        {user ? user.username : (
          <div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton">Login</button>
        </div>
        )}

      </div>
    </div>
  )
}

export default Navbar