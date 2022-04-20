import React from 'react';
import Logo from "../logo.jpeg";
import {Link} from 'react-router-dom';

function Navbar() {
  return (
    <>
      <div className = "border pl-2 flex space-x-8 px-8 items-center py-4">
        <img className = "w-14 md:w-20 h-19 md:h-26 ml-8" src={Logo}></img>
        <Link to="/" className="text-blue-400 font-bold text-xl md:text-3xl">Movies</Link>
        <Link to="/favourites" className="text-blue-400 font-bold text-xl md:text-3xl">Favourites</Link>
      </div>
    </>
  )
}

export default Navbar;
