import type { AlbumRelease } from "./releases.model";

/**
 * Album content models: Tracks and related content
 */

export interface TrackArtist {
  uri: string;
  path: string;
  name: string;
}

export interface Track {
  uid: string;
  id: string;
  uri: string;
  path: string;
  name: string;
  trackNumber: number;
  discNumber: number;
  playcount: string;
  formattedPlaycount: string;
  duration: {
    totalMilliseconds: number;
    totalSeconds: number;
    formatted: string;
  };
  artists: TrackArtist[];
  isPlayable: boolean;
  isSaved: boolean;
  contentRating: string;
  hasMusicVideo: boolean;
  relinkingInformation: any | null;
}

export interface AlbumWatchFeed {
  entrypointUri: string;
  path: string;
  thumbnailImageUrl: string;
  video: {
    fileId: string;
    startTime: number;
    endTime: number;
    videoType: string;
  } | null;
}

export interface MoreAlbumsByArtist {
  popularReleases: AlbumRelease[];
}
