import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ data, unit, setUnit }) => {
  const {
    main: { temp, temp_min, temp_max, humidity, pressure, feels_like },
    weather,
  } = data;
  const description = weather[0].description;
  const icon = weather[0].icon;

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  const getBackgroundColor = () => {
    if (temp <= 10) return 'cold';
    if (temp <= 25) return 'warm';
    return 'hot';
  };

  return (
    <div className={`weather-card ${getBackgroundColor()}`}>
      <h2>{data.name}</h2>
      <img
        src={`http://openweathermap.org/img/wn/${icon}.png`}
        alt={description}
      />
      <p>{description}</p>
      <p>
        Temperatura actual: {temp} {unit === 'metric' ? '°C' : '°F'}
      </p>
      <p>Temperatura mínima: {temp_min} {unit === 'metric' ? '°C' : '°F'}</p>
      <p>Temperatura máxima: {temp_max} {unit === 'metric' ? '°C' : '°F'}</p>
      <p>Humedad: {humidity}%</p>
      <p>Presión: {pressure} hPa</p>
      <p>Sensación térmica: {feels_like} {unit === 'metric' ? '°C' : '°F'}</p>
      <div className="unit-toggle">
        <button onClick={handleUnitChange} value="metric">
          °C
        </button>
        <button onClick={handleUnitChange} value="imperial">
          °F
        </button>
      </div>
    </div>
  );
};

export default WeatherCard;
