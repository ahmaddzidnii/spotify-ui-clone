import type { ImageSource } from "./shared.types";
import type { TrackArtist, AlbumRelease } from "./content.model";

/**
 * Social & related content models
 */

export interface ArtistPick {
  type: string;
  title: string;
  subtitle: string;
  comment: string;
  uri: string;
  path: string;
  thumbnailUrl: string;
  backgroundImageUrl?: string;
  isPosterStyle: boolean;
  item: {
    uri: string;
    path: string;
    name: string;
    type: string;
    coverUrl: string;
  };
}

export interface RelatedArtist {
  id: string;
  uri: string;
  path: string;
  name: string;
  avatarUrl: string;
  avatarSources: ImageSource[];
}

export interface Playlist {
  id: string;
  uri: string;
  path: string;
  name: string;
  description: string;
  coverUrl: string;
  coverSources: ImageSource[];
  owner: {
    name: string;
  };
}

export interface MusicVideo {
  uri: string;
  path: string;
  name: string;
  coverUrl: string;
  contentRating: string;
  artists: TrackArtist[];
  audioTrackUri?: string;
}

export interface RelatedContent {
  relatedArtists: RelatedArtist[];
  featuringPlaylists: Playlist[];
  discoveredOnPlaylists: Playlist[];
  appearsOnReleases: AlbumRelease[];
}
