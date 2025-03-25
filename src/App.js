import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import './styles/App.css';

const App = () => {
  // Estado para guardar el país, ciudad seleccionada, y los datos del clima
  const [country, setCountry] = useState('US');
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('metric'); // Para las unidades de temperatura (°C/°F)
  const [cities, setCities] = useState([]); // Estado para manejar las ciudades disponibles

  // Estructura con ciudades por país
  const countryCities = {
    US: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'],
    MX: ['Ciudad de México', 'Guadalajara', 'Monterrey', 'Cancún', 'Puebla'],
    AR: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'Mar del Plata'],
    CO: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena'],
    CR: ['San José', 'Alajuela', 'Cartago', 'Heredia', 'Puntarenas'],
    ES: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza'],
    PE: ['Lima', 'Arequipa', 'Cusco', 'Trujillo', 'Piura'],
  };

  // Lista de países
  const countries = [
    { code: 'US', name: 'Estados Unidos' },
    { code: 'MX', name: 'México' },
    { code: 'AR', name: 'Argentina' },
    { code: 'CO', name: 'Colombia' },
    { code: 'CR', name: 'Costa Rica' },
    { code: 'ES', name: 'España' },
    { code: 'PE', name: 'Perú' },
  ];

  const apiKey = '7bfca1da06d0ec0ced91f5bc65b7c5d1'; 

  
  const updateCities = (selectedCountry) => {
    setCountry(selectedCountry);
    setCity(''); 
    setCities(countryCities[selectedCountry]); 
  };

  
  const handleSearch = async () => {
    if (!city) {
      setError('Por favor ingresa una ciudad.');
      return;
    }
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=${unit}&lang=es`
      );
      setWeatherData(response.data);
      setError('');
    } catch (error) {
      setWeatherData(null);
      setError('Ciudad no encontrada. Intenta de nuevo.');
    }
  };

  useEffect(() => {
    // Al cargar la aplicación, establecemos las ciudades para el país por defecto (US)
    setCities(countryCities['US']);
  }, []);

  return (
    <div className="app">
      <h1>Aplicación del Clima</h1>
      <div className="search-container">
        {/* Dropdown para seleccionar país */}
        <select
          value={country}
          onChange={(e) => updateCities(e.target.value)} 
        >
          {countries.map((item) => (
            <option key={item.code} value={item.code}>
              {item.name}
            </option>
          ))}
        </select>

        {/* Dropdown para seleccionar ciudad */}
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">Selecciona una ciudad</option>
          {cities.map((cityName, index) => (
            <option key={index} value={cityName}>
              {cityName}
            </option>
          ))}
        </select>

        <button onClick={handleSearch}>Buscar</button>
      </div>
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <WeatherCard
          data={weatherData}
          unit={unit}
          setUnit={setUnit}
        />
      )}
    </div>
  );
};

export default App;
