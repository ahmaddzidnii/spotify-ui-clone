const ALBUM_TYPE_MAP = {
  ALBUM: "Album",
  SINGLE: "Single",
  EP: "EP",
} as const;

export const transformAlbumType = (album: string) => ALBUM_TYPE_MAP[album as keyof typeof ALBUM_TYPE_MAP] ?? "Unknown";
