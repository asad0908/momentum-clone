import moment from "moment";
import React, { useState } from "react";
import "../css/Time.css";

const Time = () => {
  const [is24Hours, setIs24Hours] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    moment().format(`${is24Hours ? "H:mm" : "h:mm"}`)
  );
  const [dayPart, setDayPart] = useState("");

  setInterval(() => {
    setCurrentTime(moment().format(`${is24Hours ? "H:mm" : "h:mm"}`));
    if (moment().format("HH") >= 12 && moment().format("HH") <= 16) {
      setDayPart("afternoon");
    } else if (moment().format("HH") >= 17 && moment().format("HH") <= 23) {
      setDayPart("evening");
    } else if (moment().format("HH") >= 0 && moment().format("HH") <= 5) {
      setDayPart("night");
    } else if (moment().format("HH") >= 6 && moment().format("HH") <= 11) {
      setDayPart("morning");
    }
  }, 1000);

  return (
    <div className="time">
      <h1>{currentTime}</h1>
      <h2>Good {dayPart}, Asad.</h2>
    </div>
  );
};

export default Time;
