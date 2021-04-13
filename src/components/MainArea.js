import React, { useEffect, useState } from "react";
import "../css/MainArea.css";
import AddName from "./AddName";
import InputTask from "./InputTask";
import Time from "./Time";

const MainArea = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const localName = localStorage.getItem("momentumName");
    if (localName?.length > 0) {
      setName(localName);
    } else {
      setName("");
    }
  }, []);

  return (
    <div className="mainArea">
      <Time name={name} />
      {name.length > 0 ? <InputTask /> : <AddName setName={setName} />}
    </div>
  );
};

export default MainArea;
