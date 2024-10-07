import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { getRecommendations } from "@/utils/spotify";

interface Song {
  name: string;
  artist: string;
  albumCover: string;
}

const MusicRecommendation: React.FC = () => {
  const { weatherData } = useAppContext();
  const [recommendations, setRecommendations] = useState<Song[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getRecommendations("pop"); // Just to check if we're authenticated
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (weatherData && isAuthenticated) {
      const mood = weatherToMood(weatherData.condition);
      getRecommendations(mood).then(setRecommendations);
    }
  }, [weatherData, isAuthenticated]);

  const weatherToMood = (condition: string): string => {
    if (condition.includes("clear")) return "happy";
    if (condition.includes("rain")) return "melancholy";
    return "pop"; // default
  };

  const handleLogin = async () => {
    console.log("Attempting to connect to Spotify");
    try {
      console.log("Fetching Spotify auth URL...");
      const response = await fetch("/api/spotify-auth");
      console.log(
        "Spotify auth Response status:",
        response.status,
        response.statusText
      );
      if (!response.ok) {
        throw new Error("Failed to fetch authorization URL");
      }
      const data = await response.json();
      console.log("Received data:", data);
      if (data.url) {
        console.log("Redirecting to:", data.url);
        window.location.href = data.url;
      } else {
        throw new Error("No authorization URL received");
      }
    } catch (error) {
      console.error("Error during Spotify login:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-600">
          Music Recommendations
        </h2>
        <p className="mb-4">
          Connect to Spotify to get personalized recommendations
        </p>
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Connect Spotify
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-cyan-600">
        Music Recommendations
      </h2>
      {weatherData && (
        <p className="mb-4">
          Based on the current weather: {weatherData.condition}
        </p>
      )}
      <ul className="space-y-4">
        {recommendations.map((song, index) => (
          <li key={index} className="flex items-center space-x-4">
            <img
              src={song.albumCover}
              alt={song.name}
              className="w-16 h-16 rounded"
            />
            <div>
              <p className="font-semibold">{song.name}</p>
              <p className="text-sm text-gray-600">{song.artist}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusicRecommendation;

// This component is responsible for displaying music recommendations.
// It likely interacts with the Spotify API to fetch and display recommendations.
