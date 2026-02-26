import type { ImageSource, ColorRGBA, ReleaseDate } from "./shared.types";

/**
 * Album metadata and information models
 */

export interface AlbumInfo {
  id: string;
  uri: string;
  path: string;
  name: string;
  type: string;
  label: string;
  courtesyLine: string;
  releaseDate: ReleaseDate;
  isPreRelease: boolean;
  preReleaseEndDateTime: string | null;
  totalTracks: number;
}

export interface AlbumCopyright {
  text: string;
  type: string;
}

export interface AlbumPlayability {
  playable: boolean;
  reason: string;
}

export interface AlbumSharingInfo {
  shareId: string;
  shareUrl: string;
}

export interface AlbumArtist {
  id: string;
  uri: string;
  path: string;
  name: string;
  avatarUrl: string;
  avatarSources: ImageSource[];
  sharingInfo: {
    shareUrl: string;
  };
}

export interface AlbumCoverArt {
  url: string;
  sources: ImageSource[];
  extractedColors: {
    colorDark: string;
    colorLight: string;
    colorRaw: string;
  };
}

export interface ColorTheme {
  backgroundBase: ColorRGBA;
  backgroundTintedBase: ColorRGBA;
  textBase: ColorRGBA;
  textBrightAccent: ColorRGBA;
  textSubdued: ColorRGBA;
}

export interface AlbumVisualIdentity {
  extractedColorSet: {
    highContrast: ColorTheme;
    higherContrast: ColorTheme;
    minContrast: ColorTheme;
    encoreBaseSetTextColor: ColorRGBA;
  };
}

export interface AlbumDisc {
  number: number;
  totalTracks: number;
}
