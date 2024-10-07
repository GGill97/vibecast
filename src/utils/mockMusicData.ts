export interface Song {
  title: string;
  artist: string;
  mood: string;
}

export const mockSongs: Song[] = [
  {
    title: "Walking on Sunshine",
    artist: "Katrina and The Waves",
    mood: "Sunny",
  },
  { title: "Umbrella", artist: "Rihanna", mood: "Rainy" },
  { title: "Riders on the Storm", artist: "The Doors", mood: "Stormy" },
  { title: "Let It Snow", artist: "Dean Martin", mood: "Snowy" },
  { title: "Hot in Herre", artist: "Nelly", mood: "Hot" },
  { title: "Cold as Ice", artist: "Foreigner", mood: "Cold" },
  { title: "Blowin' in the Wind", artist: "Bob Dylan", mood: "Windy" },
  { title: "Here Comes the Sun", artist: "The Beatles", mood: "Sunny" },
  { title: "Singing in the Rain", artist: "Gene Kelly", mood: "Rainy" },
  { title: "Thunderstruck", artist: "AC/DC", mood: "Stormy" },
];

export function getMusicRecommendations(weather: string): Song[] {
  return mockSongs
    .filter((song) => song.mood.toLowerCase() === weather.toLowerCase())
    .slice(0, 5);
}
