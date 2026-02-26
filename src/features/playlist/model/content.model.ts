import type { ImageSource } from "./shared.types";

export interface Track {
  id: string;
  uri: string;
  path: string;
  name: string;
  trackNumber: number;
  discNumber: number;
  duration: {
    totalMilliseconds: number;
    totalSeconds: number;
    formatted: string;
  };
  playcount: string;
  formattedPlaycount: string;
  isPlayable: boolean;
  contentRating?: string;
  hasMusicVideo: boolean;
  artists: TrackArtist[];
  album: {
    uri: string;
    path: string;
    name: string;
    coverUrl: string;
    sources: ImageSource[];
  };
}

export interface TrackArtist {
  uri: string;
  path: string;
  name: string;
}

export interface PlaylistTrack {
  uid: string;
  addedAt: string;
  addedBy: {
    name: string;
    uri: string;
  };
  track: Track;
}
