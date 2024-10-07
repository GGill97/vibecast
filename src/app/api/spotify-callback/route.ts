import { NextResponse, NextRequest } from "next/server";
import { spotifyApi, setTokens } from "@/utils/spotify";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  console.log("Spotify Callback - Received code:", code ? "Yes" : "No");
  console.log("Spotify Callback - Received error:", error);
  if (error) {
    console.error("Error from Spotify:", error);
    return NextResponse.redirect(new URL("/?error=" + error, request.url));
  }
  if (!code) {
    console.error("No code provided by Spotify");
    return NextResponse.redirect(new URL("/?error=no_code", request.url));
  }

  try {
    console.log("Attempting to exchange code for tokens");
    const data = await spotifyApi.authorizationCodeGrant(code);
    console.log("Token exchange successful");

    await setTokens(
      data.body["access_token"],
      data.body["refresh_token"],
      data.body["expires_in"]
    );

    // Redirect to the home page or a success page
    return NextResponse.redirect(new URL("/success", request.url));
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    return NextResponse.redirect(
      new URL("/?error=token_exchange", request.url)
    );
    {
      error: "Failed to authenticate with Spotify";
    }
    {
      status: 500;
    }
  }
}
// This handles the callback from Spotify after user authentication.
// It processes the authentication code and exchanges it for access tokens.
