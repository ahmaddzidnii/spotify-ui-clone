/**
 * Barrel export for album models
 * This provides a clean public API for the model layer
 */

// Import all types first
import type { ImageSource, ColorRGBA, ReleaseDate } from "./shared.types";
import type {
  AlbumInfo,
  AlbumCopyright,
  AlbumPlayability,
  AlbumSharingInfo,
  AlbumArtist,
  AlbumCoverArt,
  AlbumVisualIdentity,
  AlbumDisc,
  ColorTheme,
} from "./info.model";
import type { TrackArtist, Track, AlbumWatchFeed, MoreAlbumsByArtist } from "./content.model";
import type { AlbumRelease } from "./releases.model";

// Re-export all types
export type {
  // Shared
  ImageSource,
  ColorRGBA,
  ReleaseDate,
  // Info
  AlbumInfo,
  AlbumCopyright,
  AlbumPlayability,
  AlbumSharingInfo,
  AlbumArtist,
  AlbumCoverArt,
  AlbumVisualIdentity,
  AlbumDisc,
  ColorTheme,
  // Content
  TrackArtist,
  Track,
  AlbumWatchFeed,
  MoreAlbumsByArtist,
  // Releases
  AlbumRelease,
};

export type { AlbumModel } from "./album.model";
