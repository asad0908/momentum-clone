import moment from "moment";
import React, { useState } from "react";
import "../css/Time.css";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { IconButton } from "@material-ui/core";
import Switch from "react-switch";

const Time = () => {
  const [is24Hours, setIs24Hours] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    moment().format(`${is24Hours ? "H:mm" : "h:mm"}`)
  );
  const [dayPart, setDayPart] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [switchStatus, setSwitchStatus] = useState(false);

  const changeSwitch = () => {
    setSwitchStatus(!switchStatus);
    setIs24Hours(!switchStatus);
  };

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
      <h1>
        <span>{currentTime}</span>
        <span>
          <IconButton
            onClick={() => setShowTooltip(!showTooltip)}
            style={{ color: "#fff" }}
          >
            <MoreHorizIcon fontSize="large" />
          </IconButton>
        </span>
      </h1>
      {showTooltip && (
        <div className="time__tooltip">
          <p>
            <span>24 Hours format</span>
            <Switch
              uncheckedIcon={false}
              checkedIcon={false}
              onChange={changeSwitch}
              checked={switchStatus}
              handleDiameter={15}
              width={35}
              height={20}
            />
          </p>
        </div>
      )}
      <h2>Good {dayPart}, Asad.</h2>
    </div>
  );
};

export default Time;
