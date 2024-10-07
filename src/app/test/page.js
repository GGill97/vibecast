export default function Test() {
  return (
    <div>
      <h1>Environment Variable Test</h1>
      <p>
        NEXT_PUBLIC_SPOTIFY_CLIENT_ID:{" "}
        {process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}
      </p>
    </div>
  );
}
