import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
   return (
      <nav className="Navbar">
         <Link to={"/"}></Link>
         <ul>
            <Link to={"/Products"}></Link>
            <Link to={"/Account"}></Link>
         </ul>
      </nav>
   );
}
