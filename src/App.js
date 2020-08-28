import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Form from "./components/Form";
import Error from "./components/Error";
import Weather from "./components/Weather";
import WeatherImage from "./components/WeatherImage";
require("dotenv").config();

const App = () => {
  const [search, setSearch] = useState({
    city: "",
    country: "",
  });
  const [consult, setConsult] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState({});
  const [img, setImage] = useState("");
  const [noImage, setImg] = useState(false);
  const { city, country } = search;

  useEffect(() => {
    const getImage = async () => {
      const up_acc_key = process.env.REACT_APP_UP_ACC_KEY;
      const up_uri = process.env.REACT_APP_UP_API_URI;
      const img_url = `${up_uri}?client_id=${up_acc_key}&query=${city}&location=${city} ${country}&orientation=landscape`;
      const incomingImg = await fetch(img_url);
      const img = await incomingImg.json();
      setImg(false);
      incomingImg.status !== 404 ? setImage(img.urls) : setImg(true);
      console.log(img.urls);
    };
    const getWeather = async () => {
      if (consult) {
        const app_id = process.env.REACT_APP_APP_ID;
        const api_uri = process.env.REACT_APP_API_URI;
        const urlWeather = `${api_uri}q=${city},${country}&appid=${app_id}`;
        const incomingData = await fetch(urlWeather);
        const result = await incomingData.json();
        console.log(result);
        if (result.cod === "404") {
          setError(true);
        } else {
          setError(false)
          getImage();
        }
        setResult(result);
        setConsult(false);
      }
    };
    getWeather();
    // eslint-disable-next-line
  }, [consult]);

  // useEffect(() => {
  //   const getWeather = async () => {
  //     if (consult) {
  //       const app_id = process.env.REACT_APP_APP_ID;
  //       const api_uri = process.env.REACT_APP_API_URI;
  //       const url = `${api_uri}q=${city},${country}&appid=${app_id}`;
  //       const incomingData = await fetch(url);
  //       const result = await incomingData.json();
  //       setResult(result);
  //       setConsult(false);
  //       if (result.cod === "404") {
  //         setError(true);
  //       } else {
  //         setError(false);
  //       }
  //     }
  //   };
  //   getWeather();
  //   // eslint-disable-next-line
  // }, [consult]);

  // useEffect(() => {
  //   const getImage = async () => {
  //     if (consult) {
  //       const up_acc_key = process.env.REACT_APP_UP_ACC_KEY;
  //       const up_uri = process.env.REACT_APP_UP_API_URI;
  //       const img_url = `${up_uri}?client_id=${up_acc_key}&query=${city}&location=${city} ${country}&orientation=landscape`;
  //       const incomingImg = await fetch(img_url);
  //       const img = await incomingImg.json();
  //       img.urls ? setImage(img.urls) : setError(true);
  //       console.log(incomingImg);
  //     }
  //   };
  //   getImage();
  //   // eslint-disable-next-line
  // }, [consult]);

  // const searchData = (data) => {
  //   if (data.city === "" || data.country === "") {
  //     //error
  //     setError(true);
  //     setResult("");
  //     return;
  //   }
  //   // Si city y country existen, agregarlos al state

  //   //  setCity(data.city);
  //   //  setCountry(data.country);
  //   console.log(city, country);
  //   setError(false);
  // };

  // Cargar un componente condicionalmente
  let component1;
  if (!error) {
    // Si hay un error, mostrar el componente Error
    component1 = <Weather result={result} />;

  } else {
    //Mostrar el clima
    component1 = <Error message="There are no results for this search" />;

  }
  let component2;
  if (noImage) {
    // Si hay un error, mostrar el componente Error
    component2 = <Error message="There are no pictures for this city" />;
  } else {
    //Mostrar el clima
    component2 = <WeatherImage img={img} />;
  }

  return (
    <div className="App">
      <div className="App">
        <Header apptitle="Weather App" />
      </div>
      <div className="Form">
        <Form
          // searchData={searchData}
          search={search}
          setSearch={setSearch}
          setConsult={setConsult}
        />
      </div>
      <div className="error-div">{component1}</div>
      <div className="error-div">{component2}</div>
    </div>
  );
};

export default App;
