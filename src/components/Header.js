import React, { useRef, useState } from "react";
import "../css/Header.css";
import SearchIcon from "@material-ui/icons/Search";
import Temp from "./Temp";

const Header = () => {
  const searchInputRef = useRef(null);
  const [inputFocused, setInputFocused] = useState(false);

  const searchResult = (e) => {
    if (e.key === "Enter") {
      window.open(
        `https://www.google.com/search?q=${searchInputRef.current.value}`
      );
      searchInputRef.current.value = "";
    }
  };

  return (
    <div className="header">
      <div className="header__left">
        <div
          className={`header__search ${
            inputFocused ? "header__searchFocused" : ""
          }`}
        >
          <SearchIcon />
          <input
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            spellCheck={false}
            ref={searchInputRef}
            onKeyPress={searchResult}
            type="text"
          />
          <img
            src="https://cdn.worldvectorlogo.com/logos/google-icon.svg"
            alt="google"
          />
          &nbsp;
        </div>
      </div>
      <div className="header__right">
        <Temp />
      </div>
    </div>
  );
};

export default Header;
