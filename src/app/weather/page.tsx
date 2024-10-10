"use client";

import React, { useEffect, useState } from "react";
import {
  FaCloud,
  FaWind,
  FaTemperatureHigh,
  FaLeaf,
  FaSpotify,
  FaPlay,
  FaPause,
} from "react-icons/fa";
import LocationInput from "@/components/LocationInput";
import UserPreferences from "@/components/UserPreferences";
import WeatherDisplay from "@/components/WeatherDisplay";
import MusicRecommendation from "@/components/MusicRecommendation";
import { useAppContext } from "@/context/AppContext";
import { fetchWeatherData } from "@/utils/weatherApi";
import {
  getTracksForWeather,
  playTrack,
  pausePlayback,
  // setAccessToken,
} from "@/services/spotifyService";
import { parseCookies } from "nookies";
import { useSearchParams } from "next/navigation";
import { setAccessToken } from "@/services/spotifyService";

interface Track {
  id: string;
  uri: string;
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
}

interface UserPreferencesType {
  preferredGenres: string[];
  weatherMoodOverrides: { [key: string]: string };
}

const WeatherPage: React.FC = () => {
  const { weatherData, setWeatherData, isLoading, setIsLoading } =
    useAppContext();
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string>("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isSpotifyConnected, setIsSpotifyConnected] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreferencesType>({
    preferredGenres: [],
    weatherMoodOverrides: {},
  });

  const searchParams = useSearchParams();
  const spotifyError = searchParams.get("error");

  useEffect(() => {
    const cookies = parseCookies();
    const spotifyAccessToken = cookies.spotifyAccessToken;
    if (spotifyAccessToken) {
      setAccessToken(spotifyAccessToken);
      setIsSpotifyConnected(true);
    }

    if (spotifyError) {
      setError(`Spotify connection failed: ${spotifyError}`);
    }

    // Load user preferences from localStorage
    const savedPreferences = localStorage.getItem("userPreferences");
    if (savedPreferences) {
      setUserPreferences(JSON.parse(savedPreferences));
    }
  }, [spotifyError]);

  useEffect(() => {
    if (weatherData && isSpotifyConnected) {
      getTracksForWeather(weatherData.condition)
        .then((spotifyTracks) => setTracks(spotifyTracks as Track[]))
        .catch(console.error);
    }
  }, [weatherData, isSpotifyConnected]);

  useEffect(() => {
    const getWeatherData = async () => {
      if (!location) return;

      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchWeatherData(location);
        setWeatherData(data);

        if (isSpotifyConnected) {
          const mood =
            userPreferences.weatherMoodOverrides[data.condition] ||
            data.condition;
          const recommendedTracks = await getTracksForWeather(mood);
          setTracks(recommendedTracks as Track[]);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    getWeatherData();
  }, [
    location,
    setWeatherData,
    setIsLoading,
    isSpotifyConnected,
    userPreferences,
  ]);

  const handleLocationUpdate = (newLocation: string) => {
    setLocation(newLocation);
  };

  const handleSpotifyConnect = async () => {
    try {
      const response = await fetch("/api/spotify-auth");
      if (!response.ok) {
        throw new Error("Failed to fetch authorization URL");
      }
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No authorization URL received");
      }
    } catch (error) {
      console.error("Error during Spotify connection:", error);
      setError("Failed to connect to Spotify. Please try again.");
    }
  };

  const handlePlay = async (trackUri: string) => {
    try {
      await playTrack(trackUri);
      setCurrentlyPlaying(trackUri);
    } catch (error) {
      console.error("Error playing track:", error);
      setError("Failed to play track. Please try again.");
    }
  };

  const handlePause = async () => {
    try {
      await pausePlayback();
      setCurrentlyPlaying(null);
    } catch (error) {
      console.error("Error pausing playback:", error);
      setError("Failed to pause playback. Please try again.");
    }
  };

  const handlePreferencesChange = (newPreferences: UserPreferencesType) => {
    setUserPreferences(newPreferences);
    localStorage.setItem("userPreferences", JSON.stringify(newPreferences));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-green-300">
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

        {error && (
          <div className="bg-red-800 text-white p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-green-700">
          <LocationInput onLocationUpdate={handleLocationUpdate} />
        </div>

        <div className="mb-6">
          <UserPreferences onPreferencesChange={handlePreferencesChange} />
        </div>

        {isLoading ? (
          <div className="text-green-400 text-center">Loading data...</div>
        ) : weatherData ? (
          <>
            <WeatherDisplay weather={weatherData} />
            {isSpotifyConnected ? (
              <MusicRecommendation />
            ) : (
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-green-700 text-center">
                <h3 className="text-xl font-semibold mb-4 text-green-400">
                  Connect to Spotify for Music Recommendations
                </h3>
                <button
                  onClick={handleSpotifyConnect}
                  className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center justify-center mx-auto"
                >
                  <FaSpotify className="mr-2" /> Connect Spotify
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-green-400 text-center">
            No weather data available
          </div>
        )}
      </main>

      <footer className="bg-gray-900 text-green-300 text-center py-4 mt-12">
        <p>&copy; 2024 VibeCast. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WeatherPage;
