'use client';

import { useState } from 'react';
import styles from './WeatherWidget.module.css';

export default function WeatherWidget() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState('');
  
  const apiKey = "ce37322adad56a2f2cc59a1fce9bb7e8";

  async function getWeather() {
    const output = document.getElementById("weatherOutput");

    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
        setError('');
      } else {
        setError(`Error: ${data.message}`);
        setWeatherData(null);
      }
    } catch (error: any) {
      setError(`Fetch error: ${error.message}`);
      setWeatherData(null);
    }
  }

  return (
    <div className={styles.container}>
      <h1>Playground Weather App</h1>
      <input 
        type="text" 
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter City (e.g., Kattankulathur)"
      />
      <button onClick={getWeather}>Get Weather</button>
      
      {error && <div className={styles.error}>{error}</div>}
      
      {weatherData && (
        <div id="weatherOutput" className={styles.weatherOutput}>
          <h2>Weather in {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}