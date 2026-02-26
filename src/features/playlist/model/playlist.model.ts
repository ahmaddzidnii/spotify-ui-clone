import type { PlaylistProfile, PlaylistOwner, PlaylistCoverImage, PlaylistVisualIdentity, PlaylistStats } from "./profile.model";
import type { PlaylistTrack } from "./content.model";

export interface PlaylistModel {
  profile: PlaylistProfile;
  owner: PlaylistOwner;
  coverImage: PlaylistCoverImage;
  visualIdentity: PlaylistVisualIdentity;
  stats: PlaylistStats;
  tracks: PlaylistTrack[];
  sharingInfo: {
    shareId: string;
    shareUrl: string;
  };
  watchFeedEntrypoint: {
    uri: string;
    thumbnailUrl: string;
  };
}
