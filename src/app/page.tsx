"use client";
import React from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import WeatherDisplay from "@/components/WeatherDisplay";
import MusicRecommendation from "@/components/MusicRecommendation";
import LocationInput from "@/components/LocationInput";

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-cyan-700">
          Welcome to VibeCast
        </h1>
        <LocationInput />
        <WeatherDisplay />
        <MusicRecommendation />
      </div>
    </Layout>
  );
};

export default Home;

// This is the main page component for your application.
// It likely contains the overall layout and combines other components like WeatherDisplay and MusicRecommendation.