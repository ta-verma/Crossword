import React from "react";
import { useStopwatch } from "react-timer-hook";

function MyStopwatch() {
  //const stopwatchOffset = new Date();
 // stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + 300);
  const {
    seconds,
    minutes,
    hours   
  } = useStopwatch({ autoStart: true });
  const hourTime = hours < 10 ? `0${hours}` : `${hours}`;
  const secondTime = seconds < 10 ? `0${seconds}` : `${seconds}`;
  const minuteTime = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Time Elapsed</h1>
      <div style={{ fontSize: "100px" }}>
        <span>{hourTime}</span>:<span>{minuteTime}</span>:
        <span>{secondTime}</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <MyStopwatch />
    </div>
  );
}
