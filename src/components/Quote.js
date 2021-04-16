import React, { useEffect, useState } from "react";
import "../css/Quote.css";
import { getWithExpiry, setWithExpiry } from "../helper/expiry";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import TodoContainer from "./TodoContainer";

const Quote = () => {
  const [qod, setQod] = useState(null);
  const likedValue = localStorage.getItem("liked") === "true";
  const [liked, setLiked] = useState(likedValue);
  const [openTodoBox, setOpenTodoBox] = useState(false);

  const toggleLiked = () => {
    setLiked(!liked);
    localStorage.setItem("liked", !liked);
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  useEffect(() => {
    fetch("https://favqs.com/api/qotd")
      .then((data) => data.json())
      .then((res) => {
        const alreadyQuote = getWithExpiry("quote");
        if (alreadyQuote === null) {
          localStorage.setItem("liked", false);
          setWithExpiry("quote", res.quote, 86400000);
          setQod(res.quote);
        } else {
          setQod(alreadyQuote);
        }
      })
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <div className="quote">
      <div className="quote__main">
        <h3>"{truncate(qod?.body, 20)}"</h3>
        <h4>
          {qod?.author}
          {liked ? (
            <FavoriteIcon
              onClick={toggleLiked}
              style={{ marginLeft: "3px" }}
              fontSize="small"
            />
          ) : (
            <FavoriteBorderIcon
              onClick={toggleLiked}
              style={{ marginLeft: "3px" }}
              fontSize="small"
            />
          )}
        </h4>
      </div>
      <div className="bottom__todoContainer">
        {openTodoBox && <TodoContainer setOpenTodoBox={setOpenTodoBox} />}
        <p
          onClick={() => setOpenTodoBox(!openTodoBox)}
          className={`bottom__todo ${openTodoBox ? "bottom__todoOpened" : ""}`}
        >
          Todo
        </p>
      </div>
    </div>
  );
};

export default Quote;
