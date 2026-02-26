/**
 * UI-specific Data Transfer Objects (DTOs)
 * These are view models optimized for specific UI components
 */

export interface ArtistCardData {
  id: string;
  uri: string;
  path: string;
  name: string;
  avatarUrl: string;
  verified?: boolean;
}

export interface AlbumCardData {
  id: string;
  uri: string;
  path: string;
  name: string;
  coverUrl: string;
  releaseYear: number;
  type: string;
}

/**
 * Minimal track data for table-row rendering
 */
export interface TrackRowData {
  id: string;
  uri: string;
  path: string;
  name: string;
  coverUrl: string;
  duration: number;
  playcount: string;
  isSaved?: boolean;
  hasMusicVideo?: boolean;
}
