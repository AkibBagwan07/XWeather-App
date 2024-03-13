// import { useState } from 'react';
// import './App.css';
// import WeatherApp from './functionality/WeatherApp';
// // import WeatherApp from './functionality/WeatherApp';


// function App() {
//   return (
//     <WeatherApp />
//   );
// }

// export default App;
import { useEffect, useState } from "react";
// import WeatherApp from './functionality/WeatherApp';
import "./index.css";
import axios from "axios";

const Searchbar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const handleSearch = () => {
    onSearch(city);
  };
  return (
    <div className="weather-card">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="inp"
      />
      <button className="Btn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

  const WeatherCard = ({data,title}) =>{
    return(
      <div className="flexChild">
        <h3>{title}</h3>
        <p>{data}</p>
      </div>
    )
  }

const WeatherDisplay = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (city) {
      setLoading(true);
      axios
        .get("https://api.weatherapi.com/v1/current.json", {
          params: {
            key: "34dd105e2c4c4cf2b69154421240903",
            q: city,
          },
        })
        .then((res) => {
          setWeatherData(res.data.current);
          console.log(res.data.current);
        })
        .catch((err) => {
          alert("Failed to fetch weather data");
          console.error("error fetching data", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [city]);
  return (
    <div>
      {loading && <p>Loading data...</p>}
      {!loading && weatherData && (
        <div className="weather-cards">
        <WeatherCard data={`${weatherData.temp_c}°C`} title="Temperature"/>
        <WeatherCard data={`${weatherData.humidity}%`} title="Humidity"/>
        <WeatherCard data={`${weatherData.condition.text}`} title="Condition"/>
        <WeatherCard data={`${weatherData.wind_kph} kph`} title="Wind Speed"/>
      </div>
      )}
    </div>
  );
};

function App() {
  const [city, setCity] = useState("");
  const handleSearch = (search) => {
    setCity(search);
  };
  return (
    <div className="parent">
      <Searchbar onSearch={handleSearch} />
      <WeatherDisplay city={city} />
    </div>
  );
}

export default App;
