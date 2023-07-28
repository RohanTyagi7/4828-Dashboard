import './App.css';
import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import { updateRate } from "../constants/constants";

const Diagnostics = () => {
  const [swerveFrontLeftSpeed, setSwerveFrontLeftSpeed] = useState(0);
  const [swerveFrontRightSpeed, setSwerveFrontRightSpeed] = useState(0);
  const [swerveBackLeftSpeed, setSwerveBackLeftSpeed] = useState(0);
  const [swerveBackRightSpeed, setSwerveBackRightSpeed] = useState(0);
  const [swerveFrontLeftDirection, setSwerveFrontLeftDirection] = useState(0);
  const [swerveFrontRightDirection, setSwerveFrontRightDirection] = useState(0);
  const [swerveBackLeftDirection, setSwerveBackLeftDirection] = useState(0);
  const [swerveBackRightDirection, setSwerveBackRightDirection] = useState(0);
  const [swerveFrontLeftTemperature, setSwerveFrontLeftTemperature] = useState(0);
  const [swerveFrontRightTemperature, setSwerveFrontRightTemperature] = useState(0);
  const [swerveBackLeftTemperature, setSwerveBackLeftTemperature] = useState(0);
  const [swerveBackRightTemperature, setSwerveBackRightTemperature] = useState(0);
  const [airTank, setAirTank] = useState(0);
  const [intakePiston, setIntakePiston] = useState(false);
  const [elevatorSliderPiston, setElevatorSliderPiston] = useState(false);
  const [elevatorPivotPiston, setElevatorPivotPiston] = useState(false);
  const [elevatorPosition, setElevatorPosition] = useState(0);
  const [battery, setBattery] = useState(0);
  const [b0, setB0] = useState(false);
  const [b1, setB1] = useState(false);
  const [b2, setB2] = useState(false);
  const [b3, setB3] = useState(false);
  const [b4, setB4] = useState(false);
  const [b5, setB5] = useState(false);
  const [b6, setB6] = useState(false);
  const [b7, setB7] = useState(false);
  const [b8, setB8] = useState(false);
  const [b9, setB9] = useState(false);
  const [a0, setA0] = useState(0);
  const [a1, setA1] = useState(0);
  const [a2, setA2] = useState(0);
  const [a3, setA3] = useState(0);
  const [a4, setA4] = useState(0);
  const [a5, setA5] = useState(0);
  const [a6, setA6] = useState(0);
  const [a7, setA7] = useState(0);

  // useEffect(() => {
  //   fetch('http://localhost:4000/')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("INIT")
  //     })
  // }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
          fetch('http://localhost:4000/data')
            .then((response) => response.json())
            .then((data) => {
              var newData = data[0];
              setSwerveFrontLeftSpeed(newData['swerve']['frontLeft']['speed']);
              setSwerveFrontRightSpeed(newData['swerve']['frontRight']['speed']);
              setSwerveBackLeftSpeed(newData['swerve']['backLeft']['speed']);
              setSwerveBackRightSpeed(newData['swerve']['backRight']['speed']);
              setSwerveFrontLeftDirection(newData['swerve']['frontLeft']['direction']);
              setSwerveFrontRightDirection(newData['swerve']['frontRight']['direction']);
              setSwerveBackLeftDirection(newData['swerve']['backLeft']['direction']);
              setSwerveBackRightDirection(newData['swerve']['backRight']['direction']);
              setSwerveFrontLeftTemperature(newData['swerve']['frontLeft']['temperature']);
              setSwerveFrontRightTemperature(newData['swerve']['frontRight']['temperature']);
              setSwerveBackLeftTemperature(newData['swerve']['backLeft']['temperature']);
              setSwerveBackRightTemperature(newData['swerve']['backRight']['temperature']);
              setAirTank(newData['airTank']);
              setIntakePiston(newData['intakePiston']['state']);
              setElevatorSliderPiston(newData['elevatorSliderPiston']['state']);
              setElevatorPivotPiston(newData['elevatorPivotPiston']['state']);
              setElevatorPosition(newData['elevatorPosition']);
              setBattery(newData['battery']);
              setB0(newData['controller']['button']['b0']);
              setB1(newData['controller']['button']['b1']);
              setB2(newData['controller']['button']['b2']);
              setB3(newData['controller']['button']['b3']);
              setB4(newData['controller']['button']['b4']);
              setB5(newData['controller']['button']['b5']);
              setB6(newData['controller']['button']['b6']);
              setB7(newData['controller']['button']['b7']);
              setB8(newData['controller']['button']['b8']);
              setB9(newData['controller']['button']['b9']);
              setA0(newData['controller']['axis']['a0']);
              setA1(newData['controller']['axis']['a1']);
              setA2(newData['controller']['axis']['a2']);
              setA3(newData['controller']['axis']['a3']);
              setA4(newData['controller']['axis']['a4']);
              setA5(newData['controller']['axis']['a5']);
              setA6(newData['controller']['axis']['a5']);
              setA7(newData['controller']['axis']['a5']);
            })
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="cardHolder">
      <div className="card">
        <h2 className="center">Swerve Movement</h2>
          <div>
          <div className="powerBar" style={{backgroundColor: (swerveFrontLeftSpeed == 0)?("#1c87c9"):("")}}><div className="fillPowerBar" style={{height: (swerveFrontLeftSpeed*10+50) + "%"}}></div></div>
          <div className="swerveAngle"><div className="sweveAngleBar" style={{rotate: (swerveFrontLeftDirection + 90 + "deg")}}></div></div>
        </div>
        <div>
          <div className="swerveAngle"><div className="sweveAngleBar" style={{rotate: (swerveFrontRightDirection + 90 + "deg")}}></div></div>
          <div className="powerBar" style={{backgroundColor: (swerveFrontRightSpeed == 0)?("#1c87c9"):("")}}><div className="fillPowerBar" style={{height: (swerveFrontRightSpeed*10+50) + "%"}}></div></div>
        </div>
        <br></br><br></br><br></br><br></br><br></br>
        <div>
          <div className="powerBar" style={{backgroundColor: (swerveBackLeftSpeed == 0)?("#1c87c9"):("")}}><div className="fillPowerBar" style={{height: (swerveBackLeftSpeed*10+50) + "%"}}></div></div>
          <div className="swerveAngle"><div className="sweveAngleBar" style={{rotate: (swerveBackLeftDirection + 90 + "deg")}}></div></div>
        </div>
        <div>
          <div className="swerveAngle"><div className="sweveAngleBar" style={{rotate: (swerveBackRightDirection + 90 + "deg")}}></div></div>
          <div className="powerBar" style={{backgroundColor: (swerveBackRightSpeed == 0)?("#1c87c9"):("")}}><div className="fillPowerBar" style={{height: (swerveBackRightSpeed*10+50) + "%"}}></div></div>
          
        </div>
      </div>
      <div className="card"style={{borderColor: (swerveFrontLeftTemperature > 80 || swerveFrontRightTemperature > 80 || swerveBackLeftTemperature > 80 || swerveBackRightTemperature > 80)?("red"):("lightgreen")}}>
        <h2 className="center">Drivetrain Temp. (C)</h2>
        <center>
        <table>
          <tr>
            <td style={{border: "1px solid #dddddd", borderRadius: "10px"}}><h2 style={{padding: "15px"}}>{swerveFrontLeftTemperature}</h2></td>
            <td style={{border: "1px solid #dddddd", borderRadius: "10px"}}><h2 style={{padding: "15px"}}>{swerveFrontRightTemperature}</h2></td>
          </tr>
          <tr>
            <td style={{border: "1px solid #dddddd", borderRadius: "10px"}}><h2 style={{padding: "15px"}}>{swerveBackLeftTemperature}</h2></td>
            <td style={{border: "1px solid #dddddd", borderRadius: "10px"}}><h2 style={{padding: "15px"}}>{swerveBackRightTemperature}</h2></td>
          </tr>
        </table>
          </center>
      </div>
      <div className="card" style={{borderColor: (airTank == 0)?("red"):("lightgreen")}}>
        <h2 className="center" style={{marginTop: "25%"}}>Air Tank</h2>
        <center><div className="airBar center" style={{backgroundColor: (airTank == 0)?("red"):("#111111")}}><div className="fillAirBar" style={{width: airTank+ "%", backgroundColor: (airTank < 20)?("red"):("lightgreen")}}></div></div></center>
        <h2 className="center">{airTank}%</h2>
      </div>
      
      <div className="card">
        <h2 className="center">Pistons</h2>
        <hr style={{width: "100px", borderColor: "lightgreen"}}></hr>
        <center>
        <h3 className="center" style={{backgroundColor: (intakePiston)?("lightgreen"):(""), color: (intakePiston)?("#111111"):("#dddddd"), width: "60%", borderRadius: "10px"}}>Intake</h3>
        <h3 className="center" style={{backgroundColor: (elevatorSliderPiston)?("lightgreen"):(""), color: (elevatorSliderPiston)?("#111111"):("#dddddd"), width: "60%", borderRadius: "10px"}}>Elevator Slider</h3>
        <h3 className="center" style={{backgroundColor: (elevatorPivotPiston)?("lightgreen"):(""), color: (elevatorPivotPiston)?("#111111"):("#dddddd"), width: "60%", borderRadius: "10px"}}>Elevator Pivot</h3>
        </center>
      </div>
      <div className="card wideCard">
        <h2 className="center">Button Mapping</h2>
        <center>
        <table style={{width: "fit-content"}}>
          <tbody>
            <tr>
              <td>A0<div className="powerBar" style={{backgroundColor: (a0 < -0.05)?("#1c87c9"):("lightgreen")}}><div className="fillPowerBar" id="axis0" style={{height: ((-a0*50) + 50) + "%"}}></div></div></td>
              <td>A1<div className="powerBar" style={{backgroundColor: (a1 < -0.05)?("#1c87c9"):("lightgreen")}}><div className="fillPowerBar" id="axis1" style={{height: ((-a1*50) + 50) + "%"}}></div></div></td>
              <td>A2<div className="powerBar" style={{backgroundColor: (a2 < -0.05)?("#1c87c9"):("lightgreen")}}><div className="fillPowerBar" id="axis2" style={{height: ((-a2*50) + 50) + "%"}}></div></div></td>
              <td>A3<div className="powerBar" style={{backgroundColor: (a3 < -0.05)?("#1c87c9"):("lightgreen")}}><div className="fillPowerBar" id="axis3" style={{height: ((-a3*50) + 50) + "%"}}></div></div></td>
              <td>A4<div className="powerBar" style={{backgroundColor: (a4 < -0.05)?("#1c87c9"):("lightgreen")}}><div className="fillPowerBar" id="axis4" style={{height: ((-a4*50) + 50) + "%"}}></div></div></td>
              <td>A5<div className="powerBar" style={{backgroundColor: (a5 < -0.05)?("#1c87c9"):("lightgreen")}}><div className="fillPowerBar" id="axis5" style={{height: ((-a5*50) + 50) + "%"}}></div></div></td>
              <td>A6<div className="powerBar" style={{backgroundColor: (a6 < -0.05)?("#1c87c9"):("lightgreen")}}><div className="fillPowerBar" id="axis5" style={{height: ((-a6*50) + 50) + "%"}}></div></div></td>
              <td>A7<div className="powerBar" style={{backgroundColor: (a7 < -0.05)?("#1c87c9"):("lightgreen")}}><div className="fillPowerBar" id="axis5" style={{height: ((-a7*50) + 50) + "%"}}></div></div></td>
            </tr>
            <tr>
              <td><h5 className="buttonMap center" style={{backgroundColor: (b0)?("lightgreen"):(""), color: (b0)?("#111111"):("#dddddd")}}>B0</h5></td>
              <td><h5 className="buttonMap center" style={{backgroundColor: (b1)?("lightgreen"):(""), color: (b1)?("#111111"):("#dddddd")}}>B1</h5></td>
              <td><h5 className="buttonMap center" style={{backgroundColor: (b2)?("lightgreen"):(""), color: (b2)?("#111111"):("#dddddd")}}>B2</h5></td>
              <td><h5 className="buttonMap center" style={{backgroundColor: (b3)?("lightgreen"):(""), color: (b3)?("#111111"):("#dddddd")}}>B3</h5></td>
              <td><h5 className="buttonMap center" style={{backgroundColor: (b4)?("lightgreen"):(""), color: (b4)?("#111111"):("#dddddd")}}>B4</h5></td>
              <td><h5 className="buttonMap center" style={{backgroundColor: (b5)?("lightgreen"):(""), color: (b5)?("#111111"):("#dddddd")}}>B5</h5></td>
              <td><h5 className="buttonMap center" style={{backgroundColor: (b6)?("lightgreen"):(""), color: (b6)?("#111111"):("#dddddd")}}>B6</h5></td>
              <td><h5 className="buttonMap center" style={{backgroundColor: (b7)?("lightgreen"):(""), color: (b7)?("#111111"):("#dddddd")}}>B7</h5></td>
            </tr>
            <tr>
              <td><h5 className="buttonMap center" style={{backgroundColor: (b8)?("lightgreen"):(""), color: (b8)?("#111111"):("#dddddd")}}>B8</h5></td>
              <td><h5 className="buttonMap center" style={{backgroundColor: (b9)?("lightgreen"):(""), color: (b9)?("#111111"):("#dddddd")}}>B9</h5></td>
            </tr>
          </tbody>
        </table>
        </center>
      </div>
      <div className="card" style={{height: "15vh"}}>
        <h2 className="center">Elevator Extension</h2>
        <h1 className="center">{elevatorPosition}</h1>
      </div>
      <div className="card" style={{borderColor: (battery < 9)?("red"):("lightgreen"), height: "15vh"}}>
        <h2 className="center">Battery Voltage</h2>
        <h1 className="center">{battery} V</h1>
      </div>
    </div>
  );
};

export default Diagnostics;