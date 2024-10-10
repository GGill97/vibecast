import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface LocationInputProps {
  onLocationUpdate: (location: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ onLocationUpdate }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onLocationUpdate(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
      <div className="relative flex-grow">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter city name"
          className="w-full px-4 py-2 bg-gray-700 text-white border border-green-600 rounded-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-green-500 text-lg mb-2 sm:mb-0 placeholder-gray-400"
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <button
        type="submit"
        className="px-6 py-2 bg-green-600 text-white rounded-md sm:rounded-l-none hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg font-semibold transition duration-300"
      >
        Update
      </button>
    </form>
  );
};

export default LocationInput;
