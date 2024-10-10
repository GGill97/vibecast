// src/components/UserPreferences.tsx

import React, { useState, useEffect } from 'react';
import { FaCog } from 'react-icons/fa';

interface UserPreferences {
  preferredGenres: string[];
  weatherMoodOverrides: { [key: string]: string };
}

interface Props {
  onPreferencesChange: (preferences: UserPreferences) => void;
}

const UserPreferences: React.FC<Props> = ({ onPreferencesChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    return savedPreferences ? JSON.parse(savedPreferences) : {
      preferredGenres: [],
      weatherMoodOverrides: {},
    };
  });

  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    onPreferencesChange(preferences);
  }, [preferences, onPreferencesChange]);

  const handleGenreChange = (genre: string) => {
    setPreferences(prev => ({
      ...prev,
      preferredGenres: prev.preferredGenres.includes(genre)
        ? prev.preferredGenres.filter(g => g !== genre)
        : [...prev.preferredGenres, genre],
    }));
  };

  const handleMoodOverrideChange = (weather: string, mood: string) => {
    setPreferences(prev => ({
      ...prev,
      weatherMoodOverrides: {
        ...prev.weatherMoodOverrides,
        [weather]: mood,
      },
    }));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-500 text-white p-2 rounded-full"
      >
        <FaCog />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl p-4">
          <h3 className="text-lg font-semibold mb-2">Preferences</h3>
          <div className="mb-4">
            <h4 className="font-semibold mb-1">Preferred Genres</h4>
            {['Rock', 'Pop', 'Hip-Hop', 'Electronic', 'Classical'].map(genre => (
              <label key={genre} className="block">
                <input
                  type="checkbox"
                  checked={preferences.preferredGenres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                  className="mr-2"
                />
                {genre}
              </label>
            ))}
          </div>
          <div>
            <h4 className="font-semibold mb-1">Weather Mood Overrides</h4>
            {['Clear', 'Clouds', 'Rain', 'Snow'].map(weather => (
              <div key={weather} className="mb-2">
                <label className="block">{weather}:</label>
                <select
                  value={preferences.weatherMoodOverrides[weather] || ''}
                  onChange={(e) => handleMoodOverrideChange(weather, e.target.value)}
                  className="w-full bg-gray-700 text-white rounded p-1"
                >
                  <option value="">Default</option>
                  <option value="happy">Happy</option>
                  <option value="mellow">Mellow</option>
                  <option value="energetic">Energetic</option>
                  <option value="calm">Calm</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPreferences;