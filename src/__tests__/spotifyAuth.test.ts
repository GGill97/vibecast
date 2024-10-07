import { getSpotifyAuthUrl } from "@/utils/spotify";

describe("Spotify Authentication", () => {
  test("generates correct auth URL", () => {
    const url = getSpotifyAuthUrl();
    expect(url).toContain("https://accounts.spotify.com/authorize");
    expect(url).toContain("client_id=");
    expect(url).toContain("redirect_uri=");
    expect(url).toContain("response_type=code");
  });
});



// If the getSpotifyAuthUrl function generates a correct Spotify authorization URL
// If the URL contains necessary parameters like client_id, redirect_uri, and response_type