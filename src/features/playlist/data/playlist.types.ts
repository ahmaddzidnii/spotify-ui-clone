export interface PlaylistAPIContract {
  data: {
    playlistV2: PlaylistV2;
  };
}

export interface PlaylistV2 {
  __typename: string;
  uri: string;
  name: string;
  description: string;
  ownerV2: OwnerV2;
  images: Images;
  content: Content;
  followers: number;
  following: boolean;
  format: string;
  attributes: any[];
  basePermission: string;
  currentUserCapabilities: CurrentUserCapabilities;
  abuseReportingEnabled: boolean;
  members: Members;
  revisionId: string;
  sharingInfo: SharingInfo;
  watchFeedEntrypoint: WatchFeedEntrypoint;
  visualIdentity: VisualIdentity;
}

export interface OwnerV2 {
  data: UserData;
}

export interface UserData {
  __typename: string;
  avatar: any | null;
  name: string;
  uri: string;
  username: string;
}

export interface Images {
  items: ImageItem[];
}

export interface ImageItem {
  sources: ImageSource[];
}

export interface ImageSource {
  url: string;
  width: number;
  height: number;
}

export interface Content {
  __typename: string;
  items: PlaylistContentItem[];
  pagingInfo: PagingInfo;
  totalCount: number;
}

export interface PlaylistContentItem {
  uid: string;
  addedAt: AddedAt;
  addedBy: AddedBy;
  attributes: any[];
  itemV2: TrackResponseWrapper;
  itemV3: EntityResponseWrapper;
}

export interface AddedAt {
  isoString: string;
}

export interface AddedBy {
  data: UserData;
}

export interface TrackResponseWrapper {
  __typename: string;
  data: Track;
}

export interface Track {
  __typename: string;
  uri: string;
  name: string;
  trackNumber: number;
  discNumber: number;
  trackDuration: TrackDuration;
  playcount: string;
  albumOfTrack: AlbumOfTrack;
  artists: Artists;
  contentRating: ContentRating;
  playability: Playability;
  associationsV3: AssociationsV3;
  mediaType: string;
}

export interface TrackDuration {
  totalMilliseconds: number;
}

export interface AlbumOfTrack {
  uri: string;
  name: string;
  coverArt: CoverArt;
  artists: Artists;
}

export interface CoverArt {
  sources: ImageSource[];
}

export interface Artists {
  items: Artist[];
}

export interface Artist {
  uri: string;
  profile: ArtistProfile;
}

export interface ArtistProfile {
  name: string;
}

export interface ContentRating {
  label: string;
}

export interface Playability {
  playable: boolean;
  reason: string;
}

export interface AssociationsV3 {
  audioAssociations: AudioAssociations;
  videoAssociations: VideoAssociations;
}

export interface AudioAssociations {
  __typename: string;
  items: any[];
}

export interface VideoAssociations {
  totalCount: number;
}

export interface EntityResponseWrapper {
  __typename: string;
  data: Entity;
}

export interface Entity {
  __typename: string;
  uri: string;
  identityTrait: IdentityTrait;
  consumptionExperienceTrait: ConsumptionExperienceTrait;
  visualIdentityTrait: VisualIdentityTrait;
}

export interface IdentityTrait {
  __typename: string;
  name: string;
  description: string;
  type: string;
  contentHierarchyParent: ContentHierarchyParent;
  contributors: Contributors;
}

export interface ContentHierarchyParent {
  __typename: string;
  uri: string;
  identityTrait: {
    __typename: string;
    name: string;
  };
  publishingMetadataTrait: any;
}

export interface Contributors {
  items: any[];
  totalCount: number;
}

export interface ConsumptionExperienceTrait {
  __typename: string;
  contentRatings: any[];
  duration: Duration;
}

export interface Duration {
  nanoSeconds: number;
  seconds: number;
}

export interface VisualIdentityTrait {
  __typename: string;
  sixteenByNineCoverImage: SixteenByNineCoverImage | null;
  squareCoverImage: SquareCoverImage;
}

export interface SixteenByNineCoverImage {
  image: any;
}

export interface SquareCoverImage {
  extractedColorSet: any;
  image: any;
}

export interface PagingInfo {
  limit: number;
  offset: number;
}

export interface CurrentUserCapabilities {
  canView: boolean;
  canEditItems: boolean;
  canAdministratePermissions: boolean;
  canAbuseReport: boolean;
  canCancelMembership: boolean;
}

export interface Members {
  items: MemberItem[];
  totalCount: number;
}

export interface MemberItem {
  isOwner: boolean;
  permissionLevel: string;
  user: {
    data: UserData;
  };
}

export interface SharingInfo {
  shareId: string;
  shareUrl: string;
}

export interface WatchFeedEntrypoint {
  entrypointUri: string;
  thumbnailImage: ThumbnailImage;
  video: any | null;
}

export interface ThumbnailImage {
  data: ThumbnailImageData;
}

export interface ThumbnailImageData {
  __typename: string;
  imageId: string;
  imageIdType: string;
  sources: ImageSource[];
}

export interface VisualIdentity {
  squareCoverImage: SquareCoverImageIdentity;
}

export interface SquareCoverImageIdentity {
  __typename: string;
  extractedColorSet: ExtractedColorSet;
}

export interface ExtractedColorSet {
  encoreBaseSetTextColor: RGBA;
  highContrast: ColorTheme;
  higherContrast: ColorTheme;
  minContrast: ColorTheme;
}

export interface ColorTheme {
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
