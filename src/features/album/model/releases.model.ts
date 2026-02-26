import type { ImageSource } from "./shared.types";

/**
 * Album releases and related albums models
 */

export interface AlbumRelease {
  id: string;
  uri: string;
  path: string;
  name: string;
  type: string;
  coverUrl: string;
  coverSources: ImageSource[];
  releaseYear: number;
  isPlayable: boolean;
  sharingInfo: {
    shareId: string;
    shareUrl: string;
  };
}
