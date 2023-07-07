import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import HamburgerIcon from '../common/HamburgerIcon';

function Header() {
  return (
    <header className="Header bg-midnight-blue flex items-center h-auto md:h-[84px] pt-[40px] pb-[15px] px-[15px] md:p-0">
      <div className="flex items-center w-[90vw] xl:w-[1200px] mx-auto justify-between xl:px-[80px]">
        <h1 className="logo">
          <NavLink to="/">LOGO</NavLink>
        </h1>
        <nav className="[display:none] md:flex w-[471px] justify-between">
          <ul className="flex items-center w-[227px] justify-between">
            <li>
              <NavLink className="navlink">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/about" className="navlink">
                About us
              </NavLink>
            </li>
            <li>
              <NavLink to="/reviews" className="navlink">
                Reviews
              </NavLink>
            </li>
          </ul>
          <ul className="flex">
            <li>
              <button className="btn border-none">Sign up</button>
            </li>
            <li>
              <button className="btn btn-hover">Log in</button>
            </li>
          </ul>
        </nav>
        <NavLink className="[display:unset] md:[display:none]" to="#">
          <HamburgerIcon />
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
