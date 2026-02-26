/**
 * Shared types yang digunakan di berbagai domain model
 */

export interface ImageSource {
  url: string;
  width?: number;
  height?: number;
}

export interface ColorRGBA {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export interface ReleaseDate {
  day?: number;
  month?: number;
  year: number;
  precision?: "DAY" | "MONTH" | "YEAR";
}
