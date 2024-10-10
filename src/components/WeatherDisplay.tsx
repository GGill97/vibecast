import React from "react";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
}

const WeatherDisplay: React.FC<{ weather: WeatherData | null }> = ({
  weather,
}) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <WiDaySunny className="text-yellow-500" size={64} />;
      case "clouds":
        return <WiCloudy className="text-gray-400" size={64} />;
      case "rain":
        return <WiRain className="text-blue-400" size={64} />;
      case "snow":
        return <WiSnow className="text-white" size={64} />;
      case "thunderstorm":
        return <WiThunderstorm className="text-yellow-300" size={64} />;
      default:
        return <WiDaySunny className="text-yellow-500" size={64} />;
    }
  };

  const convertToFahrenheit = (celsius: number) => (celsius * 9) / 5 + 32;

  const getSeasonMessage = (temperatureF: number) => {
    if (temperatureF >= 75 && temperatureF <= 140) {
      return "Feels like summer!";
    } else if (temperatureF >= 50 && temperatureF <= 75) {
      return "Feels like spring!";
    } else if (temperatureF >= 30 && temperatureF <= 50) {
    } else {
      return "Feels like Fall!";
    }
  };

  if (!weather) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 animate-pulse border border-green-700">
        <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-16 bg-gray-700 rounded w-1/2"></div>
      </div>
    );
  }

  const temperatureF = convertToFahrenheit(weather.temperature);
  const seasonMessage = getSeasonMessage(temperatureF);
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-green-700">
      <h2 className="text-2xl font-bold mb-4 text-green-400">
        Current Weather in {weather.location}
      </h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {getWeatherIcon(weather.condition)}
          <div className="ml-4">
            <p className="text-4xl font-semibold text-white">
              {Math.round(weather.temperature)}°C
            </p>
            <p className="text-xl text-gray-400">
              {Math.round(convertToFahrenheit(weather.temperature))}°F
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-medium text-green-400">
            {weather.condition}
          </p>
          <p className="text-lg text-gray-400">{seasonMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
