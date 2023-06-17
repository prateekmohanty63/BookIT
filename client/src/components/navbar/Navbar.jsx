import "./navbar.css"
import {Navigate} from "react-router-dom"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        {/* <Navigate to="/" style={{color:"inherit",textDecoration:"none"}}>
        <span className="logo">lamabooking</span>
        </Navigate> */}
        <span className="logo">lamabooking</span>
        <div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton">Login</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar