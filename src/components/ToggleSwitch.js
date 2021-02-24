import "./ToggleSwitch.css";

const ToggleSwitch = ({ isToggled, setIsToggled }) => {
	const onToggle = () => setIsToggled(!isToggled);
	return (
		<div className="unit-temp">
			<div className="celsius">°C</div>
			<div className="toggle-unit">
				<label className="toggle-switch">
					<input type="checkbox" checked={isToggled} onChange={onToggle} />
					<span className="switch" />
				</label>
			</div>
			<div className="fahrenheit">°F</div>
		</div>
	);
};

export default ToggleSwitch;
