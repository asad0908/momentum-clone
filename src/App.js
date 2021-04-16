import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import MainArea from "./components/MainArea";
import Quote from "./components/Quote";
import { getWithExpiry, setWithExpiry } from "./helper/expiry";

function App() {
  useEffect(() => {
    console.log(getWithExpiry("momentumNotification"), new Date().getTime());
    if (getWithExpiry("momentumNotification") !== 1) {
      alert("HELLO");
      setWithExpiry("momentumNotification", 1, 15 * 60 * 1000);
    }
  }, []);

  return (
    <div className="app">
      <div className="app__overlay"></div>
      <Header />
      <MainArea />
      <Quote />
    </div>
  );
}

export default App;
