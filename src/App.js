import Header from "./components/Header";
import { Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

import Search from "./Pages/Search";
import About from "./Pages/About";
// import Main from "./components/Main";
import "./App.css";

const App = () => {
	require("dotenv").config();
	const onLoadOrientation =
		window.innerWidth > window.innerHeight ? "landscape" : "portrait";
	const [search, setSearch] = useState({
		city: "Guadalajara",
		country: "MX",
		fullCountry: "Mexico",
		orientation: onLoadOrientation,
	});
	const [consult, setConsult] = useState(true);
	const [error, setError] = useState(false);
	const [result, setResult] = useState({});
	const [img, setImage] = useState("");
	const [noImage, setImg] = useState(false);
	const [author, setAuthor] = useState({});
	const { city, country, fullCountry } = search;
	const [isToggled, setIsToggled] = useState(false);

	const getImage = async (city, fullCountry) => {
		const img_url = `https://weathercare-backend.pamelazoe.vercel.app/unsplash`;
		// const img_url = `http://localhost:8080/unsplash`;

		const incomingImg = await fetch(img_url, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				city: city,
				fullCountry: fullCountry,
				orientation: onLoadOrientation,
			}),
		});
		const getImage = await incomingImg.json();
		setImg(false);
		incomingImg.status !== 404 ? setImage(getImage.urls) : setImg(true);
		setAuthor(getImage.user);
	};
	const getWeather = async (city, country, fullCountry) => {
		if (consult) {
			const urlWeather = `https://weathercare-backend.pamelazoe.vercel.app/weather`;
			// const urlWeather = `http://localhost:8080/weather`;

			const incomingData = await fetch(urlWeather, {
				method: "POST",
				// mode: 'no-cors',
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ city: city, country: country }),
			});

			const result = await incomingData.json();
			setSearch({
				city: "",
				country: "",
				fullCountry: "",
			});
			if (result.cod === "404") {
				setError(true);
				// setImage(false);
			} else {
				setError(false);
				getImage(city, fullCountry, onLoadOrientation);
			}
			setResult(result);
		}
	};

	useEffect(() => {
		getWeather(city, country, fullCountry);
		// setResult({});
		setConsult(false);
		// eslint-disable-next-line
	}, [consult]);
	const { regular } = img;

	const unsplashBackgroundImg = {
		backgroundImage: `url(${regular})`,
		backgroundAttachment: "fixed",
		backgroundSize: "cover",
		height: "100vh",
		margin: "0",
		padding: "0",
		display: "flex",
		overflow: "hidden",
		justifyContent: "space-between",
	};

	return (
		<div className="App" style={unsplashBackgroundImg}>
			<Header />
			<Switch>
				<Route exact path="/">
					<Search
						result={result}
						regular={regular}
						search={search}
						setSearch={setSearch}
						setConsult={setConsult}
						error={error}
						author={author}
						rawImage={img}
						isToggled={isToggled}
						setIsToggled={setIsToggled}
					/>
				</Route>
				<Route path="/search">
					<Search
						result={result}
						regular={regular}
						search={search}
						setSearch={setSearch}
						setConsult={setConsult}
						error={error}
						setError={setError}
						author={author}
						rawImage={img}
						isToggled={isToggled}
						setIsToggled={setIsToggled}
					/>
				</Route>
				<Route path="/about">
					<About />
				</Route>
			</Switch>
		</div>
	);
};

export default App;
