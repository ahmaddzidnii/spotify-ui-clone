import { createContext, useContext } from "react";
import type { AlbumModel } from "../model";

// ============================================
// CONTEXT
// ============================================

const AlbumContext = createContext<AlbumModel | null>(null);

// ============================================
// PROVIDER EXPORT
// ============================================

export const AlbumProvider = AlbumContext.Provider;

// ============================================
// BASE HOOK
// ============================================

function useAlbumContext(): AlbumModel {
  const context = useContext(AlbumContext);
  if (!context) {
    throw new Error("useAlbum hooks must be used within AlbumProvider");
  }
  return context;
}

// ============================================
// GRANULAR HOOKS
// ============================================

/**
 * Get album info (id, uri, name, type, label, release date, etc.)
 */
export function useAlbumInfo() {
  return useAlbumContext().info;
}

/**
 * Get album copyright information
 */
export function useAlbumCopyright() {
  return useAlbumContext().copyright;
}

/**
 * Get album playability status
 */
export function useAlbumPlayability() {
  return useAlbumContext().playability;
}

/**
 * Get album sharing information
 */
export function useAlbumSharingInfo() {
  return useAlbumContext().sharingInfo;
}

/**
 * Get album artists
 */
export function useAlbumArtists() {
  return useAlbumContext().artists;
}

/**
 * Get album cover art and extracted colors
 */
export function useAlbumCoverArt() {
  return useAlbumContext().coverArt;
}

/**
 * Get visual identity (extracted color sets)
 */
export function useAlbumVisualIdentity() {
  return useAlbumContext().visualIdentity;
}

/**
 * Get album discs information
 */
export function useAlbumDiscs() {
  return useAlbumContext().discs;
}

/**
 * Get all tracks in the album
 */
export function useAlbumTracks() {
  return useAlbumContext().tracks;
}

/**
 * Get album saved status
 */
export function useAlbumSavedStatus() {
  return useAlbumContext().isSaved;
}

/**
 * Get watch feed entrypoint (video canvas)
 */
export function useAlbumWatchFeed() {
  return useAlbumContext().watchFeedEntrypoint;
}

/**
 * Get more albums by the same artist
 */
export function useMoreAlbumsByArtist() {
  return useAlbumContext().moreAlbumsByArtist;
}

/**
 * Get the complete album model (use sparingly)
 */
export function useAlbum() {
  return useAlbumContext();
}
