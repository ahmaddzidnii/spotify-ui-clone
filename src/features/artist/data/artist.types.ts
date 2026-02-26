export interface ArtistAPIContract {
  data: {
    artistUnion: ArtistUnion | null;
  };
}

export interface ArtistUnion {
  __typename: string;
  id: string;
  uri: string;
  saved: boolean | null;
  sharingInfo: SharingInfo | null;
  discography: Discography;
  profile: Profile;
  visuals: Visuals | null;
  stats: Stats | null;
  visualIdentity: VisualIdentity | null;
  headerImage: HeaderImage | null;
  relatedContent: RelatedContent | null;
  relatedMusicVideos: RelatedMusicVideos | null;
  unmappedMusicVideos: UnmappedMusicVideos | null;
  watchFeedEntrypoint: WatchFeedEntrypoint | null;
  goods: Goods | null;
  preRelease: any | null;
}

/* ================================
   1. DISCOGRAPHY SECTION
================================ */

export interface Discography {
  albums: AlbumSection;
  compilations: AlbumSection;
  latest: Album | null;
  popularReleasesAlbums: AlbumList;
  singles: SingleSection;
  topTracks: TopTracks;
}

export interface AlbumSection {
  items: Array<{ releases: ReleaseContainer }>;
  totalCount: number;
}

export interface SingleSection {
  items: Array<{ releases: ReleaseContainer }>;
  totalCount: number;
}

export interface ReleaseContainer {
  items: Album[];
  totalCount?: number;
}

export interface SimpleReleaseContainer {
  items: SimpleAlbum[];
  totalCount?: number;
}

export interface AlbumList {
  items: Album[];
  totalCount: number;
}

export interface Album {
  __typename?: string;
  id: string;
  uri: string;
  name: string;
  type: string;
  date: ReleaseDate | null;
  coverArt: CoverArt | null;
  label: string | null;
  copyright: Copyright | null;
  playability: Playability | null;
  sharingInfo: SharingInfo | null;
  tracks: TrackCount | null;
  isPreRelease?: boolean | null;
}

export interface SimpleAlbum {
  id: string;
  uri: string;
  name: string;
  type: string;
  date: { year: number } | null;
  coverArt: CoverArt | null;
  sharingInfo: SharingInfo | null;
  artists?: ArtistList | null;
}

export interface TopTracks {
  items: TopTrackItem[];
}

export interface TopTrackItem {
  track: Track | null;
  uid: string;
}

export interface Track {
  id: string;
  uri: string;
  name: string;
  playcount: string | null;
  discNumber: number | null;
  duration: Duration | null;
  playability: Playability | null;
  contentRating: ContentRating | null;
  artists: ArtistList | null;
  albumOfTrack: {
    uri: string;
    coverArt: CoverArt | null;
  } | null;
  associationsV3: Associations | null;
}

/* ================================
   2. PROFILE & PINNED ITEM
================================ */

export interface Profile {
  name: string;
  verified: boolean | null;
  biography: Biography | null;
  externalLinks: ExternalLinks | null;
  pinnedItem: PinnedItem | null;
  playlistsV2: PlaylistSection | null;
}

export interface Biography {
  text: string;
  type: string;
}

export interface ExternalLinks {
  items: Array<{ name: string; url: string }>;
}

export interface PinnedItem {
  type: string;
  title: string;
  subtitle: string;
  comment: string;
  uri: string;
  backgroundImageV2: {
    data: {
      __typename: string;
      sources: ImageSource[];
    } | null;
  } | null;
  itemV2: {
    __typename: string;
    // Data bisa berupa Playlist (Tiara) atau Album (JKT48)
    data: any | null;
  };
  thumbnailImage: {
    data: {
      sources: ImageSource[];
    } | null;
  } | null;
}

/* ================================
   3. RELATED CONTENT & MEDIA
================================ */

export interface RelatedContent {
  appearsOn: AppearsOn | null;
  discoveredOnV2: PlaylistSection | null;
  featuringV2: PlaylistSection | null;
  relatedArtists: RelatedArtists | null;
}

export interface AppearsOn {
  items: Array<{ releases: SimpleReleaseContainer }>;
  totalCount: number;
}

export interface PlaylistSection {
  items: PlaylistItem[];
  totalCount: number;
}

export interface PlaylistItem {
  data: PlaylistData | GenericError | null;
}

export interface GenericError {
  __typename: string;
}

export interface PlaylistData {
  __typename: string;
  id?: string;
  uri: string;
  name: string;
  description?: string | null;
  images?: ImageCollection | null;
  ownerV2?: {
    data: {
      __typename: string;
      name: string;
    } | null;
  } | null;
}

export interface RelatedArtists {
  items: RelatedArtistItem[];
  totalCount: number;
}

export interface RelatedArtistItem {
  id: string;
  uri: string;
  profile: { name: string } | null;
  visuals: {
    avatarImage: CoverArt | null;
  } | null;
}

export interface RelatedMusicVideos {
  __typename: string;
  items: VideoItem[];
  totalCount: number;
  pagingInfo: PagingInfo | null;
}

export interface UnmappedMusicVideos {
  __typename: string;
  items: VideoItem[];
  totalCount: number;
  pagingInfo: PagingInfo | null;
}

export interface VideoItem {
  _uri: string;
  data: {
    __typename: string;
    name: string;
    uri: string;
    artists: ArtistList | null;
    albumOfTrack: {
      coverArt: CoverArt | null;
      uri: string;
    } | null;
    associationsV3: Associations | null;
    contentRating: ContentRating | null;
  } | null;
}

/* ================================
   4. VISUALS & STYLING
================================ */

export interface Visuals {
  avatarImage: {
    sources: ImageSource[];
    extractedColors: {
      colorRaw: { hex: string } | null;
    } | null;
  } | null;
  gallery: {
    items: Array<{ sources: ImageSource[] }>;
  } | null;
}

export interface VisualIdentity {
  wideFullBleedImage: {
    __typename: string;
    extractedColorSet: {
      highContrast: ContrastSet | null;
      higherContrast: ContrastSet | null;
      minContrast: ContrastSet | null;
      encoreBaseSetTextColor?: RGBA | null;
    } | null;
  } | null;
}

export interface HeaderImage {
  data: {
    __typename: string;
    sources: Array<{
      url: string;
      maxWidth: number;
      maxHeight: number;
    }>;
  } | null;
}

export interface WatchFeedEntrypoint {
  entrypointUri: string;
  thumbnailImage: {
    data: {
      __typename: string;
      imageId: string | null;
      imageIdType: string | null;
      sources: ImageSource[] | null;
    } | null;
  } | null;
  video: {
    fileId: string | null;
    videoType: string | null;
    startTime: number | null;
    endTime: number | null;
  } | null;
}

/* ================================
   5. SHARED UTILITIES
================================ */

export interface ImageSource {
  url: string;
  width?: number | null;
  height?: number | null;
  imageFormat?: string | null;
}

export interface ImageCollection {
  items: Array<{ sources: ImageSource[] }>;
  totalCount?: number;
}

export interface CoverArt {
  sources: ImageSource[];
}

export interface ReleaseDate {
  year: number;
  month?: number | null;
  day?: number | null;
  precision: string;
}

export interface Copyright {
  items: Array<{ text: string; type: string }>;
}

export interface Playability {
  playable: boolean;
  reason: string;
}

export interface SharingInfo {
  shareId: string | null;
  shareUrl: string;
}

export interface ArtistList {
  items: Array<{
    uri: string;
    profile: { name: string };
  }>;
}

export interface Associations {
  videoAssociations?: { totalCount: number } | null;
  audioAssociations?: {
    items: Array<{
      trackAudio: { _uri: string };
    }>;
  } | null;
}

export interface Stats {
  followers: number | null;
  monthlyListeners: number | null;
  worldRank: number | null;
  topCities: {
    items: Array<{
      city: string;
      country: string;
      region: string;
      numberOfListeners: number;
    }>;
  } | null;
}

export interface Goods {
  concerts: { items: any[]; totalCount: number } | null;
  merch: { items: any[] } | null;
}

export interface ContrastSet {
  backgroundBase: RGBA;
  backgroundTintedBase: RGBA;
  textBase: RGBA;
  textBrightAccent: RGBA;
  textSubdued: RGBA;
}

export interface RGBA {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export interface Duration {
  totalMilliseconds: number;
}

export interface TrackCount {
  totalCount: number;
}

export interface ContentRating {
  label: string;
}

export interface PagingInfo {
  nextOffset: string | null;
}
