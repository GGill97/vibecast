import React, { useState } from "react";

type WeatherDisplayProps = {};
const WeatherDisplay: React.FC<WeatherDisplayProps> = () => {
  const [city, setCity] = useState("");

  return (
    <div className="bg-white shadow-md rounded-lg p-6 transition-all duration-300 hover:shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-cyan-600">
        Current Weather
      </h2>

      <p className="text-gray-600">
        Weather information will be displayed here
      </p>
    </div>
  );
};

export default WeatherDisplay;

// This component handles the display of weather information.
// It might include logic for fetching and formatting weather data.
