import type { ImageSource, ColorTheme } from "./shared.types";

export interface PlaylistProfile {
  uri: string;
  name: string;
  description: string;
  isPublic: boolean;
  followers: number;
  following: boolean;
}

export interface PlaylistOwner {
  uri: string;
  path: string;
  name: string;
  username: string;
}

export interface PlaylistCoverImage {
  url: string;
  sources: ImageSource[];
}

export interface PlaylistVisualIdentity {
  extractedColorSet: {
    highContrast: ColorTheme;
    higherContrast: ColorTheme;
    minContrast: ColorTheme;
  };
}

export interface PlaylistStats {
  totalTracks: number;
  totalDuration: number;
  formattedDuration: string;
}
