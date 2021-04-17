import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import MainArea from "./components/MainArea";
import Quote from "./components/Quote";
import { getWithExpiry, setWithExpiry } from "./helper/expiry";

function App() {
  useEffect(() => {
    if (getWithExpiry("momentumNotification") !== 1) {
      alert(
        "This Momentum clone is just for my portfolio and I do not own any rights for this platform, No money will be earned from this clone and it is just to showcase my react skills to the world. Loved this build! and I hope you will love it too...."
      );
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
