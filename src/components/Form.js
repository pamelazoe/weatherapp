import React, { useState } from "react";
import Error from "./Error";
import "./Form.css";
import ToggleSwitch from "../components/ToggleSwitch";

const Form = ({ search, setSearch, setConsult, isToggled, setIsToggled }) => {
	const [error, setError] = useState(false);

	// extract city and country
	const { city, country, fullCountry } = search;

	// function that adds elements to state
	const handleChange = (e) => {
		setSearch({
			...search,
			[e.target.name]: e.target.value,
		});
	};

	const handleCountry = (e) => {
		setSearch({
			...search,
			[e.target.name]: e.target.value,
			fullCountry: e.target[e.target.selectedIndex].getAttribute(
				"data-country",
			),
		});
	};

	const searchWeather = (e) => {
		e.preventDefault();
		console.log(search);

		if (
			city.trim() === "" ||
			country.trim() === "" ||
			fullCountry.trim() === ""
		) {
			setError(true);
			return;
		}
		setError(false);
		setConsult(true);
	};

	return (
		<form className="form-onsubmit" onSubmit={searchWeather}>
			<div className="select-country">
				<select
					onChange={handleCountry}
					name="country"
					id="country-selector"
					value={country}>
					<option value="">Select a country</option>
					<option value="US" data-country="United States">
						United States
					</option>
					<option value="MX" data-country="Mexico">
						México
					</option>
					<option value="AR" data-country="Argentina">
						Argentina
					</option>
					<option value="CO" data-country="Colombia">
						Colombia
					</option>
					<option value="CR" data-country="Costa Rica">
						Costa Rica
					</option>
					<option value="ES" data-country="Spain">
						España
					</option>
					<option value="PE" data-country="Peru">
						Perú
					</option>
					<option value="CA" data-country="Canada">
						Canadá
					</option>
					<option value="JP" data-country="Japan">
						Japan
					</option>
					<option value="FR" data-country="France">
						France
					</option>
				</select>
			</div>
			<div className="search-bar">
				<input
					type="text"
					name="city"
					id="city"
					value={city}
					onChange={handleChange}
					className="search-city"
					placeholder="City"
				/>

				<button type="submit" className="search-button">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor">
						<path
							fillRule="evenodd"
							strokeWidth="10"
							d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>
			{error ? <Error message="Both inputs are mandatory" /> : null}
			<div className="unit-temp">
				<ToggleSwitch isToggled={isToggled} setIsToggled={setIsToggled} />
			</div>
		</form>
	);
};

export default Form;
