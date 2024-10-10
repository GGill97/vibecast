"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { WeatherData } from "@/utils/weatherApi";

type WeatherInfo = {
  location: string; // like NY
  temperature: number; // a number 65
  condition: string; //"sunny" or "rainy"
  humidity: number;
  windSpeed: number;
  feelsLike: number;

  // add more weather-related fieleds as needed
};
//AppProvider wraps the componenets and provides acess to this data
//AppContextType defines the shape of the data and functinos we want to share:
type AppContextType = {
  weatherData: WeatherData | null;
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherData | null>>;
  userLocation: string;
  setUserLocation: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
const AppContext = createContext<AppContextType | undefined>(undefined);
//AppContext holds the weather and location data
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [userLocation, setUserLocation] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        weatherData,
        setWeatherData,
        userLocation,
        setUserLocation,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
//useAppContext lets any component easily access the conetxt data and functions without passing props manually.
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error(" useAppConext must be used within an AppProvider");
  }
  return context;
};
