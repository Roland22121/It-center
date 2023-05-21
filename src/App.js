import Data from "./components/data";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";
import mapk from "../src/assets/img/nkar1.jpg";
import './App.css';


function App() {
  
const [city, setCity] = useState("London");
const [weather, setWeather] = useState(null);
const [units, setUnits] = useState("metric");
// const [bg, setBg] = useState(hotBg);

useEffect(() => {
  const fetchWeatherData = async () => {
    const data = await getFormattedWeatherData(city, units);
    setWeather(data);

    // const threshold = units === "metric" ? 20 : 60;
    // if (data.temp <= threshold) setBg(coldBg);
    // else setBg(hotBg);
  };

  fetchWeatherData();
  getData();
}, [units, city]);

const handleUnitsClick = (e) => {
  const button = e.currentTarget;
  const currentUnit = button.innerText.slice(1);

  const isCelsius = currentUnit === "C";
  button.innerText = isCelsius ? "°F" : "°C";
  setUnits(isCelsius ? "metric" : "imperial");
};
const [dataa, setDataa] = useState('');
  const getData = async () => {
      try{
          const resp = await fetch(
              "https://api.sampleapis.com/countries/countries"
          );
          const json = await resp.json();
          setDataa(json);
      }catch(error){
          console.log(error);
      }
  };
  return (
 
<div className="app" style={{backgroundImage:`url(${mapk})`}} >
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              {
              <select name="" className="L-select" id="" onChange={(e)=>{
                  setCity(e.target.value)
              }}>
                  {dataa.length > 0 
                  ? dataa.map((elem, i) => <option key={i}>{elem.name}</option>)
                  : console.log('error')
                  }
              </select>
              }
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>
            <Data weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
