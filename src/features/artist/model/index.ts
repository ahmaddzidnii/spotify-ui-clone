/**
 * Barrel export for artist models
 * This provides a clean public API for the model layer
 */

// Import all types first
import type { ImageSource, ColorRGBA, ReleaseDate } from "./shared.types";
import type { ArtistProfile, ArtistStats, ColorTheme, ArtistVisualIdentity } from "./profile.model";
import type { TrackArtist, TrackAlbum, Track, AlbumRelease, Discography } from "./content.model";
import type { ArtistPick, RelatedArtist, Playlist, MusicVideo, RelatedContent } from "./social.model";
import type { ArtistCardData, AlbumCardData, TrackRowData } from "./ui.model";

// Re-export all types
export type {
  // Shared
  ImageSource,
  ColorRGBA,
  ReleaseDate,
  // Profile
  ArtistProfile,
  ArtistStats,
  ColorTheme,
  ArtistVisualIdentity,
  // Content
  TrackArtist,
  TrackAlbum,
  Track,
  AlbumRelease,
  Discography,
  // Social
  ArtistPick,
  RelatedArtist,
  Playlist,
  MusicVideo,
  RelatedContent,
  // UI
  ArtistCardData,
  AlbumCardData,
  TrackRowData,
};

export type { ArtistModel } from "./artist.model";
