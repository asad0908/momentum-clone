import React, { useEffect, useState } from "react";
import "../css/Temp.css";

const Temp = () => {
  const [coords, setCoords] = useState({});
  const [address, setAddress] = useState("");
  const [temp, setTemp] = useState("");

  useEffect(() => {
    const show = (pos) => {
      setCoords({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    };
    navigator.geolocation.getCurrentPosition(show);
  }, []);

  useEffect(() => {
    if (coords?.latitude && coords?.longitude) {
      fetch(
        `https://us1.locationiq.com/v1/reverse.php?key=pk.c7cbaa6bc4f11f520a67d1cf401fec65&lat=${coords.latitude}&lon=${coords.longitude}&format=json`
      )
        .then((data) => data.json())
        .then((doc) => setAddress(doc.address))
        .catch((err) => alert(err));
    }
  }, [coords]);

  useEffect(() => {
    if (coords?.latitude && coords?.longitude) {
      fetch("https://am-proxy-cors.herokuapp.com/dark-sky", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude: coords.latitude,
          longitude: coords.longitude,
        }),
      })
        .then((dod) => dod.json())
        .then((res) => setTemp(res))
        .catch((err) => alert(err.message));
    }
  }, [coords]);

  useEffect(() => {
    console.log(temp);
  }, [temp]);

  return (
    <div className="temp">
      {coords && (
        <>
          <div className="temp__up">
            <div className="temp__svg">
              <img
                src={`${
                  temp?.summary === "Clear"
                    ? "../sun.svg"
                    : temp?.summary === "Humid and Partly Cloudy"
                    ? "https://firebasestorage.googleapis.com/v0/b/asadmemon0908.appspot.com/o/cloudy.svg?alt=media&token=d693ff58-ec46-4ca9-a3df-9df9d0835855"
                    : ""
                }`}
                alt=""
              />
            </div>
            <h1>{temp.temperature && Math.round(temp.temperature)}°</h1>
          </div>
          <div className="temp__down">
            <p>
              {address.neighbourhood ||
                address.residential ||
                address.state_district ||
                address.city ||
                address.state ||
                address.country}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Temp;
