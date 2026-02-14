export interface Playlist {
  id: string;
  title: string;
  type: "playlist" | "artist" | "album";
  coverImage: string;
  subtitle?: string;
  isPinned?: boolean;
  songCount?: number;
}

export const likedSongs: Playlist = {
  id: "liked-songs",
  title: "Liked Songs",
  type: "playlist",
  coverImage: "https://i.scdn.co/image/ab6761610000e5eb07189aefe72bf176ecd0b2ab",
  subtitle: "Playlist",
  isPinned: true,
  songCount: 3,
};

const RANDOM_IMAGES = [
  "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8483eb4d87830db91d9d310055",
  "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8418a92d4aefda166310706c10",
  "https://mosaic.scdn.co/300/ab67616d00001e0200f98503376497ab98757f0aab67616d00001e025630e188f3ff752d38f97087ab67616d00001e02be7982704b25a460843a308bab67616d00001e02d67195a1fc32eae4835450ae",
  "https://mosaic.scdn.co/300/ab6761610000e5eb07189aefe72bf176ecd0b2abab67616d00001e025630e188f3ff752d38f97087ab67616d00001e02be7982704b25a460843a308bab67616d00001e02d67195a1fc32eae4835450ae",
];

export const playlists: Playlist[] = Array.from({ length: 20 }, (_, index) => ({
  id: `playlist-${index + 1}`,
  title: `Playlist #${index + 1}`,
  type: "playlist" as const,
  coverImage: RANDOM_IMAGES[index % RANDOM_IMAGES.length],
  subtitle: "ahmaddzidnii",
  isPinned: false,
}));
