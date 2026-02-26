import ngodinghPlaylist from "@/data/raw/playlist-overview/ngodingh.json";
import scrollFesnukPlaylist from "@/data/raw/playlist-overview/scroll-fesnuk.json";

import type { PlaylistAPIContract } from "./playlist.types";

export const playlists: Record<string, PlaylistAPIContract> = {
  "spotify:playlist:5lF6ZtkLPr7acwFD973CCp": ngodinghPlaylist as unknown as PlaylistAPIContract,
  "spotify:playlist:3fN3Kgy4kxLLtpFyfSDcuB": scrollFesnukPlaylist as unknown as PlaylistAPIContract,
};

export const getPlaylistById = (uri: string) => {
  return playlists[uri as keyof typeof playlists] ?? null;
};
