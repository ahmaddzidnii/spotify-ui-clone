import { createContext, useContext } from "react";
import type { ArtistModel } from "../model/artist.model";

// ============================================
// CONTEXT
// ============================================

const ArtistContext = createContext<ArtistModel | null>(null);

// ============================================
// PROVIDER EXPORT
// ============================================

export const ArtistProvider = ArtistContext.Provider;

// ============================================
// BASE HOOK
// ============================================

function useArtistContext(): ArtistModel {
  const context = useContext(ArtistContext);
  if (!context) {
    throw new Error("useArtist hooks must be used within ArtistProvider");
  }
  return context;
}

// ============================================
// GRANULAR HOOKS
// ============================================

/**
 * Get artist profile data (id, uri, name, verified, biography, avatar)
 */
export function useArtistProfile() {
  return useArtistContext().profile;
}

/**
 * Get artist stats (followers, monthly listeners, world rank, top cities)
 */
export function useArtistStats() {
  return useArtistContext().stats;
}

/**
 * Get visual identity (extracted color sets)
 */
export function useArtistVisualIdentity() {
  return useArtistContext().visualIdentity;
}

/**
 * Get header image data
 */
export function useArtistHeaderImage() {
  return useArtistContext().headerImage;
}

/**
 * Get complete discography (topTracks, latest, popularReleases, albums, singles, compilations)
 */
export function useArtistDiscography() {
  return useArtistContext().discography;
}

/**
 * Get only top tracks
 */
export function useArtistTopTracks() {
  return useArtistContext().discography.topTracks;
}

/**
 * Get popular releases
 */
export function useArtistPopularReleases() {
  return useArtistContext().discography.popularReleases;
}

/**
 * Get all albums
 */
export function useArtistAlbums() {
  return useArtistContext().discography.albums;
}

/**
 * Get singles and EPs
 */
export function useArtistSinglesAndEPs() {
  return useArtistContext().discography.singlesAndEPs;
}

/**
 * Get artist pick / pinned item
 */
export function useArtistPick() {
  return useArtistContext().artistPick;
}

/**
 * Get related content (relatedArtists, featuring playlists, discovered on, appears on)
 */
export function useArtistRelatedContent() {
  return useArtistContext().relatedContent;
}

/**
 * Get featuring playlists only
 */
export function useArtistFeaturingPlaylists() {
  return useArtistContext().relatedContent.featuringPlaylists;
}

/**
 * Get related artists only
 */
export function useRelatedArtists() {
  return useArtistContext().relatedContent.relatedArtists;
}

/**
 * Get appears on releases only
 */
export function useAppearsOnReleases() {
  return useArtistContext().relatedContent.appearsOnReleases;
}

/**
 * Get music videos data
 */
export function useArtistMusicVideos() {
  return {
    hasMusicVideo: useArtistContext().hasMusicVideo,
    musicVideos: useArtistContext().musicVideos,
  };
}

/**
 * Get sharing info
 */
export function useArtistSharingInfo() {
  return useArtistContext().sharingInfo;
}

/**
 * Check if artist is saved
 */
export function useIsArtistSaved() {
  return useArtistContext().isSaved;
}

/**
 * Get full artist model (use sparingly, prefer granular hooks)
 */
export function useArtist() {
  return useArtistContext();
}
