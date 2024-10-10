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
    return NextResponse.redirect(new URL(`/?error=${error}`, request.url));
  }

  if (!code) {
    console.error("No code provided by Spotify");
    return NextResponse.redirect(new URL("/?error=no_code", request.url));
  }

  try {
    console.log("Attempting to exchange code for tokens");
    const data = await spotifyApi.authorizationCodeGrant(code);
    console.log("Token exchange successful");

    const { access_token, refresh_token, expires_in } = data.body;

    // Set tokens in cookies
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set("spotifyAccessToken", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expires_in,
      sameSite: "strict",
    });

    // Add this new cookie for client-side detection of Spotify connection
    response.cookies.set("spotifyConnected", "true", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: expires_in,
      sameSite: "strict",
    });

    await setTokens(access_token, refresh_token, expires_in);

    return response;
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    return NextResponse.redirect(
      new URL("/?error=token_exchange", request.url)
    );
  }
}
