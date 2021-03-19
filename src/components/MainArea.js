import React from "react";
import "../css/MainArea.css";
import InputTask from "./InputTask";
import Time from "./Time";

const MainArea = () => {
  return (
    <div className="mainArea">
      <Time />
      <InputTask />
    </div>
  );
};

export default MainArea;
