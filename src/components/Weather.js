import React from "react";

const Weather = ({result, img}) => {
    const {name, main, sys} = result;
    const { regular } = img;
    // console.log(result)
    // console.log(img)
    // console.log(img)
    if(!name) return null;
    const kelvinToCelcius = temp => (temp - 273.15).toFixed(2)
    // console.log(img.raw)
    return(
        <div className="weather-panel">
<h1>This is the climate for {name}, {sys.country}</h1>
    <h2>Actual temperature</h2>
    <p>{kelvinToCelcius(main.temp)} &#x2103;</p>
    <h2>Minimum Temperature</h2>
    <p>{kelvinToCelcius(main.temp_min)}  &#x2103;</p>
    <h2>Maximum Temperature</h2>
    <p>{kelvinToCelcius(main.temp_max)}  &#x2103;</p>
    <img src={regular} alt=""/>
        </div>
       
    )
}

export default Weather;