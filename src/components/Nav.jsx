import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
   return (
      <nav className="Navbar">
         <Link to={"/"}>
            <img src={"./assets/AirLogoSmall.png"} className={"home-btn"} />
         </Link>
         <ul className={"link-container"}>
            <Link to={"/"} className="link-item">
               Home
            </Link>
            <Link to={"/Products"} className="link-item">
               Products
            </Link>
            <Link to={"/Account"} className="link-item">
               Account
            </Link>
         </ul>
      </nav>
   );
}
