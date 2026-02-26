import type { ImageSource, ReleaseDate } from "./shared.types";

/**
 * Music content models: Tracks, Albums, Discography
 */

export interface TrackArtist {
  uri: string;
  path: string;
  name: string;
}

export interface TrackAlbum {
  uri: string;
  path: string;
  coverUrl: string;
  sources: ImageSource[];
}

export interface Track {
  id: string;
  uri: string;
  path: string;
  name: string;
  playcount: string;
  formattedPlaycount: string;
  duration: {
    totalMilliseconds: number;
    totalSeconds: number;
    formatted: string;
  };
  discNumber: number;
  artists: TrackArtist[];
  album: TrackAlbum;
  isPlayable: boolean;
  contentRating?: string;
  hasMusicVideo: boolean;
}

export interface AlbumRelease {
  id: string;
  uri: string;
  path: string;
  name: string;
  type: string;
  label: string;
  coverArt: {
    url: string;
    sources: ImageSource[];
  };
  releaseDate: ReleaseDate;
  totalTracks: number;
  isPlayable: boolean;
  copyright: Array<{
    text: string;
    type: string;
  }>;
  sharingInfo: {
    shareId: string;
    shareUrl: string;
  };
}

export interface Discography {
  topTracks: Track[];
  latest: AlbumRelease | null;
  popularReleases: AlbumRelease[];
  albums: AlbumRelease[];
  singlesAndEPs: AlbumRelease[];
  compilations: AlbumRelease[];
}
