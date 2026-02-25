export interface Root {
  data: Data;
}

export interface Data {
  artistUnion: ArtistUnion;
}

export interface ArtistUnion {
  __typename: string;
  discography: Discography;
  goods: Goods;
  headerImage: HeaderImage;
  id: string;
  preRelease: any;
  profile: Profile2;
  relatedContent: RelatedContent;
  relatedMusicVideos: RelatedMusicVideos;
  saved: boolean;
  sharingInfo: SharingInfo6;
  stats: Stats;
  unmappedMusicVideos: UnmappedMusicVideos;
  uri: string;
  visualIdentity: VisualIdentity;
  visuals: Visuals2;
  watchFeedEntrypoint: WatchFeedEntrypoint;
}

export interface Discography {
  albums: Albums;
  compilations: Compilations;
  latest: Latest;
  popularReleasesAlbums: PopularReleasesAlbums;
  singles: Singles;
  topTracks: TopTracks;
}

export interface Albums {
  items: Item[];
  totalCount: number;
}

export interface Item {
  releases: Releases;
}

export interface Releases {
  items: Item2[];
}

export interface Item2 {
  copyright: Copyright;
  coverArt: CoverArt;
  date: Date;
  id: string;
  label: string;
  name: string;
  playability: Playability;
  sharingInfo: SharingInfo;
  tracks: Tracks;
  type: string;
  uri: string;
}

export interface Copyright {
  items: Item3[];
}

export interface Item3 {
  text: string;
  type: string;
}

export interface CoverArt {
  sources: Source[];
}

export interface Source {
  height: number;
  url: string;
  width: number;
}

export interface Date {
  day: number;
  month: number;
  precision: string;
  year: number;
}

export interface Playability {
  playable: boolean;
  reason: string;
}

export interface SharingInfo {
  shareId: string;
  shareUrl: string;
}

export interface Tracks {
  totalCount: number;
}

export interface Compilations {
  items: any[];
  totalCount: number;
}

export interface Latest {
  copyright: Copyright2;
  coverArt: CoverArt2;
  date: Date2;
  id: string;
  label: string;
  name: string;
  playability: Playability2;
  sharingInfo: SharingInfo2;
  tracks: Tracks2;
  type: string;
  uri: string;
}

export interface Copyright2 {
  items: Item4[];
}

export interface Item4 {
  text: string;
  type: string;
}

export interface CoverArt2 {
  sources: Source2[];
}

export interface Source2 {
  height: number;
  url: string;
  width: number;
}

export interface Date2 {
  day: number;
  month: number;
  precision: string;
  year: number;
}

export interface Playability2 {
  playable: boolean;
  reason: string;
}

export interface SharingInfo2 {
  shareId: string;
  shareUrl: string;
}

export interface Tracks2 {
  totalCount: number;
}

export interface PopularReleasesAlbums {
  items: Item5[];
  totalCount: number;
}

export interface Item5 {
  copyright: Copyright3;
  coverArt: CoverArt3;
  date: Date3;
  id: string;
  label: string;
  name: string;
  playability: Playability3;
  sharingInfo: SharingInfo3;
  tracks: Tracks3;
  type: string;
  uri: string;
}

export interface Copyright3 {
  items: Item6[];
}

export interface Item6 {
  text: string;
  type: string;
}

export interface CoverArt3 {
  sources: Source3[];
}

export interface Source3 {
  height: number;
  url: string;
  width: number;
}

export interface Date3 {
  day: number;
  month: number;
  precision: string;
  year: number;
}

export interface Playability3 {
  playable: boolean;
  reason: string;
}

export interface SharingInfo3 {
  shareId: string;
  shareUrl: string;
}

export interface Tracks3 {
  totalCount: number;
}

export interface Singles {
  items: Item7[];
  totalCount: number;
}

export interface Item7 {
  releases: Releases2;
}

export interface Releases2 {
  items: Item8[];
}

export interface Item8 {
  copyright: Copyright4;
  coverArt: CoverArt4;
  date: Date4;
  id: string;
  label: string;
  name: string;
  playability: Playability4;
  sharingInfo: SharingInfo4;
  tracks: Tracks4;
  type: string;
  uri: string;
}

export interface Copyright4 {
  items: Item9[];
}

export interface Item9 {
  text: string;
  type: string;
}

export interface CoverArt4 {
  sources: Source4[];
}

export interface Source4 {
  height: number;
  url: string;
  width: number;
}

export interface Date4 {
  day: number;
  month: number;
  precision: string;
  year: number;
}

export interface Playability4 {
  playable: boolean;
  reason: string;
}

export interface SharingInfo4 {
  shareId: string;
  shareUrl: string;
}

export interface Tracks4 {
  totalCount: number;
}

export interface TopTracks {
  items: Item10[];
}

export interface Item10 {
  track: Track;
  uid: string;
}

export interface Track {
  albumOfTrack: AlbumOfTrack;
  artists: Artists;
  associationsV3: AssociationsV3;
  contentRating: ContentRating;
  discNumber: number;
  duration: Duration;
  id: string;
  name: string;
  playability: Playability5;
  playcount: string;
  uri: string;
}

export interface AlbumOfTrack {
  coverArt: CoverArt5;
  uri: string;
}

export interface CoverArt5 {
  sources: Source5[];
}

export interface Source5 {
  url: string;
}

export interface Artists {
  items: Item11[];
}

export interface Item11 {
  profile: Profile;
  uri: string;
}

export interface Profile {
  name: string;
}

export interface AssociationsV3 {
  videoAssociations: VideoAssociations;
}

export interface VideoAssociations {
  totalCount: number;
}

export interface ContentRating {
  label: string;
}

export interface Duration {
  totalMilliseconds: number;
}

export interface Playability5 {
  playable: boolean;
  reason: string;
}

export interface Goods {
  concerts: Concerts;
  merch: Merch;
}

export interface Concerts {
  items: any[];
  totalCount: number;
}

export interface Merch {
  items: any[];
}

export interface HeaderImage {
  data: Data2;
}

export interface Data2 {
  __typename: string;
  sources: Source6[];
}

export interface Source6 {
  maxHeight: number;
  maxWidth: number;
  url: string;
}

export interface Profile2 {
  biography: Biography;
  externalLinks: ExternalLinks;
  name: string;
  pinnedItem: PinnedItem;
  playlistsV2: PlaylistsV2;
  verified: boolean;
}

export interface Biography {
  text: string;
  type: string;
}

export interface ExternalLinks {
  items: any[];
}

export interface PinnedItem {
  backgroundImageV2: any;
  comment: string;
  itemV2: ItemV2;
  subtitle: string;
  thumbnailImage: ThumbnailImage;
  title: string;
  type: string;
  uri: string;
}

export interface ItemV2 {
  __typename: string;
  data: Data3;
}

export interface Data3 {
  __typename: string;
  coverArt: CoverArt6;
  isPreRelease: boolean;
  name: string;
  type: string;
  uri: string;
}

export interface CoverArt6 {
  sources: Source7[];
}

export interface Source7 {
  height: number;
  url: string;
  width: number;
}

export interface ThumbnailImage {
  data: Data4;
}

export interface Data4 {
  sources: Source8[];
}

export interface Source8 {
  url: string;
}

export interface PlaylistsV2 {
  items: Item12[];
  totalCount: number;
}

export interface Item12 {
  data: Data5;
}

export interface Data5 {
  __typename: string;
  description: string;
  images: Images;
  name: string;
  ownerV2: OwnerV2;
  uri: string;
}

export interface Images {
  items: Item13[];
}

export interface Item13 {
  sources: Source9[];
}

export interface Source9 {
  height: any;
  url: string;
  width: any;
}

export interface OwnerV2 {
  data: Data6;
}

export interface Data6 {
  __typename: string;
  name: string;
}

export interface RelatedContent {
  appearsOn: AppearsOn;
  discoveredOnV2: DiscoveredOnV2;
  featuringV2: FeaturingV2;
  relatedArtists: RelatedArtists;
}

export interface AppearsOn {
  items: Item14[];
  totalCount: number;
}

export interface Item14 {
  releases: Releases3;
}

export interface Releases3 {
  items: Item15[];
  totalCount: number;
}

export interface Item15 {
  artists: Artists2;
  coverArt: CoverArt7;
  date: Date5;
  id: string;
  name: string;
  sharingInfo: SharingInfo5;
  type: string;
  uri: string;
}

export interface Artists2 {
  items: Item16[];
}

export interface Item16 {
  profile: Profile3;
  uri: string;
}

export interface Profile3 {
  name: string;
}

export interface CoverArt7 {
  sources: Source10[];
}

export interface Source10 {
  height: number;
  url: string;
  width: number;
}

export interface Date5 {
  year: number;
}

export interface SharingInfo5 {
  shareId: string;
  shareUrl: string;
}

export interface DiscoveredOnV2 {
  items: Item17[];
  totalCount: number;
}

export interface Item17 {
  data: Data7;
}

export interface Data7 {
  __typename: string;
  description?: string;
  id?: string;
  images?: Images2;
  name?: string;
  ownerV2?: OwnerV22;
  uri?: string;
}

export interface Images2 {
  items: Item18[];
  totalCount: number;
}

export interface Item18 {
  sources: Source11[];
}

export interface Source11 {
  height?: number;
  url: string;
  width?: number;
}

export interface OwnerV22 {
  data: Data8;
}

export interface Data8 {
  __typename: string;
  name: string;
}

export interface FeaturingV2 {
  items: Item19[];
  totalCount: number;
}

export interface Item19 {
  data: Data9;
}

export interface Data9 {
  __typename: string;
  description: string;
  id: string;
  images: Images3;
  name: string;
  ownerV2: OwnerV23;
  uri: string;
}

export interface Images3 {
  items: Item20[];
  totalCount: number;
}

export interface Item20 {
  sources: Source12[];
}

export interface Source12 {
  height: any;
  url: string;
  width: any;
}

export interface OwnerV23 {
  data: Data10;
}

export interface Data10 {
  __typename: string;
  name: string;
}

export interface RelatedArtists {
  items: Item21[];
  totalCount: number;
}

export interface Item21 {
  id: string;
  profile: Profile4;
  uri: string;
  visuals: Visuals;
}

export interface Profile4 {
  name: string;
}

export interface Visuals {
  avatarImage: AvatarImage;
}

export interface AvatarImage {
  sources: Source13[];
}

export interface Source13 {
  height: number;
  url: string;
  width: number;
}

export interface RelatedMusicVideos {
  __typename: string;
  items: Item22[];
  pagingInfo: PagingInfo;
  totalCount: number;
}

export interface Item22 {
  _uri: string;
  data: Data11;
}

export interface Data11 {
  __typename: string;
  albumOfTrack: AlbumOfTrack2;
  artists: Artists3;
  associationsV3: AssociationsV32;
  contentRating: ContentRating2;
  name: string;
  uri: string;
}

export interface AlbumOfTrack2 {
  coverArt: CoverArt8;
  uri: string;
}

export interface CoverArt8 {
  sources: Source14[];
}

export interface Source14 {
  height: number;
  url: string;
  width: number;
}

export interface Artists3 {
  items: Item23[];
}

export interface Item23 {
  profile: Profile5;
  uri: string;
}

export interface Profile5 {
  name: string;
}

export interface AssociationsV32 {
  audioAssociations: AudioAssociations;
}

export interface AudioAssociations {
  items: Item24[];
}

export interface Item24 {
  trackAudio: TrackAudio;
}

export interface TrackAudio {
  _uri: string;
}

export interface ContentRating2 {
  label: string;
}

export interface PagingInfo {
  nextOffset: any;
}

export interface SharingInfo6 {
  shareId: string;
  shareUrl: string;
}

export interface Stats {
  followers: number;
  monthlyListeners: number;
  topCities: TopCities;
  worldRank: number;
}

export interface TopCities {
  items: Item25[];
}

export interface Item25 {
  city: string;
  country: string;
  numberOfListeners: number;
  region: string;
}

export interface UnmappedMusicVideos {
  __typename: string;
  items: any[];
  pagingInfo: PagingInfo2;
  totalCount: number;
}

export interface PagingInfo2 {
  nextOffset: any;
}

export interface VisualIdentity {
  wideFullBleedImage: WideFullBleedImage;
}

export interface WideFullBleedImage {
  __typename: string;
  extractedColorSet: ExtractedColorSet;
}

export interface ExtractedColorSet {
  encoreBaseSetTextColor: EncoreBaseSetTextColor;
  highContrast: HighContrast;
  higherContrast: HigherContrast;
  minContrast: MinContrast;
}

export interface EncoreBaseSetTextColor {
  alpha: number;
  blue: number;
  green: number;
  red: number;
}

export interface HighContrast {
  backgroundBase: BackgroundBase;
  backgroundTintedBase: BackgroundTintedBase;
  textBase: TextBase;
  textBrightAccent: TextBrightAccent;
  textSubdued: TextSubdued;
}

export interface BackgroundBase {
  alpha: number;
  blue: number;
  green: number;
  red: number;
}

export interface BackgroundTintedBase {
  alpha: number;
  blue: number;
  green: number;
  red: number;
}

export interface TextBase {
  alpha: number;
  blue: number;
  green: number;
  red: number;
}

export interface TextBrightAccent {
  alpha: number;
  blue: number;
  green: number;
  red: number;
}

export interface TextSubdued {
  alpha: number;
  blue: number;
  green: number;
  red: number;
}

export interface HigherContrast {
  backgroundBase: BackgroundBase2;
  backgroundTintedBase: BackgroundTintedBase2;
  textBase: TextBase2;
  textBrightAccent: TextBrightAccent2;
  textSubdued: TextSubdued2;
}

export interface BackgroundBase2 {
  alpha: number;
  blue: number;
  green: number;
  red: number;
}

export interface BackgroundTintedBase2 {
  alpha: number;
  blue: number;
  green: number;
  red: number;
}

export interface TextBase2 {
  alpha: number;
  blue: number;
  green: number;
  red: number;
}

export interface TextBrightAccent2 {
  alpha: number;
  blue: number;
  green: number;
  red: number;
}

export interface TextSubdued2 {
  alpha: number;
  blue: number;
  green: number;
  red: number;
}

export interface MinContrast {
  backgroundBase: BackgroundBase3;
  backgroundTintedBase: BackgroundTintedBase3;
  textBase: TextBase3;
  textBrightAccent: TextBrightAccent3;
  textSubdued: TextSubdued3;
}

export interface BackgroundBase3 {
  alpha: number;
  blue: number;
  green: number;
  red: number;
}

export interface BackgroundTintedBase3 {
  alpha: number;
  blue: number;
  green: number;
  red: number;
}

export interface TextBase3 {
  alpha: number;
  blue: number;
  green: number;
  red: number;
}

export interface TextBrightAccent3 {
  alpha: number;
  blue: number;
  green: number;
  red: number;
}

export interface TextSubdued3 {
  alpha: number;
  blue: number;
  green: number;
  red: number;
}

export interface Visuals2 {
  avatarImage: AvatarImage2;
  gallery: Gallery;
}

export interface AvatarImage2 {
  extractedColors: ExtractedColors;
  sources: Source15[];
}

export interface ExtractedColors {
  colorRaw: ColorRaw;
}

export interface ColorRaw {
  hex: string;
}

export interface Source15 {
  height: number;
  url: string;
  width: number;
}

export interface Gallery {
  items: any[];
}

export interface WatchFeedEntrypoint {
  entrypointUri: string;
  thumbnailImage: ThumbnailImage2;
  video: Video;
}

export interface ThumbnailImage2 {
  data: Data12;
}

export interface Data12 {
  __typename: string;
  imageId: string;
  imageIdType: string;
  sources: Source16[];
}

export interface Source16 {
  imageFormat: string;
  maxHeight: number;
  maxWidth: number;
  url: string;
}

export interface Video {
  endTime: number;
  fileId: string;
  startTime: number;
  videoType: string;
}
