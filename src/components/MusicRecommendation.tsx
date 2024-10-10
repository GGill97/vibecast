import React, { useEffect, useState } from "react";
import { FaSpotify, FaMusic } from "react-icons/fa";

interface Song {
  name: string;
  artist: string;
  albumCover: string;
}

interface MusicRecommendationProps {
  weatherCondition?: string;
  isSpotifyConnected: boolean;
}

const MusicRecommendation: React.FC<MusicRecommendationProps> = ({
  weatherCondition,
  isSpotifyConnected,
}) => {
  const [recommendations, setRecommendations] = useState<Song[]>([]);

  useEffect(() => {
    if (weatherCondition && isSpotifyConnected) {
      const mood = weatherToMood(weatherCondition);
      // Replace this with actual API call to get recommendations
      setRecommendations([
        {
          name: "Autumn Leaves",
          artist: "Ed Sheeran",
          albumCover: "https://example.com/cover1.jpg",
        },
        {
          name: "September",
          artist: "Earth, Wind & Fire",
          albumCover: "https://example.com/cover2.jpg",
        },
        // Add more mock recommendations
      ]);
    }
  }, [weatherCondition, isSpotifyConnected]);

  const weatherToMood = (condition: string): string => {
    if (condition.toLowerCase().includes("clear")) return "happy";
    if (condition.toLowerCase().includes("rain")) return "melancholy";
    return "pop"; // default
  };

  const handleLogin = async () => {
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
      console.error("Error during Spotify login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/spotify-disconnect");
      if (response.ok) {
        window.location.reload(); // Reload the page to reset the state
      } else {
        throw new Error("Failed to disconnect from Spotify");
      }
    } catch (error) {
      console.error("Error during Spotify logout:", error);
    }
  };

  if (!isSpotifyConnected) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mt-6 border border-green-700">
        <h2 className="text-2xl font-semibold mb-4 text-green-400 flex items-center">
          <FaMusic className="mr-2" /> Music Recommendations
        </h2>
        <p className="mb-4 text-gray-300">
          Connect to Spotify to get personalized fall-themed recommendations
        </p>
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center"
        >
          <FaSpotify className="mr-2" /> Connect Spotify
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mt-6 border border-green-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-green-400 flex items-center">
          <FaMusic className="mr-2" /> Music Recommendations
        </h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center"
        >
          Disconnect Spotify
        </button>
      </div>
      {weatherCondition && (
        <p className="mb-4 text-gray-300">
          Fall vibes based on the current weather: {weatherCondition}
        </p>
      )}
      <ul className="space-y-4">
        {recommendations.map((song, index) => (
          <li
            key={index}
            className="flex items-center space-x-4 bg-gray-700 p-3 rounded-lg"
          >
            <img
              src={song.albumCover}
              alt={song.name}
              className="w-16 h-16 rounded-md"
            />
            <div>
              <p className="font-semibold text-white">{song.name}</p>
              <p className="text-sm text-gray-400">{song.artist}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusicRecommendation;
