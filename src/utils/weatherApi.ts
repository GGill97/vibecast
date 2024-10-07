import axios from "axios";

// const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
// const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
}

export async function fetchWeatherData(city: string): Promise<WeatherData> {
  try {
    const response = await axios.get(
      `/api/weather?city=${encodeURIComponent(city)}`
    );

    const data = response.data;
    return {
      location: data.name,
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed),
      feelsLike: Math.round(data.main.feels_like),
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}
