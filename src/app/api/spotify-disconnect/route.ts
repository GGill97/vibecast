import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const response = NextResponse.json({ message: "Disconnected from Spotify" });

  // Clear the Spotify-related cookies
  response.cookies.set("spotifyAccessToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    sameSite: "strict",
  });

  response.cookies.set("spotifyConnected", "", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    sameSite: "strict",
  });

  return response;
}
