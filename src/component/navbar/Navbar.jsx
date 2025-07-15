import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <>
      <div className="nav-container">
        <div>
          <Link to="/">
            <button className="btn">Beranda</button>
          </Link>
        </div>
        <div>
          <Link to="/mini-game">
            <button className="btn">Mini Game</button>
          </Link>
        </div>
        <div>
          <Link to="/quotes">
            <button className="btn">Kartu Ucapan</button>
          </Link>
        </div>
        <div>
          <Link to="/message">
            <button className="btn">Pesan</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
