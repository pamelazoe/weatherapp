import React from "react";

const WeatherImage = ({ img }) => {
  const { regular } = img;
  return <img src={regular} alt="" />;
};

export default WeatherImage;
