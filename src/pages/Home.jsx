import './App.css';
import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import ps4 from './images/ps4.png';
import xbox from './images/xbox.png';
import cone from './images/cone.png';
import cube from './images/cube.png';
import none from './images/none.png';
import { updateRate } from '../constants/constants';
import JSON from 'json5';
// import Data from './data.jsx';
const Home = () => {
  const [fieldOriented, setFieldOriented] = useState(false);
  const [navx, setNavx] = useState(0);
  const [joystick, setJoystick] = useState("xbox");
  const [autoTurn, setAutoTurn] = useState("off");
  const [slowMode, setSlowMode] = useState(false);
  const [profile, setProfile] = useState("workshop"); //add push
  const [auton, setAuton] = useState("None"); //add push
  const [controlsConnected, setControlsConnected] = useState(false);
  const [led, setLed] = useState("off");
  const [timeLeft, setTimeLeft] = useState(130);

  useEffect(() => {
    fetch('http://localhost:4000/')
      .then((response) => response.json())
      .then((data) => {
        console.log("INIT")
      })
  }, []);
  useEffect(() => {
    fetch('http://localhost:4000/data')
      .then((response) => response.json())
      .then((data) => {
        try{
          var newData = data[0];
          setProfile(newData['profile']);
          setAuton(newData['auton']);
          setLed(newData['led']);
          document.getElementById('autonOpt').value = newData['auton'];
          document.getElementById('profileOpt').value = newData['profile'].toLowerCase();
          console.log("intend " + newData['profile'].toLowerCase());
          console.log("outcome " + document.getElementById('profileOpt').value);
        }
        catch{
          console.log("Introduction error. Code 1")
        }
      })
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
          fetch('http://localhost:4000/data')
            .then((response) => response.json())
            .then((data) => {
              try{
                var newData = data[0];
                setFieldOriented(newData['fieldOriented']);
                setNavx(newData['navx']);
                setAutoTurn(newData['autoTurn']);
                setSlowMode(newData['slowMode']);
                setJoystick(newData['joystick'])
                setControlsConnected(newData['controlsConnected']);
                setTimeLeft(newData['timeLeft']);
              }
              catch{
                console.log("introduction error. Code 1")
              }
            })
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  // useEffect(() => {
  //   const updateData = () => {
  //     fetch('http://localhost:4000/data')
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setFieldOriented(data['fieldOriented']);
  //         setNavx(data['navx']);
  //         setAutoTurn(data['autoTurn']);
  //         setSlowMode(data['slowMode']);
  //         setProfile(data['profile']);
  //         setAuton(data['auton']);
  //         setControlsConnected(data['controlsConnected']);
  //         setLed(data['led']);
  //         setTimeLeft(data['timeLeft']);
  //       })
  //   };
  //   const intervalId = setInterval(updateData, updateRate);
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);
  return (
    <div className="cardHolder">
      <div className="bigCard card">
        <div style={{ float: "left" }}>
          <div className="navxChart"><div className="navxBar" style={{ rotate: (navx + 90 + "deg") }}></div><div className="navxPredictionBar" style={{ display: (autoTurn.toLowerCase() == "off") ? ("none") : ("block"), rotate: (autoTurn.toLowerCase() == "load") ? ("90deg") : ("-90deg") }}></div></div>
          <h2 style={{ marginLeft: "4vw", width: "3pc", textAlign: "center" }}>{navx}</h2>
        </div>
        <div className="genCard">
          <h2 className="center" style={{ color: (autoTurn.toLowerCase() == "off") ? ("#dddddd") : ("#1c87c9") }}>AutoTurn: {autoTurn.substring(0, 1).toUpperCase() + autoTurn.substring(1)}</h2>
        </div>
        {/*<button onClick={(e)=>{setNavx(navx+5);}}>add</button>
        <button onClick={(e)=>{setAutoTurn("load");}}>load</button>
        <button onClick={(e)=>{setAutoTurn("score");}}>score</button>
        <button onClick={(e)=>{setAutoTurn("off");}}>off</button>*/}
      </div>
      <div className="card tallCard" style={{ borderColor: (slowMode == true) ? ("#1c87c9") : ("lightgreen") }}>
        <h2 className="center">Slow Mode</h2>
        {(slowMode) ? (<h3 className="center">Active</h3>) : (<h3 className="center">X</h3>)}
      </div>
      <div className="card tallCard" style={{ borderColor: (fieldOriented) ? ("lightgreen") : ("red") }}>
        {(!fieldOriented) ? (<div className="error"></div>) : (<div></div>)}
        <h2 className="center">Field Oriented</h2>
        {(fieldOriented) ? (<h3 className="center">Active</h3>) : (<h3 className="center">X</h3>)}
      </div>
      <div className="card">
        <h2 className="center">{profile.substring(0, 1).toUpperCase() + profile.substring(1)} Profile</h2>
        <div className="center">
          <select className="opt" id="profileOpt" style={{ borderBottomColor: (profile == "workshop") ? ("#1c87c9") : ("lightgreen") }} onChange={(e) => { setProfile(document.getElementById('profileOpt').value); fetch('http://localhost:4000/profile/' + document.getElementById('profileOpt').value) }}>
            <option value="workshop">Workshop</option>
            <option value="competition">Competition</option>
          </select>
        </div>
      </div>
      <div className="card" style={{ borderColor: (auton.toLowerCase() != "none") ? ("lightgreen") : ("red") }}>
        {(auton.toLowerCase() == "none") ? (<div className="error"></div>) : (<div></div>)}
        <h2 className="center">Autonomous</h2>
        <div className="center">
          <select className="opt" id="autonOpt" onChange={(e) => { setAuton(document.getElementById('autonOpt').value); fetch('http://localhost:4000/auton/' + document.getElementById('autonOpt').value)  }} style={{ borderColor: (auton.toLowerCase() != "none") ? ("lightgreen") : ("red") }}>
            <option value="None">None</option>
            <option value="Cube High Taxi">Cube High + Taxi</option>
            <option value="High Taxi">Cone High + Taxi</option>
            <option value="High Place">Cone High</option>
            <option value="Mid Taxi">Mid + Taxi</option>
            <option value="Mid Place">Mid Place</option>
            <option value="taxi">Taxi</option>
          </select>
        </div>
      </div>
      <div className="card wideCard" style={{ borderColor: (controlsConnected) ? ("lightgreen") : ("red") }}>
        {(!controlsConnected) ? (<div className="error"></div>) : (<div></div>)}
        <img alt="" src={(joystick == "xbox") ? (xbox) : (ps4)} style={{ cursor: "pointer", height: "100px", width: "100px", objectFit: "contain", float: "left" }} onClick={(e) => { if (joystick == "xbox") { setJoystick("ps4") } else { setJoystick("xbox") }}} />
        <h2 className="center verticalCenter" style={{ color: (controlsConnected) ? ("#dddddd") : ("red"), marginTop: "30px" }}>{(controlsConnected) ? ("Connected") : ("NOT CONNECTED")}</h2>
      </div>
      <div className="card wideCard">
        <h2 className="center">Time Left:</h2>
        <h1 className="center" style={{ fontSize: "40px" }}>{timeLeft}</h1>
      </div>
      <div className="card wideCard" style={{ borderColor: (led.toLowerCase() != "off") ? (led) : ("lightgreen") }}>
        <h2 className="center">LED</h2>
        <img alt="" src={cone} style={{ height: "100px", marginLeft: "5%" }} onClick={(e) => { setLed("yellow"); fetch('http://localhost:4000/led/yellow')  }} />
        <img alt="" src={none} style={{ height: "100px", marginLeft: "22%" }} onClick={(e) => { setLed("off"); fetch('http://localhost:4000/led/off')  }} />
        <img alt="" src={cube} style={{ height: "100px", marginLeft: "18%" }} onClick={(e) => { setLed("purple"); fetch('http://localhost:4000/led/purple')  }} />
      </div>
        <div className="blink" style={{marginTop: "-10px", height: "20px", width: "100vw", backgroundColor: (led.toLowerCase() != "off")?(led):(""), marginLeft: "-7px"}}></div>
    </div>
  );
};

export default Home;