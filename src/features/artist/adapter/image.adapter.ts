import type { ImageSource as RawImageSource } from "../data/artist.types";
import type { ImageSource } from "../model";

/**
 * Image transformation utilities
 * Shared across all adapters
 */
export const ImageAdapter = {
  /**
   * Menormalkan format sumber gambar dari respons API mentah.
   */
  mapSources(sources?: RawImageSource[]): ImageSource[] {
    return (sources || []).map((s) => ({
      url: s.url,
      width: s.width ?? undefined,
      height: s.height ?? undefined,
    }));
  },

  /**
   * Mendapatkan URL gambar pertama atau fallback string kosong.
   */
  getFirstUrl(sources?: RawImageSource[]): string {
    return sources?.[0]?.url || "";
  },

  /**
   * Mendapatkan gambar dengan kualitas terbaik berdasarkan width.
   */
  getBestQuality(sources?: RawImageSource[], preferredWidth = 640): string {
    if (!sources?.length) return "";
    const preferred = sources.find((s) => s.width === preferredWidth);
    return preferred?.url || sources[0].url;
  },
};
