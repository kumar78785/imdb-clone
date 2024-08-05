import React from "react";
import Logo from "../MovieLogo.png";

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex border space-x-8 items-center pl-3 py-4">
      <img className="w-[40px]" src={Logo} alt="" />

      <Link to="/" className="text-blue-400 text-3xl font-bold">
        Movies
      </Link>
      <Link to="/watchlist" className="text-blue-400 text-3xl font-bold">
        WatchList
      </Link>
    </div>
  );
}

export default Navbar;
