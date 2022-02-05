import React from "react";
import "./Navbar.css";
import { HiOutlineMenuAlt4 } from "react-icons/hi";

const Navabar = ({ setDrawer, drawer }) => {
  return (
    <div className="navbar-container">
      <div className="navbar">
        <div onClick={() => setDrawer(!drawer)}>
          <div className="menu">
            <p>Menu </p>
            <HiOutlineMenuAlt4 size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navabar;
