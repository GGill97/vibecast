import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WeatherDisplay from "../components/WeatherDisplay";

describe("Weather Component", () => {
  test("renders weather input", () => {
    render(<WeatherDisplay />);
    const input = screen.getByPlaceholderText("Enter city name");
    expect(input).toBeInTheDocument();
  });

  test("updates on input change", () => {
    render(<WeatherDisplay />);
    const input = screen.getByPlaceholderText("Enter city name");
    fireEvent.change(input, { target: { value: "London" } });
    expect(input).toHaveValue("London");
  });
});


// Rendering the weather input field correctly
// Updating the input value when a user types in a city name
// Possibly checking if weather information is displayed (though this wasn't shown in the earlier errors)