export interface ImageSource {
  url: string;
  width?: number;
  height?: number;
}

export interface RGBA {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export interface ColorTheme {
  backgroundBase: RGBA;
  backgroundTintedBase: RGBA;
  textBase: RGBA;
  textBrightAccent: RGBA;
  textSubdued: RGBA;
}
