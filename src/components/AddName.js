import React, { useState } from "react";
import "../css/AddName.css";

const AddName = ({ setName }) => {
  const [nameInput, setNameInput] = useState("");

  const setMomentumName = (e) => {
    if (e.key === "Enter") {
      localStorage.setItem("momentumName", nameInput);
      setName(nameInput);
    }
  };

  return (
    <div className="nameInput">
      <h1>Hello, What's your name?</h1>
      <input
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
        onKeyDown={setMomentumName}
        type="text"
      />
    </div>
  );
};

export default AddName;
