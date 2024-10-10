import { redirect } from "next/dist/server/api-utils";
import SpotifyWebApi from "spotify-web-api-node";
import { setCookie, parseCookies } from "nookies";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
});

export const setAccessToken = (token: string) => {
  spotifyApi.setAccessToken(token);
};

export const refreshAccessToken = async () => {
  const cookies = parseCookies();
  const refreshToken = cookies.spotifyRefreshToken;

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }
  try {
    const data = await spotifyApi.refreshAccessToken();
    const { access_token, expires_in } = data.body;

    setCookie(null, "spotifyAccessToken", access_token, {
      maxAge: expires_in,
      path: "/",
    });

    spotifyApi.setAccessToken(access_token);
    return access_token;
  } catch (error) {
    console.error("Error refreshing access token:", error);
  }
};
//allows you to search for Spotify playlists based on a search query"chill vibes"
export const searchPlaylists = async (query: string) => {
  try {
    const data = await spotifyApi.searchPlaylists(query);
    return data.body.playlists?.items || [];
  } catch (error) {
    console.error("Error searching playlists:", error);
    return [];
  }
};

interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    images: {
      url: string;
    }[];
  };
}
//fetches the tracks in a specific spotify playlist
export const getPlaylistTracks = async (
  playlistId: string
): Promise<SpotifyTrack[]> => {
  try {
    const data = await spotifyApi.getPlaylistTracks(playlistId);
    return data.body.items.map((item) => item.track as SpotifyTrack);
  } catch (error) {
    console.error("Error getting playlist tracks:", error);
    return [];
  }
};

//spotify can give you track rec. based on certain "seed" tracks
export const getRecommendations = async (
  seedTracks: string[],
  limit: number = 20
) => {
  try {
    const data = await spotifyApi.getRecommendations({
      seed_tracks: seedTracks,
      limit: limit,
    });
    return data.body.tracks;
  } catch (error) {
    console.error("Error getting recommendations:", error);
    return [];
  }
};

//simple mapping object that links different weather conditions
const weatherToMoodMap: { [key: string]: string } = {
  Clear: "happy upbeat",
  Clouds: "mellow chill",
  Rain: "cozy rainy day",
  Snow: "winter wonderland",
  Thunderstorm: "dramatic intense",
  Drizzle: "soft acoustic",
  Mist: "ambient relaxing",
};

// uses the current WeatherCondition to find a matching mood
export const getPlaylistsForWeather = async (weatherCondition: string) => {
  const mood = weatherToMoodMap[weatherCondition] || "random";
  const playlists = await searchPlaylists(`${mood} playlist`);
  return playlists.slice(0, 5); // return top 5 playlists.
};
//uses weathercondition to get a mood and find playlists
export const getTracksForWeather = async (
  weatherCondition: string
): Promise<SpotifyTrack[]> => {
  const playlists = await getPlaylistsForWeather(weatherCondition);
  if (playlists.length === 0) return [];

  const firstPlaylistTracks = await getPlaylistTracks(playlists[0].id);
  const seedTracks = firstPlaylistTracks.slice(0, 5).map((track) => track.id);

  return getRecommendations(seedTracks);
};

export const getPlaybackState = async () => {
  try {
    const data = await spotifyApi.getMyCurrentPlaybackState();
    return data.body;
  } catch (error) {
    console.error("Error getting playback state:", error);
    throw error;
  }
};

export const playTrack = async (trackUri: string) => {
  try {
    await spotifyApi.play({ uris: [trackUri] });
  } catch (error) {
    console.error("Error playing track:", error);
    throw error;
  }
};

export const pausePlayback = async () => {
  try {
    await spotifyApi.pause();
  } catch (error) {
    console.error("Error pausing playback:", error);
    throw error;
  }
};
