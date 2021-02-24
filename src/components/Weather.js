import React from "react";
import "./Weather.css";
import Temperature from "./Temperature";

const Weather = ({ result, isToggled, setIsToggled }) => {
	const { name, main, sys, uvIndex } = result;
	// console.log(result)
	// console.log(img)
	// console.log(img)
	if (!name) return null;
	// const kelvinToCelcius = (temp) => (temp - 273.15).toFixed(2);
	// console.log(img.raw)
	console.log(isToggled);
	const celsiusToFahrenheit = (temp) => (temp * 1.8 + 32).toFixed(1);

	return (
		<div className="weather-panel">
			<div className="location-search">
				{name}, {sys.country}
			</div>
			<div className="weather-data">
				<Temperature
					title="Actual"
					temp={
						!isToggled ? main.temp.toFixed(1) : celsiusToFahrenheit(main.temp)
					}
					unit={!isToggled ? "ºC" : "ºF"}
				/>
				<Temperature
					title="Minimum"
					temp={
						!isToggled
							? main.temp_min.toFixed(1)
							: celsiusToFahrenheit(main.temp_min)
					}
					unit={!isToggled ? "ºC" : "ºF"}
				/>
				<Temperature
					title="Maximum"
					temp={
						!isToggled
							? main.temp_max.toFixed(1)
							: celsiusToFahrenheit(main.temp_max)
					}
					unit={!isToggled ? "ºC" : "ºF"}
				/>
				<Temperature title="UV Index" temp={uvIndex.value} />
			</div>
		</div>
	);
};

export default Weather;
