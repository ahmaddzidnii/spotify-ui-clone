import type {
  AlbumInfo,
  AlbumCopyright,
  AlbumPlayability,
  AlbumSharingInfo,
  AlbumArtist,
  AlbumCoverArt,
  AlbumVisualIdentity,
  AlbumDisc,
} from "./info.model";
import type { Track, AlbumWatchFeed, MoreAlbumsByArtist } from "./content.model";

/**
 * Main Album Model
 * Represents the complete normalized album data structure
 */
export interface AlbumModel {
  info: AlbumInfo;
  copyright: AlbumCopyright[];
  playability: AlbumPlayability;
  sharingInfo: AlbumSharingInfo;
  artists: AlbumArtist[];
  coverArt: AlbumCoverArt;
  visualIdentity: AlbumVisualIdentity;
  discs: AlbumDisc[];
  tracks: Track[];
  isSaved: boolean;
  watchFeedEntrypoint: AlbumWatchFeed | null;
  moreAlbumsByArtist: MoreAlbumsByArtist;
}
