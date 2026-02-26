import { transformSpotifyUriToUrl } from "@/features/shared/parsers/parse-uri";
import { formatDuration } from "@/features/shared/formaters/format.duration";
import type { AlbumModel } from "../model";
import type {
  AlbumAPIContract,
  ImageSource as RawImageSource,
  TrackItem,
  Artist as RawArtist,
  ArtistRef,
  DiscItem,
  PopularRelease as RawPopularRelease,
} from "../data/album.types";

// ============================================
// IMAGE ADAPTER
// ============================================

const ImageAdapter = {
  /**
   * Menormalkan format sumber gambar dari respons API mentah.
   */
  mapSources(sources?: RawImageSource[]): Array<{ url: string; width?: number; height?: number }> {
    return (sources || []).map((s) => ({
      url: s.url,
      width: s.width ?? s.maxWidth ?? undefined,
      height: s.height ?? s.maxHeight ?? undefined,
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
    const preferred = sources.find((s) => (s.width || s.maxWidth) === preferredWidth);
    return preferred?.url || sources[0].url;
  },
};

// ============================================
// TRACK ADAPTER
// ============================================

const TrackAdapter = {
  /**
   * Memetakan single track node.
   */
  mapTrack(item: TrackItem) {
    const t = item.track;
    const totalMilliseconds = t.duration?.totalMilliseconds || 0;
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const playcount = t.playcount || "0";

    return {
      uid: item.uid,
      id: t.uri.split(":").pop() || "",
      uri: t.uri,
      path: transformSpotifyUriToUrl(t.uri),
      name: t.name,
      trackNumber: t.trackNumber,
      discNumber: t.discNumber,
      playcount,
      formattedPlaycount: new Intl.NumberFormat("en-US").format(Number(playcount)),
      duration: {
        totalMilliseconds,
        totalSeconds,
        formatted: formatDuration(totalSeconds),
      },
      artists: (t.artists?.items || []).map((a) => ({
        uri: a.uri,
        path: transformSpotifyUriToUrl(a.uri),
        name: a.profile?.name || "",
      })),
      isPlayable: t.playability?.playable ?? false,
      isSaved: t.saved ?? false,
      contentRating: t.contentRating?.label || "NONE",
      hasMusicVideo: (t.associationsV3?.videoAssociations?.totalCount || 0) > 0,
      relinkingInformation: t.relinkingInformation,
    };
  },

  /**
   * Map array of track items
   */
  mapMany(items: TrackItem[]) {
    return items.map((item) => this.mapTrack(item));
  },
};

// ============================================
// ARTIST ADAPTER
// ============================================

const ArtistAdapter = {
  mapArtist(artist: RawArtist) {
    const avatarSources = artist.visuals?.avatarImage?.sources || [];

    return {
      id: artist.id,
      uri: artist.uri,
      path: transformSpotifyUriToUrl(artist.uri),
      name: artist.profile?.name || "",
      avatarUrl: ImageAdapter.getFirstUrl(avatarSources),
      avatarSources: ImageAdapter.mapSources(avatarSources),
      sharingInfo: {
        shareUrl: artist.sharingInfo?.shareUrl || "",
      },
    };
  },

  mapArtistRef(artist: ArtistRef) {
    return {
      id: artist.uri.split(":").pop() || "",
      uri: artist.uri,
      path: transformSpotifyUriToUrl(artist.uri),
      name: artist.profile?.name || "",
      avatarUrl: "",
      avatarSources: [],
      sharingInfo: {
        shareUrl: "",
      },
    };
  },

  mapMany(items: RawArtist[]) {
    return items.map((artist) => this.mapArtist(artist));
  },

  mapManyRefs(items: ArtistRef[]) {
    return items.map((artist) => this.mapArtistRef(artist));
  },
};

// ============================================
// RELEASE ADAPTER
// ============================================

const ReleaseAdapter = {
  mapRelease(release: RawPopularRelease) {
    const sources = release.coverArt?.sources || [];

    return {
      id: release.id,
      uri: release.uri,
      path: transformSpotifyUriToUrl(release.uri),
      name: release.name,
      type: release.type,
      coverUrl: ImageAdapter.getFirstUrl(sources),
      coverSources: ImageAdapter.mapSources(sources),
      releaseYear: release.date?.year || 0,
      isPlayable: release.playability?.playable ?? false,
      sharingInfo: {
        shareId: release.sharingInfo?.shareId || "",
        shareUrl: release.sharingInfo?.shareUrl || "",
      },
    };
  },

  mapMany(items: RawPopularRelease[]) {
    return items.map((release) => this.mapRelease(release));
  },
};

// ============================================
// DISC ADAPTER
// ============================================

const DiscAdapter = {
  mapDisc(disc: DiscItem) {
    return {
      number: disc.number,
      totalTracks: disc.tracks?.totalCount || 0,
    };
  },

  mapMany(items: DiscItem[]) {
    return items.map((disc) => this.mapDisc(disc));
  },
};

// ============================================
// MAIN MAPPER
// ============================================

export function mapAlbumApiToModel(api: AlbumAPIContract): AlbumModel {
  const album = api.data.albumUnion;
  if (!album) {
    throw new Error("Album data is null");
  }

  const coverSources = album.coverArt?.sources || [];
  const visualIdentity = album.visualIdentity?.squareCoverImage?.extractedColorSet;

  return {
    info: {
      id: album.uri.split(":").pop() || "",
      uri: album.uri,
      path: transformSpotifyUriToUrl(album.uri),
      name: album.name,
      type: album.type,
      label: album.label || "",
      courtesyLine: album.courtesyLine || "",
      releaseDate: {
        year: album.date?.isoString ? new Date(album.date.isoString).getFullYear() : 0,
        month: album.date?.isoString ? new Date(album.date.isoString).getMonth() + 1 : undefined,
        day: album.date?.isoString ? new Date(album.date.isoString).getDate() : undefined,
        precision: album.date?.precision as "DAY" | "MONTH" | "YEAR" | undefined,
        isoString: album.date?.isoString || undefined,
      },
      isPreRelease: album.isPreRelease ?? false,
      preReleaseEndDateTime: album.preReleaseEndDateTime,
      totalTracks: album.tracksV2?.totalCount || 0,
    },

    copyright: (album.copyright?.items || []).map((c) => ({
      text: c.text,
      type: c.type,
    })),

    playability: {
      playable: album.playability?.playable ?? false,
      reason: album.playability?.reason || "UNKNOWN",
    },

    sharingInfo: {
      shareId: album.sharingInfo?.shareId || "",
      shareUrl: album.sharingInfo?.shareUrl || "",
    },

    artists: ArtistAdapter.mapManyRefs(album.artists?.items || []),

    coverArt: {
      url: ImageAdapter.getBestQuality(coverSources, 640),
      sources: ImageAdapter.mapSources(coverSources),
      extractedColors: {
        colorDark: album.coverArt?.extractedColors?.colorDark?.hex || "#282828",
        colorLight: album.coverArt?.extractedColors?.colorLight?.hex || "#888888",
        colorRaw: album.coverArt?.extractedColors?.colorRaw?.hex || "#888888",
      },
    },

    visualIdentity: {
      extractedColorSet: {
        highContrast: visualIdentity?.highContrast || createDefaultColorTheme(),
        higherContrast: visualIdentity?.higherContrast || createDefaultColorTheme(),
        minContrast: visualIdentity?.minContrast || createDefaultColorTheme(),
        encoreBaseSetTextColor: visualIdentity?.encoreBaseSetTextColor || {
          red: 195,
          green: 187,
          blue: 161,
          alpha: 255,
        },
      },
    },

    discs: DiscAdapter.mapMany(album.discs?.items || []),

    tracks: TrackAdapter.mapMany(album.tracksV2?.items || []),

    isSaved: album.saved ?? false,

    watchFeedEntrypoint: album.watchFeedEntrypoint
      ? {
          entrypointUri: album.watchFeedEntrypoint.entrypointUri || "",
          path: transformSpotifyUriToUrl(album.watchFeedEntrypoint.entrypointUri || ""),
          thumbnailImageUrl: ImageAdapter.getFirstUrl(album.watchFeedEntrypoint.thumbnailImage?.data?.sources),
          video: album.watchFeedEntrypoint.video
            ? {
                fileId: album.watchFeedEntrypoint.video.fileId,
                startTime: album.watchFeedEntrypoint.video.startTime,
                endTime: album.watchFeedEntrypoint.video.endTime,
                videoType: album.watchFeedEntrypoint.video.videoType,
              }
            : null,
        }
      : null,

    moreAlbumsByArtist: {
      popularReleases: ReleaseAdapter.mapMany(album.moreAlbumsByArtist?.items?.[0]?.discography?.popularReleasesAlbums?.items || []),
    },
  };
}

// ============================================
// UTILITY HELPERS
// ============================================

function createDefaultColorTheme() {
  const defaultRGBA = { red: 40, green: 40, blue: 40, alpha: 255 };
  return {
    backgroundBase: defaultRGBA,
    backgroundTintedBase: defaultRGBA,
    textBase: { red: 255, green: 255, blue: 255, alpha: 255 },
    textBrightAccent: { red: 255, green: 255, blue: 255, alpha: 255 },
    textSubdued: { red: 179, green: 179, blue: 179, alpha: 255 },
  };
}
