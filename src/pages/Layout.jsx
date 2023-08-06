import { Outlet, Link } from "react-router-dom";
import React, { useState } from "react";
import './App.css';
import home from './images/home.png';
import stats from './images/stats.png';
import field from './images/field.png';
const Layout = () => {
  return (
    <>
      <nav>
        <div className="nav ">
          <div>
            <Link to="/"><img src={home} className="navItem"/></Link>
            <Link to="/diagnostics"><img src={stats} className="navItem"/></Link>
            <Link to="/field"><img src={field} className="navItem"/></Link>
          </div>
        </div>
      </nav>
      <div className="lastUpdate">Last Updated 08.04.2023</div>
      <Outlet />
    </>
  )
};

export default Layout;
