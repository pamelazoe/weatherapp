import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import DotsVertical from "./DotsVertical";
import DotsHorizontal from "./DotsHorizontal";
import "./header.css";
const Header = () => {
	const [click, setClick] = useState(false);
	const handleClick = () => setClick(!click);
	return (
		<>
			<header className="header">
				<div className="logo">
					<h1>weatherApp</h1>
				</div>
				<div className="header-menu">
					<NavLink to="/search" onClick={handleClick}>
						SEARCH
					</NavLink>
					<NavLink to="/about" onClick={handleClick}>
						ABOUT
					</NavLink>
				</div>
				<div className="toggle" onClick={handleClick}>
					{click ? <DotsHorizontal /> : <DotsVertical />}
				</div>
			</header>
			<div className={click ? "menu active" : "menu"}>
				<NavLink to="/search" onClick={handleClick}>
					SEARCH
				</NavLink>
				<NavLink to="/about" onClick={handleClick}>
					ABOUT
				</NavLink>
			</div>
		</>
	);
};

export default Header;
