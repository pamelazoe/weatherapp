import "./temperature.css";
const Temperature = ({ title, temp, unit }) => {
  return (
    <div className="temp-spec">
      <p className="temp-name"> {title}</p>
      <p className="temp-cap">
        {temp} {unit}
      </p>
    </div>
  );
};

export default Temperature;
