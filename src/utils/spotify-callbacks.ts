import { NextApiRequest, NextApiResponse } from "next";
import { spotifyApi, setTokens } from "@/utils/spotify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;

  try {
    const data = await spotifyApi.authorizationCodeGrant(code as string);

    await setTokens(
      data.body["access_token"],
      data.body["refresh_token"],
      data.body["expires_in"]
    );

    res.redirect("/");
  } catch (error) {
    console.error("Error in Spotify callback:", error);
    res.status(500).json({ error: "Failed to authenticate with Spotify" });
  }
}
