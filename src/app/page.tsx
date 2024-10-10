"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import WeatherDisplay from "@/components/WeatherDisplay";
import MusicRecommendation from "@/components/MusicRecommendation";
import LocationInput from "@/components/LocationInput";
import { FaLeaf } from "react-icons/fa";
import { useAppContext } from "@/context/AppContext";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
}

const Home: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [userLocation, setUserLocation] = useState<string>("");
  const [isSpotifyConnected, setIsSpotifyConnected] = useState(false);

  useEffect(() => {
    const checkSpotifyConnection = () => {
      const isConnected = document.cookie.includes("spotifyConnected=true");
      setIsSpotifyConnected(isConnected);
    };

    checkSpotifyConnection();

    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get("error");
    if (error) {
      console.error("Spotify authentication error:", error);
      // Handle error (e.g., show error message to user)
    }
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!userLocation) return;

      try {
        const response = await fetch(
          `/api/weather?city=${encodeURIComponent(userLocation)}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeatherData({
          location: data.name,
          temperature: data.main.temp,
          condition: data.weather[0].main,
          icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          humidity: data.main.humidity,
        });
      } catch (err) {
        console.error("Error fetching weather:", err);
        setWeatherData(null);
      }
    };

    fetchWeatherData();
  }, [userLocation]);

  const handleLocationUpdate = (newLocation: string) => {
    setUserLocation(newLocation);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <header className="bg-gradient-to-r from-green-800 to-green-900 p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-green-300 flex items-center">
            <FaLeaf className="mr-2" /> VibeCast
          </h1>
          <p className="text-green-200 italic">
            Fall into the rhythm of weather
          </p>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-green-400 mb-2">
            Welcome to VibeCast
          </h2>
          <p className="text-gray-400">
            Discover the perfect autumn soundtrack for your weather
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-green-700">
          <LocationInput onLocationUpdate={handleLocationUpdate} />
        </div>
        {weatherData && <WeatherDisplay weather={weatherData} />}
        <div className="mt-6">
          <MusicRecommendation
            weatherCondition={weatherData?.condition}
            isSpotifyConnected={isSpotifyConnected}
          />
        </div>
      </main>
      <footer className="bg-gray-900 text-green-300 text-center py-4 mt-12">
        <p>&copy; 2024 VibeCast. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
