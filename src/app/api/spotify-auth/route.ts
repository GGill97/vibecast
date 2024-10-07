import { NextResponse } from "next/server";
import { spotifyApi } from "@/utils/spotify";

export async function GET(req: Request) {
  console.log(
    "Spotify Auth Route - Client ID:",
    process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
  );
  console.log(
    "Spotify Auth Route - Redirect URI:",
    spotifyApi?.getRedirectURI() || "Redirect URI not available"
  );
  console.log(
    "Spotify Auth Route - Client Secret:",
    process.env.SPOTIFY_CLIENT_SECRET ? "Set" : "Not set"
  );

  try {
    const scopes = ["user-read-private", "user-read-email", "user-top-read"];
    const state = "some-state-of-my-choice";
    const authorizeURL = spotifyApi?.createAuthorizeURL(scopes, state);

    if (!authorizeURL) {
      throw new Error("Failed to create Spotify authorize URL");
    }

    console.log("Generated Spotify URL:", authorizeURL);
    return NextResponse.json({ url: authorizeURL });
  } catch (error) {
    console.error("Error creating Spotify authorize URL:", error);
    return NextResponse.json(
      { error: "Failed to create Spotify authorize URL" },
      { status: 500 }
    );
  }
}
