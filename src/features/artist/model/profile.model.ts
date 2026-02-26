import type { ImageSource, ColorRGBA } from "./shared.types";

/**
 * Artist profile & identity related models
 */

export interface ArtistProfile {
  id: string;
  uri: string;
  path: string;
  name: string;
  verified: boolean;
  biography?: {
    text: string;
    type: string;
  };
  avatarImage: {
    url: string;
    sources: ImageSource[];
    extractedHex: string;
  };
}

export interface ArtistStats {
  followers: number;
  monthlyListeners: number;
  formatedMonthlyListeners: string;
  worldRank: number;
  topCities: Array<{
    city: string;
    country: string;
    region: string;
    numberOfListeners: number;
  }>;
}

export interface ColorTheme {
  backgroundBase: ColorRGBA;
  backgroundTintedBase: ColorRGBA;
  textBase: ColorRGBA;
  textBrightAccent: ColorRGBA;
  textSubdued: ColorRGBA;
}

export interface ArtistVisualIdentity {
  extractedColorSet: {
    highContrast: ColorTheme;
    higherContrast: ColorTheme;
    minContrast: ColorTheme;
  };
}
