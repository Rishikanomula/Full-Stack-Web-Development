import React, { useState } from "react";
import axios from "axios";

const WeatherApp = () => {
  const apiKey = "df3c1f0ca3daa1e72feee07dae9c78b1";
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    if (!city) {
      alert("Please enter a city name.");
      return;
    }
    setWeather(null);
    try {
      setWeather(null);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      alert("Error: " + error.response?.data?.message || "Failed to fetch weather data");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-blue-500 p-6">
      <div className="bg-white p-6 rounded-2xl shadow-md max-w-md w-full text-center">
        <h2 className="text-xl font-bold text-gray-800">Weather At Any Place</h2>
        <div className="mt-4 flex gap-3">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-lg text-center"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={getWeather}
          >
            Search
          </button>
        </div>
        {weather && (
          <div className="mt-6 p-4 bg-blue-100 rounded-lg shadow-lg w-full">
            <h2 className="text-2xl font-bold text-gray-700">{weather.name}</h2>
            <p className="text-xl text-gray-600">{weather.weather[0].description}</p>
            <p className="text-lg font-semibold">Temperature: {weather.main.temp}°C</p>
            <p>Feels Like: {weather.main.feels_like}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
            <p>Pressure: {weather.main.pressure} hPa</p>
            <p>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
            <div className="mt-4">
              <img
                src={`images/${weather.weather[0].main.toLowerCase()}.svg`}
                alt={weather.weather[0].main}
                className="w-24 mx-auto"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
