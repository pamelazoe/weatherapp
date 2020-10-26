import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Form from './components/Form';
import Error from './components/Error';
import Weather from './components/Weather';
import WeatherImage from './components/WeatherImage';
require('dotenv').config();

const App = () => {
  const [search, setSearch] = useState({
    city: '',
    country: '',
    fullCountry: '',
  });
  const [consult, setConsult] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState({});
  const [img, setImage] = useState('');
  const [noImage, setImg] = useState(false);
  const { city, country, fullCountry } = search;

  useEffect(() => {
    const getImage = async () => {
      // const img_url = https://weathercare-backend.pamelazoe.vercel.app/unsplash';
      const img_url = `https://weathercare-backend.vercel.app/unsplash`;
      const incomingImg = await fetch(img_url, {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city: city, country: fullCountry }),
      });
      const img = await incomingImg.json();
      setImg(false);
      incomingImg.status !== 404 ? setImage(img.urls) : setImg(true);
      console.log(img);
    };
    const getWeather = async () => {
      if (consult) {
        const urlWeather = `https://weathercare-backend.vercel.app/weather`;
        // const urlWeather ='https://weathercare-backend.pamelazoe.vercel.app/weather';
        const incomingData = await fetch(urlWeather, {
          method: 'POST',
          // mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ city: city, country: country }),
        });

        const result = await incomingData.json();
        console.log(result);
        console.log(consult);
        if (result.cod === '404') {
          setError(true);
          setImage(false);
        } else {
          setError(false);
          getImage();
        }
        setResult(result);
        // setConsult(false);
      }
    };
    console.log(search);
    getWeather();
    setSearch({
      city: '',
      country: '',
      fullCountry: '',
    });
    setResult({});
    setConsult(false);
    // eslint-disable-next-line
  }, [consult]);

  // Cargar un componente condicionalmente
  let component1;
  if (!error) {
    //Mostrar el clima
    component1 = <Weather result={result} />;
  } else {
    // Si hay un error, mostrar el componente Error
    component1 = <Error message='There are no results for this search' />;
  }
  let component2;
  if (noImage) {
    // Si hay un error, mostrar el componente Error
    component2 = <Error message='There are no pictures for this city' />;
  } else {
    //Mostrar el clima
    component2 = <WeatherImage img={img} />;
  }

  return (
    <div className='App'>
      <div className='App'>
        <Header apptitle='Weather App' />
      </div>
      <div className='Form'>
        <Form
          // searchData={searchData}
          search={search}
          setSearch={setSearch}
          setConsult={setConsult}
        />
      </div>
      <div className='error-div'>{component1}</div>
      <div className='error-div'>{component2}</div>
    </div>
  );
};

export default App;
