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

export const savedPlaylists: Playlist[] = [
  {
    id: "1",
    title: "Ngodingh",
    type: "playlist",
    coverImage:
      "https://mosaic.scdn.co/300/ab67616d00001e020f94886d67ae4e92a92b2281ab67616d00001e02ab85980da8a5c59d26309a6fab67616d00001e02c5b4a9d8fdc63b9562a4d280ab67616d00001e02f6ce264866ac7fa1664b4db4",
    subtitle: "Playlist",
  },
  {
    id: "1",
    title: "Scroll Fesnuk",
    type: "playlist",
    coverImage:
      "https://mosaic.scdn.co/300/ab67616d00001e020f94886d67ae4e92a92b2281ab67616d00001e02ab85980da8a5c59d26309a6fab67616d00001e02c5b4a9d8fdc63b9562a4d280ab67616d00001e02f6ce264866ac7fa1664b4db4",
    subtitle: "Playlist",
  },
];
