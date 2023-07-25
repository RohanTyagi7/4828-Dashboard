import './App.css';
import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link } from "react-router-dom";
const Diagnostics = () => {
  return (
    <div className="cardHolder">
      <div className="card">
        <h2 className="center">Swerve Movement</h2>
          <div>
          <div className="powerBar"><div className="fillPowerBar"></div></div>
          <div className="swerveAngle"><div className="sweveAngleBar"></div></div>
        </div>
        <div>
          <div className="swerveAngle"><div className="sweveAngleBar"></div></div>
          <div className="powerBar"><div className="fillPowerBar"></div></div>
        </div>
        <div>
          <div className="powerBar"><div className="fillPowerBar"></div></div>
          <div className="swerveAngle"><div className="sweveAngleBar"></div></div>
        </div>
        <div>
          <div className="swerveAngle"><div className="sweveAngleBar"></div></div>
          <div className="powerBar"><div className="fillPowerBar"></div></div>
        </div>
      </div>
      <div className="card wideCard">
        <h2 className="center">Button Mapping</h2>
        
      </div>
      <div className="card wideCard">
        <h2 className="center">Elevator Position</h2>
        
      </div>
    </div>
  );
};

export default Diagnostics;