"use client";
import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";

const LocationInput: React.FC = () => {
  const { setUserLocation } = useAppContext();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setUserLocation(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter city name"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-cyan-500 text-white rounded-r-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default LocationInput;


// This is probably a form component for users to input their location.
// It might trigger weather fetching based on the entered location.