const ALBUM_TYPE_MAP = {
  ALBUM: "Album",
  SINGLE: "Single",
  EP: "EP",
} as const;

export const transformAlbumType = (album: string) => ALBUM_TYPE_MAP[album as keyof typeof ALBUM_TYPE_MAP] ?? "Unknown";

const SYMBOL_TYPE_MAP = {
  C: "©",
  P: "℗",
} as const;

export const transformCopyrightType = (type: string) => SYMBOL_TYPE_MAP[type as keyof typeof SYMBOL_TYPE_MAP] ?? type;
