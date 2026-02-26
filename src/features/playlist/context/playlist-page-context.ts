import { createContext, useContext } from "react";
import type { PlaylistModel } from "../model";

// ============================================
// CONTEXT
// ============================================

const PlaylistContext = createContext<PlaylistModel | null>(null);

// ============================================
// PROVIDER EXPORT
// ============================================

export const PlaylistProvider = PlaylistContext.Provider;

// ============================================
// BASE HOOK
// ============================================

function usePlaylistContext(): PlaylistModel {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error("usePlaylist hooks must be used within PlaylistProvider");
  }
  return context;
}

// ============================================
// GRANULAR HOOKS
// ============================================

/**
 * Get playlist profile data (uri, name, description, isPublic, followers, following)
 */
export function usePlaylistProfile() {
  return usePlaylistContext().profile;
}

/**
 * Get playlist owner information
 */
export function usePlaylistOwner() {
  return usePlaylistContext().owner;
}

/**
 * Get playlist cover image
 */
export function usePlaylistCoverImage() {
  return usePlaylistContext().coverImage;
}

/**
 * Get visual identity (extracted color sets)
 */
export function usePlaylistVisualIdentity() {
  return usePlaylistContext().visualIdentity;
}

/**
 * Get playlist statistics (totalTracks, totalDuration, formattedDuration)
 */
export function usePlaylistStats() {
  return usePlaylistContext().stats;
}

/**
 * Get all playlist tracks
 */
export function usePlaylistTracks() {
  return usePlaylistContext().tracks;
}

/**
 * Get sharing info
 */
export function usePlaylistSharingInfo() {
  return usePlaylistContext().sharingInfo;
}

/**
 * Get watch feed entrypoint
 */
export function usePlaylistWatchFeedEntrypoint() {
  return usePlaylistContext().watchFeedEntrypoint;
}

/**
 * Get full playlist model (use sparingly, prefer granular hooks)
 */
export function usePlaylist() {
  return usePlaylistContext();
}
