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
  isSaved: boolean;
  sharingInfo: {
    shareId: string;
    shareUrl: string;
  };
}

// --- Shared Generic Types ---

export interface ImageSource {
  url: string;
  width?: number;
  height?: number;
}

export interface ColorRGBA {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export interface ReleaseDate {
  day?: number;
  month?: number;
  year: number;
  precision?: "DAY" | "MONTH" | "YEAR";
}

// --- Profile & Identity ---

export interface ArtistProfile {
  id: string;
  uri: string;
  path: string;
  name: string;
  verified: boolean;
  biography?: {
    text: string;
    type: string;
  };
  avatarImage: {
    url: string;
    sources: ImageSource[];
    extractedHex: string;
  };
}

export interface ArtistStats {
  followers: number;
  monthlyListeners: number;
  worldRank: number;
  topCities: Array<{
    city: string;
    country: string;
    region: string;
    numberOfListeners: number;
  }>;
}

export interface ColorTheme {
  backgroundBase: ColorRGBA;
  backgroundTintedBase: ColorRGBA;
  textBase: ColorRGBA;
  textBrightAccent: ColorRGBA;
  textSubdued: ColorRGBA;
}

export interface ArtistVisualIdentity {
  extractedColorSet: {
    highContrast: ColorTheme;
    higherContrast: ColorTheme;
    minContrast: ColorTheme;
  };
}

// --- Content: Tracks & Releases ---

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
  formattedPlaycount: string; // Pre-formatted: "1,234,567"
  duration: {
    totalMilliseconds: number;
    totalSeconds: number;
    formatted: string; // Pre-formatted: "3:45"
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

// --- Features & Social ---

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

export interface RelatedContent {
  relatedArtists: RelatedArtist[];
  featuringPlaylists: Playlist[];
  discoveredOnPlaylists: Playlist[];
  appearsOnReleases: AlbumRelease[];
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

// --- UI DTOs (Data Transfer Objects) ---

export interface ArtistCardData {
  id: string;
  uri: string;
  path: string;
  name: string;
  avatarUrl: string;
  verified?: boolean;
}

export interface AlbumCardData {
  id: string;
  uri: string;
  path: string;
  name: string;
  coverUrl: string;
  releaseYear: number;
  type: string;
}

/**
 * Minimal track data for table-row rendering
 */
export interface TrackRowData {
  id: string;
  uri: string;
  path: string;
  name: string;
  coverUrl: string;
  duration: number;
  playcount: string;
  isSaved?: boolean;
  hasMusicVideo?: boolean;
}
