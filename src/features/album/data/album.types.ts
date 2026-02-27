/**
 * Album API Contract Types
 * Type definitions for the raw Spotify album API response
 */

export interface AlbumAPIContract {
  data: {
    albumUnion: AlbumUnion | null;
  };
}

export interface AlbumUnion {
  __typename: "Album";
  uri: string;
  name: string;
  type: string;
  copyright: Copyright | null;
  courtesyLine: string;
  date: ReleaseDate | null;
  isPreRelease: boolean;
  label: string;
  playability: Playability | null;
  preReleaseEndDateTime: string | null;
  saved: boolean;
  sharingInfo: SharingInfo | null;
  tracksV2: TracksV2 | null;
  visualIdentity: VisualIdentity | null;
  watchFeedEntrypoint: WatchFeedEntrypoint | null;
  artists: ArtistList | null;
  coverArt: CoverArt | null;
  discs: DiscList | null;
  releases: ReleasesList | null;
  moreAlbumsByArtist: MoreAlbumsByArtist | null;
}

/* ================================
   1. COPYRIGHT & METADATA
================================ */

export interface Copyright {
  items: CopyrightItem[];
  totalCount: number;
}

export interface CopyrightItem {
  text: string;
  type: string;
}

export interface ReleaseDate {
  isoString: string;
  precision: string;
}

export interface Playability {
  playable: boolean;
  reason?: string;
}

export interface SharingInfo {
  shareId: string;
  shareUrl: string;
}

/* ================================
   2. TRACKS & CONTENT
================================ */

export interface TracksV2 {
  items: TrackItem[];
  totalCount: number;
}

export interface TrackItem {
  track: Track;
  uid: string;
}

export interface Track {
  artists: ArtistList | null;
  associationsV3: Associations | null;
  contentRating: ContentRating | null;
  discNumber: number;
  duration: Duration | null;
  name: string;
  playability: Playability | null;
  playcount: string;
  relinkingInformation: any | null;
  saved: boolean;
  trackNumber: number;
  uri: string;
}

export interface ArtistList {
  items: Artist[];
}

export interface ArtistRef {
  profile: {
    name: string;
  };
  uri: string;
}

export interface Associations {
  videoAssociations: {
    totalCount: number;
  };
}

export interface ContentRating {
  label: string;
}

export interface Duration {
  totalMilliseconds: number;
}

/* ================================
   3. ARTISTS
================================ */

export interface Artist {
  id: string;
  uri: string;
  profile: {
    name: string;
  };
  sharingInfo: SharingInfo | null;
  visuals: Visuals | null;
}

export interface Visuals {
  avatarImage: AvatarImage | null;
}

export interface AvatarImage {
  sources: ImageSource[];
}

/* ================================
   4. VISUAL IDENTITY & IMAGES
================================ */

export interface VisualIdentity {
  squareCoverImage: SquareCoverImage | null;
}

export interface SquareCoverImage {
  __typename: string;
  extractedColorSet: ExtractedColorSet | null;
}

export interface ExtractedColorSet {
  encoreBaseSetTextColor: ColorRGBA;
  highContrast: ColorTheme;
  higherContrast: ColorTheme;
  minContrast: ColorTheme;
}

export interface ColorRGBA {
  alpha: number;
  blue: number;
  green: number;
  red: number;
}

export interface ColorTheme {
  backgroundBase: ColorRGBA;
  backgroundTintedBase: ColorRGBA;
  textBase: ColorRGBA;
  textBrightAccent: ColorRGBA;
  textSubdued: ColorRGBA;
}

export interface CoverArt {
  extractedColors?: ExtractedColors | null;
  sources: ImageSource[];
}

export interface ExtractedColors {
  colorDark: ColorHex;
  colorLight: ColorHex;
  colorRaw: ColorHex;
}

export interface ColorHex {
  hex: string;
}

export interface ImageSource {
  height?: number;
  maxHeight?: number;
  width?: number;
  maxWidth?: number;
  url: string;
  imageFormat?: string;
}

/* ================================
   5. DISCS
================================ */

export interface DiscList {
  items: DiscItem[];
  totalCount: number;
}

export interface DiscItem {
  number: number;
  tracks: {
    totalCount: number;
  };
}

/* ================================
   6. RELEASES & MORE ALBUMS
================================ */

export interface ReleasesList {
  items: any[];
  totalCount: number;
}

export interface MoreAlbumsByArtist {
  items: MoreAlbumsByArtistItem[];
}

export interface MoreAlbumsByArtistItem {
  discography: {
    popularReleasesAlbums: PopularReleasesAlbums;
  };
}

export interface PopularReleasesAlbums {
  items: PopularRelease[];
}

export interface PopularRelease {
  coverArt: CoverArt | null;
  date: {
    year: number;
  };
  id: string;
  name: string;
  playability: Playability | null;
  sharingInfo: SharingInfo | null;
  type: string;
  uri: string;
}

/* ================================
   7. WATCH FEED / VIDEO
================================ */

export interface WatchFeedEntrypoint {
  entrypointUri: string;
  thumbnailImage: ThumbnailImage | null;
  video: Video | null;
}

export interface ThumbnailImage {
  data: {
    __typename: string;
    imageId: string;
    imageIdType: string;
    sources: ImageSource[];
  };
}

export interface Video {
  endTime: number;
  fileId: string;
  startTime: number;
  videoType: string;
}
