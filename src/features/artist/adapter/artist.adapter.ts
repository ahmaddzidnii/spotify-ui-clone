import { transformSpotifyUriToUrl } from "@/features/shared/parsers/parse-uri";
import { formatDuration } from "@/features/shared/formaters/format.duration";
import type {
  ArtistAPIContract,
  Discography as RawDiscography,
  Album as RawAlbum,
  SimpleAlbum as RawSimpleAlbum,
  Track as RawTrack,
  TopTrackItem as RawTopTrackItem,
  PinnedItem as RawPinnedItem,
  RelatedContent as RawRelatedContent,
  RelatedArtistItem as RawRelatedArtist,
  RelatedMusicVideos,
  VideoItem as RawVideoItem,
  PlaylistItem as RawPlaylistItem,
  PlaylistData as RawPlaylistData,
  ImageSource as RawImageSource,
} from "../data/artist.types";
import type {
  ArtistModel,
  AlbumRelease,
  ImageSource,
  Playlist,
  Track,
  ArtistPick,
  RelatedContent,
  MusicVideo,
  Discography,
  RelatedArtist,
} from "../model";
import { formatNumber } from "@/features/shared/formaters/format-number";

// ============================================
// TYPE GUARDS
// ============================================

function isPlaylistData(item: RawPlaylistItem): item is { data: RawPlaylistData } {
  return item?.data?.__typename === "Playlist";
}

// ============================================
// IMAGE ADAPTER
// ============================================

const ImageAdapter = {
  /**
   * Menormalkan format sumber gambar dari respons API mentah.
   */
  mapSources(sources?: RawImageSource[]): ImageSource[] {
    return (sources || []).map((s) => ({
      url: s.url,
      width: s.width ?? undefined,
      height: s.height ?? undefined,
    }));
  },

  /**
   * Mendapatkan URL gambar pertama atau fallback string kosong.
   */
  getFirstUrl(sources?: RawImageSource[]): string {
    return sources?.[0]?.url || "";
  },

  /**
   * Mendapatkan gambar dengan kualitas terbaik berdasarkan width.
   */
  getBestQuality(sources?: RawImageSource[], preferredWidth = 640): string {
    if (!sources?.length) return "";
    const preferred = sources.find((s) => s.width === preferredWidth);
    return preferred?.url || sources[0].url;
  },
};

// ============================================
// PLAYLIST ADAPTER
// ============================================

const PlaylistAdapter = {
  /**
   * Memetakan single playlist item.
   */
  mapPlaylist(item: { data: RawPlaylistData }): Playlist {
    const d = item.data;
    const sources = d.images?.items?.[0]?.sources || [];

    return {
      id: d.id || "",
      uri: d.uri,
      path: transformSpotifyUriToUrl(d.uri),
      name: d.name,
      description: d.description || `By ${d.ownerV2?.data?.name || "Unknown"}`,
      coverUrl: ImageAdapter.getFirstUrl(sources),
      coverSources: ImageAdapter.mapSources(sources),
      owner: { name: d.ownerV2?.data?.name || "" },
    };
  },

  /**
   * Memetakan daftar playlist dan membuang node GenericError.
   */
  mapMany(items?: RawPlaylistItem[]): Playlist[] {
    return (items || []).filter(isPlaylistData).map((item) => this.mapPlaylist(item));
  },
};

// ============================================
// RELEASE/ALBUM ADAPTER
// ============================================

const ReleaseAdapter = {
  /**
   * Mengonversi entitas rilis (Album, Single, atau EP).
   */
  mapAlbum(release: RawAlbum): AlbumRelease {
    const sources = release.coverArt?.sources || [];

    return {
      id: release.id,
      uri: release.uri,
      path: transformSpotifyUriToUrl(release.uri),
      name: release.name,
      type: release.type,
      label: release.label || "",
      coverArt: {
        url: ImageAdapter.getFirstUrl(sources),
        sources: ImageAdapter.mapSources(sources),
      },
      releaseDate: {
        year: release.date?.year || 0,
        month: release.date?.month ?? undefined,
        day: release.date?.day ?? undefined,
        precision: release.date?.precision as "DAY" | "MONTH" | "YEAR" | undefined,
      },
      totalTracks: release.tracks?.totalCount || 0,
      isPlayable: release.playability?.playable ?? false,
      copyright: (release.copyright?.items || []).map((c) => ({
        text: c.text,
        type: c.type,
      })),
      sharingInfo: {
        shareId: release.sharingInfo?.shareId || "",
        shareUrl: release.sharingInfo?.shareUrl || "",
      },
    };
  },

  /**
   * Memetakan array releases.
   */
  mapMany(items: RawAlbum[]): AlbumRelease[] {
    return items.map((item) => this.mapAlbum(item));
  },

  /**
   * Flatten & map nested release structure (dari sections).
   */
  flatMapFromSections(items?: Array<{ releases: { items: RawAlbum[]; totalCount?: number } }>): AlbumRelease[] {
    return (items || []).flatMap((section) => section.releases?.items || []).map((release) => this.mapAlbum(release));
  },

  /**
   * Map SimpleAlbum ke AlbumRelease (untuk appearsOn).
   */
  mapSimpleAlbum(album: RawSimpleAlbum): AlbumRelease {
    const sources = album.coverArt?.sources || [];

    return {
      id: album.id,
      uri: album.uri,
      path: transformSpotifyUriToUrl(album.uri),
      name: album.name,
      type: album.type,
      label: "", // SimpleAlbum tidak punya label
      coverArt: {
        url: ImageAdapter.getFirstUrl(sources),
        sources: ImageAdapter.mapSources(sources),
      },
      releaseDate: {
        year: album.date?.year || 0,
        month: undefined,
        day: undefined,
        precision: "YEAR" as const,
      },
      totalTracks: 0, // SimpleAlbum tidak punya totalTracks
      isPlayable: true, // Default
      copyright: [],
      sharingInfo: {
        shareId: album.sharingInfo?.shareId || "",
        shareUrl: album.sharingInfo?.shareUrl || "",
      },
    };
  },

  /**
   * Flatten & map SimpleAlbum dari appearsOn.
   */
  flatMapSimpleAlbums(items?: Array<{ releases: { items: RawSimpleAlbum[]; totalCount?: number } }>): AlbumRelease[] {
    return (items || []).flatMap((section) => section.releases?.items || []).map((album) => this.mapSimpleAlbum(album));
  },
};

// ============================================
// TRACK ADAPTER
// ============================================

const TrackAdapter = {
  /**
   * Memetakan single track node.
   */
  mapTrack(t: RawTrack): Track {
    const albumCoverSources = t.albumOfTrack?.coverArt?.sources;
    const totalMilliseconds = t.duration?.totalMilliseconds || 0;
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const playcount = t.playcount || "0";

    return {
      id: t.id,
      uri: t.uri,
      path: transformSpotifyUriToUrl(t.uri),
      name: t.name,
      playcount,
      // ✅ Pre-format playcount
      formattedPlaycount: new Intl.NumberFormat("en-US").format(Number(playcount)),
      discNumber: t.discNumber || 1,
      isPlayable: t.playability?.playable ?? false,
      contentRating: t.contentRating?.label,
      hasMusicVideo: (t.associationsV3?.videoAssociations?.totalCount || 0) > 0,
      duration: {
        totalMilliseconds,
        totalSeconds,
        // ✅ Pre-format duration
        formatted: formatDuration(totalSeconds),
      },
      artists: (t.artists?.items || []).map((a) => ({
        uri: a.uri,
        path: transformSpotifyUriToUrl(a.uri),
        name: a.profile?.name || "",
      })),
      album: {
        uri: t.albumOfTrack?.uri || "",
        path: transformSpotifyUriToUrl(t.albumOfTrack?.uri || ""),
        coverUrl: ImageAdapter.getFirstUrl(albumCoverSources),
        sources: ImageAdapter.mapSources(albumCoverSources),
      },
    };
  },

  /**
   * Map top tracks (yang dibungkus dalam TopTrackItem).
   */
  mapTopTracks(items: RawTopTrackItem[]): Track[] {
    return items.filter((item) => item.track !== null).map((item) => this.mapTrack(item.track!));
  },
};

// ============================================
// RELATED ARTIST ADAPTER
// ============================================

const RelatedArtistAdapter = {
  mapArtist(artist: RawRelatedArtist): RelatedArtist {
    const avatarSources = artist.visuals?.avatarImage?.sources;

    return {
      id: artist.id,
      uri: artist.uri,
      path: transformSpotifyUriToUrl(artist.uri),
      name: artist.profile?.name || "",
      avatarUrl: ImageAdapter.getFirstUrl(avatarSources),
      avatarSources: ImageAdapter.mapSources(avatarSources),
    };
  },

  mapMany(items: RawRelatedArtist[]): RelatedArtist[] {
    return items.map((item) => this.mapArtist(item));
  },
};

// ============================================
// COMPLEX EXTRACTORS
// ============================================

function extractDiscography(disco: RawDiscography | undefined): Discography {
  if (!disco) {
    return {
      topTracks: [],
      latest: null,
      popularReleases: [],
      albums: [],
      singlesAndEPs: [],
      compilations: [],
    };
  }

  return {
    topTracks: TrackAdapter.mapTopTracks(disco.topTracks?.items || []),
    latest: disco.latest ? ReleaseAdapter.mapAlbum(disco.latest) : null,
    popularReleases: ReleaseAdapter.mapMany(disco.popularReleasesAlbums?.items || []),
    albums: ReleaseAdapter.flatMapFromSections(disco.albums?.items),
    singlesAndEPs: ReleaseAdapter.flatMapFromSections(disco.singles?.items),
    compilations: ReleaseAdapter.flatMapFromSections(disco.compilations?.items),
  };
}

function extractArtistPick(pinnedItem: RawPinnedItem | null | undefined, artistName: string): ArtistPick | null {
  if (!pinnedItem) return null;

  const itemData = pinnedItem.itemV2?.data;

  return {
    isPosterStyle: !!pinnedItem.backgroundImageV2,
    comment: pinnedItem.comment || `Posted by ${artistName}`,
    backgroundImageUrl: ImageAdapter.getFirstUrl(pinnedItem.backgroundImageV2?.data?.sources),
    thumbnailUrl: ImageAdapter.getFirstUrl(pinnedItem.thumbnailImage?.data?.sources),
    item: {
      uri: itemData?.uri || "",
      path: transformSpotifyUriToUrl(itemData?.uri || ""),
      name: itemData?.name || "",
      coverUrl: ImageAdapter.getFirstUrl(itemData?.images?.items?.[0]?.sources),
      type: pinnedItem.itemV2?.__typename || "",
    },
    subtitle: pinnedItem.subtitle || "",
    title: pinnedItem.title || "",
    type: pinnedItem.type || "",
    uri: pinnedItem.uri || "",
    path: transformSpotifyUriToUrl(pinnedItem.uri || ""),
  };
}

function extractRelatedContent(related: RawRelatedContent | null | undefined): RelatedContent {
  if (!related) {
    return {
      relatedArtists: [],
      featuringPlaylists: [],
      discoveredOnPlaylists: [],
      appearsOnReleases: [],
    };
  }

  return {
    relatedArtists: RelatedArtistAdapter.mapMany(related.relatedArtists?.items || []),
    featuringPlaylists: PlaylistAdapter.mapMany(related.featuringV2?.items),
    discoveredOnPlaylists: PlaylistAdapter.mapMany(related.discoveredOnV2?.items),
    appearsOnReleases: ReleaseAdapter.flatMapSimpleAlbums(related.appearsOn?.items),
  };
}

function extractMusicVideos(videoData: RelatedMusicVideos | null | undefined): MusicVideo[] {
  if (!videoData?.items) return [];

  return videoData.items.map((item: RawVideoItem) => {
    const v = item.data;
    if (!v) {
      throw new Error("Invalid video data");
    }

    const coverSources = v.albumOfTrack?.coverArt?.sources;

    return {
      uri: v.uri,
      path: transformSpotifyUriToUrl(v.uri),
      name: v.name,
      coverUrl: ImageAdapter.getFirstUrl(coverSources),
      contentRating: v.contentRating?.label || "NONE",
      artists: (v.artists?.items || []).map((a) => ({
        uri: a.uri,
        path: transformSpotifyUriToUrl(a.uri),
        name: a.profile?.name || "",
      })),
      audioTrackUri: v.associationsV3?.audioAssociations?.items?.[0]?.trackAudio?._uri,
    };
  });
}

// ============================================
// MAIN MAPPER
// ============================================

export function mapArtistApiToModel(api: ArtistAPIContract): ArtistModel {
  const artist = api.data.artistUnion;
  if (!artist) {
    throw new Error("Artist data is null");
  }

  const avatarSources = artist.visuals?.avatarImage?.sources || [];
  const dominantColor = artist.visuals?.avatarImage?.extractedColors?.colorRaw?.hex || "#282828";

  return {
    profile: {
      id: artist.id,
      uri: artist.uri,
      path: transformSpotifyUriToUrl(artist.uri),
      name: artist.profile.name,
      verified: artist.profile.verified ?? false,
      biography: artist.profile.biography ?? undefined,
      avatarImage: {
        url: ImageAdapter.getBestQuality(avatarSources, 640),
        sources: ImageAdapter.mapSources(avatarSources),
        extractedHex: dominantColor,
      },
    },

    stats: {
      followers: artist.stats?.followers ?? 0,
      monthlyListeners: artist.stats?.monthlyListeners ?? 0,
      formatedMonthlyListeners: formatNumber(artist.stats?.monthlyListeners ?? 0),
      worldRank: artist.stats?.worldRank ?? 0,
      topCities: (artist.stats?.topCities?.items || []).map((city) => ({
        city: city.city,
        country: city.country,
        region: city.region,
        numberOfListeners: city.numberOfListeners,
      })),
    },

    visualIdentity: {
      extractedColorSet: {
        highContrast: artist.visualIdentity?.wideFullBleedImage?.extractedColorSet?.highContrast ?? createDefaultColorTheme(),
        higherContrast: artist.visualIdentity?.wideFullBleedImage?.extractedColorSet?.higherContrast ?? createDefaultColorTheme(),
        minContrast: artist.visualIdentity?.wideFullBleedImage?.extractedColorSet?.minContrast ?? createDefaultColorTheme(),
      },
    },

    headerImage: {
      images: ImageAdapter.mapSources(artist.headerImage?.data?.sources),
      dominantColor,
    },

    isSaved: artist.saved ?? false,
    sharingInfo: {
      shareId: artist.sharingInfo?.shareId || "",
      shareUrl: artist.sharingInfo?.shareUrl || "",
    },

    discography: extractDiscography(artist.discography),
    artistPick: extractArtistPick(artist.profile.pinnedItem, artist.profile.name),
    relatedContent: extractRelatedContent(artist.relatedContent),
    hasMusicVideo: (artist.relatedMusicVideos?.totalCount || 0) > 0,
    musicVideos: extractMusicVideos(artist.relatedMusicVideos),
    watchFeedEntrypoint: {
      uri: artist.watchFeedEntrypoint?.entrypointUri[0] || "",
      path: transformSpotifyUriToUrl(artist.watchFeedEntrypoint?.entrypointUri[0] || ""),
      thumbnailImage: artist.watchFeedEntrypoint?.thumbnailImage?.data?.imageId ?? "",
    },
  };
}

// ============================================
// UTILITY HELPERS
// ============================================

function createDefaultColorTheme() {
  const defaultRGBA = { red: 40, green: 40, blue: 40, alpha: 1 };
  return {
    backgroundBase: defaultRGBA,
    backgroundTintedBase: defaultRGBA,
    textBase: { red: 255, green: 255, blue: 255, alpha: 1 },
    textBrightAccent: { red: 255, green: 255, blue: 255, alpha: 1 },
    textSubdued: { red: 179, green: 179, blue: 179, alpha: 1 },
  };
}
