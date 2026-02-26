import { transformSpotifyUriToUrl } from "@/features/shared/parsers/parse-uri";
import { formatDuration } from "@/features/shared/formaters/format.duration";
import type { PlaylistAPIContract, PlaylistContentItem, ImageSource as RawImageSource, Track as RawTrack } from "../data/playlist.types";
import type { PlaylistModel, PlaylistTrack, Track, ImageSource } from "../model";

// ============================================
// IMAGE ADAPTER
// ============================================

const ImageAdapter = {
  /**
   * Normalize image sources from raw API response
   */
  mapSources(sources?: RawImageSource[]): ImageSource[] {
    return (sources || []).map((s) => ({
      url: s.url,
      width: s.width ?? undefined,
      height: s.height ?? undefined,
    }));
  },

  /**
   * Get first image URL or empty string fallback
   */
  getFirstUrl(sources?: RawImageSource[]): string {
    return sources?.[0]?.url || "";
  },

  /**
   * Get best quality image based on width
   */
  getBestQuality(sources?: RawImageSource[], preferredWidth = 640): string {
    if (!sources?.length) return "";
    const preferred = sources.find((s) => s.width === preferredWidth);
    return preferred?.url || sources[0].url;
  },
};

// ============================================
// TRACK ADAPTER
// ============================================

const TrackAdapter = {
  /**
   * Map single track node
   */
  mapTrack(t: RawTrack): Track {
    const albumCoverSources = t.albumOfTrack?.coverArt?.sources;
    const totalMilliseconds = t.trackDuration?.totalMilliseconds || 0;
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const playcount = t.playcount || "0";

    return {
      id: t.uri.split(":").pop() || "",
      uri: t.uri,
      path: transformSpotifyUriToUrl(t.uri),
      name: t.name,
      playcount,
      formattedPlaycount: new Intl.NumberFormat("en-US").format(Number(playcount)),
      trackNumber: t.trackNumber || 1,
      discNumber: t.discNumber || 1,
      isPlayable: t.playability?.playable ?? false,
      contentRating: t.contentRating?.label,
      hasMusicVideo: (t.associationsV3?.videoAssociations?.totalCount || 0) > 0,
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
      album: {
        uri: t.albumOfTrack?.uri || "",
        path: transformSpotifyUriToUrl(t.albumOfTrack?.uri || ""),
        name: t.albumOfTrack?.name || "",
        coverUrl: ImageAdapter.getFirstUrl(albumCoverSources),
        sources: ImageAdapter.mapSources(albumCoverSources),
      },
    };
  },

  /**
   * Map playlist content item to PlaylistTrack
   */
  mapPlaylistTrack(item: PlaylistContentItem): PlaylistTrack {
    return {
      uid: item.uid,
      addedAt: item.addedAt.isoString,
      addedBy: {
        name: item.addedBy.data.name,
        uri: item.addedBy.data.uri,
      },
      track: this.mapTrack(item.itemV2.data),
    };
  },

  /**
   * Map array of playlist content items
   */
  mapMany(items: PlaylistContentItem[]): PlaylistTrack[] {
    return items.map((item) => this.mapPlaylistTrack(item));
  },
};

// ============================================
// MAIN MAPPER
// ============================================

export function mapPlaylistApiToModel(api: PlaylistAPIContract): PlaylistModel {
  const playlist = api.data.playlistV2;
  if (!playlist) {
    throw new Error("Playlist data is null");
  }

  const coverSources = playlist.images?.items?.[0]?.sources || [];
  const tracks = TrackAdapter.mapMany(playlist.content.items);

  // Calculate total duration
  const totalDuration = tracks.reduce((acc, track) => {
    return acc + track.track.duration.totalSeconds;
  }, 0);

  return {
    profile: {
      uri: playlist.uri,
      name: playlist.name,
      description: playlist.description || "",
      isPublic: playlist.basePermission === "VIEWER",
      followers: playlist.followers || 0,
      following: playlist.following ?? false,
    },

    owner: {
      uri: playlist.ownerV2.data.uri,
      path: transformSpotifyUriToUrl(playlist.ownerV2.data.uri),
      name: playlist.ownerV2.data.name,
      username: playlist.ownerV2.data.username,
    },

    coverImage: {
      url: ImageAdapter.getBestQuality(coverSources, 640),
      sources: ImageAdapter.mapSources(coverSources),
    },

    visualIdentity: {
      extractedColorSet: {
        highContrast: playlist.visualIdentity?.squareCoverImage?.extractedColorSet?.highContrast || createDefaultColorTheme(),
        higherContrast: playlist.visualIdentity?.squareCoverImage?.extractedColorSet?.higherContrast || createDefaultColorTheme(),
        minContrast: playlist.visualIdentity?.squareCoverImage?.extractedColorSet?.minContrast || createDefaultColorTheme(),
      },
    },

    stats: {
      totalTracks: playlist.content.totalCount || 0,
      totalDuration,
      formattedDuration: formatDuration(totalDuration),
    },

    tracks,

    sharingInfo: {
      shareId: playlist.sharingInfo?.shareId || "",
      shareUrl: playlist.sharingInfo?.shareUrl || "",
    },

    watchFeedEntrypoint: {
      uri: playlist.watchFeedEntrypoint?.entrypointUri || "",
      thumbnailUrl: playlist.watchFeedEntrypoint?.thumbnailImage?.data?.sources?.[0]?.url || "",
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
