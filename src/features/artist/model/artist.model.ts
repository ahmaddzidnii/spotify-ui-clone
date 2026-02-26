import type { Discography } from "./content.model";
import type { ImageSource } from "./shared.types";
import type { ArtistPick, MusicVideo, RelatedContent } from "./social.model";
import type { ArtistProfile, ArtistStats, ArtistVisualIdentity } from "./profile.model";

export interface ArtistModel {
  profile: ArtistProfile;
  stats: ArtistStats;
  visualIdentity: ArtistVisualIdentity;
  headerImage: {
    images: ImageSource[];
    dominantColor?: string;
  };
  discography: Discography;
  artistPick: ArtistPick | null;
  relatedContent: RelatedContent;
  hasMusicVideo: boolean;
  musicVideos: MusicVideo[];
  watchFeedEntrypoint: {
    uri: string;
    path: string;
    thumbnailImage: string;
  };
  isSaved: boolean;
  sharingInfo: {
    shareId: string;
    shareUrl: string;
  };
}
