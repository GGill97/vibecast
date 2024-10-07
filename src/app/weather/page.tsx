"use client";
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import LocationInput from "@/components/LocationInput";
import { useAppContext } from "@/context/AppContext";
import { fetchWeatherData } from "@/utils/weatherApi";

const WeatherPage: React.FC = () => {
  const { weatherData, setWeatherData, userLocation, isLoading, setIsLoading } =
    useAppContext();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWeatherData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchWeatherData(userLocation);
        setWeatherData(data);
      } catch (error) {
        console.error("Failed to fetch weather data", error);
        setError("Failed to fetch weather data. Please try again.");
        // Handle error (e.g., show error message to user)
      } finally {
        setIsLoading(false);
      }
    };
    if (userLocation) getWeatherData();
  }, [userLocation, setWeatherData, setIsLoading, setError]);

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-cyan-700">
          Weather Information
        </h1>

        <LocationInput />
        {error && <div className="text-red-500 mb-4"> {error}</div>}
        {isLoading ? (
          <div>Loading weather data...</div>
        ) : weatherData ? (
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">{weatherData.location}</h2>
              <p className="text-gray-500 text-sm">Last updated: Just now</p>
            </div>
            <div className="flex items-center mb-6">
              <span className="text-5xl font-bold mr-4">
                {weatherData.temperature}°F
              </span>
              <span className="text-xl">{weatherData.condition}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p>Humidity: {weatherData.humidity}%</p>
                <p>Wind: {weatherData.windSpeed} mph</p>
              </div>
              <div>
                <p>Feels like: {weatherData.feelsLike}°F</p>
              </div>
            </div>
          </div>
        ) : (
          <div>No weather data available</div>
        )}
      </div>
    </Layout>
  );
};

export default WeatherPage;

//             {/* 5-Day Forecast Section */}
//             <div className="bg-white shadow-md rounded-lg p-6">
//               <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
//               <div className="grid grid-cols-7 gap-6 text-center">
//                 {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
//                   (day) => (
//                     <div key={day} className="p-2">
//                       <p className="font-semibold">{day}</p>
//                       <p className="text-2xl my-2">🌤️</p>
//                       <p className="text-sm">75°F</p>
//                     </div>
//                   )
//                 )}
//               </div>
//             </div>
//           </>

//           <p>Loading weather data...</p>
//     </Layout>
//   );
// };

// export default WeatherPage;
