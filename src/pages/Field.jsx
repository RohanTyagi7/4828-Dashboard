import './App.css';
import arena from './images/arena.png';
import robot from './images/robot.png';
import React, { useState, useEffect, useRef } from "react";
const Field = () => {
  const elRef = useRef();
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [totalX, setTotalX] = useState(0);
  const [totalY, setTotalY] = useState(0);
  function findSize(el, size) {
    
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      setX(((Math.random()*2-1)*100))
      setY(((Math.random()*2-1)*100))
      var div = document.getElementById("arena");
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!elRef?.current?.clientHeight) {
      return;
    }
    setTotalX(elRef?.current?.clientHeight);
  }, [elRef?.current?.clientHeight]);
  useEffect(() => {
    if (!elRef?.current?.clientWidth) {
      return;
    }
    setTotalY(elRef?.current?.clientWidth);
  }, [elRef?.current?.clientWidth]);

  return (
    <div className="cardHolder">
    <div className="card extraWideCard" id="card1">
    <div class="arena">
      <img src={arena} alt="Snow" style={{width: "100%", border: "1px solid #bbbbbb"}} id="arena" ref={elRef} />
      <div class="zeroField"><img src={robot} style={{marginLeft: (y*0.01*totalY) + "px" , marginTop: (x*0.01*totalX) + "px"}}/></div>
    </div>
    </div>
    </div>
  );
};

export default Field;