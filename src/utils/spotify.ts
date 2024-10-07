import SpotifyWebApi from "spotify-web-api-node";

console.log(
  "NEXT_PUBLIC_SPOTIFY_CLIENT_ID:",
  process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ? "Set" : "Not set"
);
console.log(
  "SPOTIFY_CLIENT_SECRET:",
  process.env.SPOTIFY_CLIENT_SECRET ? "Set" : "Not set"
);

if (!process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID) {
  console.error("Missing NEXT_PUBLIC_SPOTIFY_CLIENT_ID in environment");
  throw new Error("Missing NEXT_PUBLIC_SPOTIFY_CLIENT_ID");
}

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: "http://localhost:3000/api/spotify-callback",
});

console.log(
  "SpotifyWebApi instance created with redirect URI:",
  spotifyApi.getRedirectURI()
);

let accessToken: string | null = null;
let refreshToken: string | null = null;
let expirationTime: number | null = null;

export function getSpotifyAuthUrl(): string {
  const scopes = ["user-read-private", "user-read-email", "user-top-read"];
  return spotifyApi.createAuthorizeURL(scopes, "state");
}

export async function setTokens(
  access: string,
  refresh: string,
  expiresIn: number
) {
  accessToken = access;
  refreshToken = refresh;
  expirationTime = Date.now() + expiresIn * 1000;
  spotifyApi.setAccessToken(access);
  spotifyApi.setRefreshToken(refresh);
}

async function refreshAccessToken() {
  if (!refreshToken) throw new Error("No refresh token available");

  const data = await spotifyApi.refreshAccessToken();
  await setTokens(
    data.body["access_token"],
    refreshToken,
    data.body["expires_in"]
  );
}

export async function getValidToken() {
  if (!accessToken || !expirationTime) throw new Error("Not authenticated");

  if (Date.now() > expirationTime) {
    await refreshAccessToken();
  }

  return accessToken;
}

export async function getRecommendations(mood: string) {
  await getValidToken();

  try {
    const response = await spotifyApi.getRecommendations({
      seed_genres: [mood],
      limit: 5,
    });

    return response.body.tracks.map((track) => ({
      name: track.name,
      artist: track.artists[0].name,
      albumCover: track.album.images[0].url,
    }));
  } catch (error) {
    console.error("Error getting Spotify recommendations:", error);
    return [];
  }
}

export { spotifyApi };
