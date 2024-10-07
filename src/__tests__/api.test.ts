import { GET as spotifyAuthHandler } from "@/app/api/spotify-auth/route";
import { NextRequest, NextResponse } from "next/server";

jest.mock("@/utils/spotify", () => ({
  __esModule: true,
  default: {
    getRedirectURI: jest
      .fn()
      .mockReturnValue("http://localhost:3000/api/spotify-callback"),
    createAuthorizeURL: jest
      .fn()
      .mockReturnValue("http://fake-spotify-auth-url.com"),
  },
}));

// jest.mock("next/server", () => ({
//   NextResponse: {
//     json: jest.fn().mockImplementation((body) => ({
//       json: async () => body,
//       status: 200,
//     })),
//   },
// }));

describe("Spotify Auth API", () => {
  test("returns Spotify auth URL", async () => {
    const req = { method: "GET" } as NextRequest;

    const response = await spotifyAuthHandler(req);

    expect(response).toBeDefined();
    expect(response.status).toBe(200);

    const responseData = await response.json();
    expect(responseData).toHaveProperty("url");
    expect(responseData.url).toBe("http://fake-spotify-auth-url.com");
  });
});

// If the route correctly generates a Spotify authorization URL
// If the response from the route has the correct structure (including a 'url' property)
// If the route handles environment variables and Spotify API interactions correctly
