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
  const [xd, setXd] = useState(0);
  const [yd, setYd] = useState(0);
  const [matchJson, setMatchJson] = useState([{}]);
  const [replayMatch, setReplayMatch] = useState(false);
  const [view, setView] = useState(0);
  useEffect(() => {
    if(localStorage.getItem('matches') != null){setMatchJson(JSON.parse(localStorage.getItem('matches')))}
    else{setMatchJson([{}])}
  }, []);
  useEffect(() => {
    
    const intervalId = setInterval(() => {
      if(!replayMatch){
      setX(((Math.random()*2)*100))
      setY(((Math.random()*2)*100))
      var div = document.getElementById("arena");
      }
    }, 20);
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
  useEffect(() => {
    if(replayMatch){
      var c = 0;
      var valueNum = -1;
      console.log(view)
      var value = matchJson[view]['values']
        const intervalId = setInterval(() => {
          //c=140
          var countoff = document.getElementById('countoff')
          var robot = document.getElementById('robot2')
          var card = document.getElementById('card1')
          if(c == 0){
            countoff.innerHTML = "3"
            card.style.borderColor = "maroon"
          }
          else if(c == 50){
            countoff.innerHTML = "2"
            card.style.borderColor = "yellow"
          }
          else if(c == 100){
            countoff.innerHTML = "1"
            card.style.borderColor = "lightblue"
          }
          else if(c == 140){
            countoff.style.color = "lightgreen"
            card.style.borderColor = "lightgreen"
            countoff.innerHTML = "GO"
          }
          else if(c == 150){
            countoff.style.display = "none"
            countoff.style.color = "white"
            robot.style.display = "inline"
          }
          else if(c > 150){
            valueNum++;
            if(valueNum >= value.length){
              setXd(value[value.length-1]['x']*2)
              setYd(value[value.length-1]['y']*2)
            }
            else{
              setXd(value[valueNum]['x']*2)
              setYd(value[valueNum]['y']*2)
            }
          }
          c++;
        }, 20);
        return () => clearInterval(intervalId);
      
    }
  },[replayMatch, view])
  var count = 0;
  return (
    <div className="cardHolder">
    <div className="card extraWideCard" id="card1">
    <div class="arena">
      <img src={arena} alt="Snow" style={{width: "100%", border: "1px solid #bbbbbb"}} id="arena" ref={elRef} />
      <div className={("zeroField")}><img src={robot} style={{marginLeft: (y*0.01*totalY) + "px" , marginTop: (x*0.01*totalX) + "px", display: (replayMatch)?("none"):("inline")}}/><img src={robot} style={{marginLeft: (yd*0.01*totalY) + "px" , marginTop: (xd*0.01*totalX) + "px", display: (!replayMatch)?("none"):("inline")}} id="robot2" /></div>
    </div>
    <div className="" style={{marginTop: "15px"}}>
          <select className="opt" id="fieldOpt" onChange={(e) => {if(document.getElementById('fieldOpt').value != "currentlyplaying"){setReplayMatch(true); setView(parseInt(document.getElementById('fieldOpt').value)-1)} else{setReplayMatch(false)}}}>
          <option value="currentlyplaying">Currently Playing</option>
          {(matchJson.map((values) => {
              count++;
              return(
              <option value={count + ""}>Match {count}</option>
              );
            }
            ))}
          </select>
          <h1 style={{display: (!replayMatch)?("none"):("inline"), fontSize: "25px", marginLeft: "4vw"}} className="center" id="countoff">3</h1>
        </div>
    </div>
    </div>
  );
};

export default Field;