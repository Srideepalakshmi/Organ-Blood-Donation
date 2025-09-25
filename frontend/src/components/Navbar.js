import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link"; // ✅ new import

function Navbar() {
  return (
    <nav className="navbar">
      <h2></h2>
      <ul>
        {/* These scroll within Home page even if you’re on /login */}
        <li><HashLink smooth to="/#home">Home</HashLink></li>
        <li><HashLink smooth to="/#about">About Us</HashLink></li>
        <li><HashLink smooth to="/#contact">Contact</HashLink></li>

        {/* These go to other routes */}
        <li><Link to="/login">Login/Logout</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
