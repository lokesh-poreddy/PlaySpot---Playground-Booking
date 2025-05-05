'use client';

import { useState } from 'react';

export default function WeatherWidget() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState('');
  
  const apiKey = 'cda8c178a08b5f2dd18d4d86f62b4286';

  async function getWeather() {
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === "200") {
        setWeatherData(data);
        setError('');
      } else {
        setError(`Sorry, we couldn't find the weather data for ${city}`);
        setWeatherData(null);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('There was an error fetching the weather data. Please try again later.');
      setWeatherData(null);
    }
  }

  return (
    <div className="text-center mt-12">
      <h1 className="text-2xl font-bold mb-4">Weather Forecast</h1>
      <p className="mb-4">Enter a city name to get the weather details:</p>
      
      <div className="flex justify-center gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="px-4 py-2 border rounded"
        />
        <button
          onClick={getWeather}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Get Weather
        </button>
      </div>

      {error && (
        <div className="mt-4 text-red-500">{error}</div>
      )}

      {weatherData && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Weather Forecast for {city}</h2>
          <p className="mt-2"><strong>Temperature:</strong> {weatherData.list[0].main.temp} °C</p>
          <p><strong>Weather:</strong> {weatherData.list[0].weather[0].description}</p>
          <p><strong>Humidity:</strong> {weatherData.list[0].main.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weatherData.list[0].wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}