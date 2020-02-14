import React, { useState, useEffect } from 'react';
import './App.css';
import Header from "./components/Header"
import Form from "./components/Form"
import Error from "./components/Error"
import Weather from "./components/Weather"
require("dotenv").config()


const App = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("")
  const [error, setError] = useState(false);
  const [result, setResult] = useState({})
  const [img, setImage] = useState("")

  useEffect(() => {
    if(city === "") return;
     // Consultar API
      const getWeather = async () => {
      const app_id = process.env.REACT_APP_APP_ID;
      const api_uri = process.env.REACT_APP_API_URI;
      const url = `${api_uri}q=${city},${country}&appid=${app_id}`
      const incomingData = await fetch(url);
      const result = await incomingData.json();
      setResult(result);      
    }
    getWeather();
  }, [ city, country ]);

  useEffect(() => {
    if(city === "") return;
      const getImage = async () => {
      const up_acc_key = process.env.REACT_APP_UP_ACC_KEY;
      const up_uri = process.env.REACT_APP_UP_API_URI;
      const img_url = `${up_uri}?client_id=${up_acc_key}&query=${city}&location=${city} ${country}&orientation=landscape`
      const incomingImg = await fetch(img_url);
      const img = await incomingImg.json()
      setImage(img.urls)
      console.log(img)
    }
    getImage();
  }, [ city, country ]);

  const searchData = data => {
     if(data.city === "" || data.country === ""){
       //error
       setError(true);
       setResult("")
       return;
     }
     // Si city y country existen, agregarlos al state
     setCity(data.city);
     setCountry(data.country);
     setError(false);
  }

   
    // Cargar un componente condicionalmente
    let component;
    if(error) {
      // Si hay un error, mostrar el componente Error
      component=<Error message="Both inputs are mandatory"/>
    } else if(result.cod === "404") {
      component=<Error message="This city doesn't exist in our records" />
    } else {
      //Mostrar el clima      
      component=<Weather
        result={result}
        img={img}
        />
    }
  return (
    <div className="App">
     <div className="App">
       <Header apptitle="Weather App"/>
     </div>
     <div className="Form">
       <Form 
        searchData={searchData}
       />
     </div>
     <div className="error-div">
       {component}
     </div>
    </div>
  );
}

export default App;
