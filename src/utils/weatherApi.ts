import axios from "axios";
//axios - javascript lib. used for making HTTP request.allows one to communicate with api, send data to a server or retreieve data from a server.
// const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
// const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  icon: string;
}
//interface here the blueprint that defines the structure of an object.
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
      icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}
//this file defines the structure of weather data and provides a function to fetch it from your API.
