import type { Track } from "./tracks";
import { ARTIST_METADATA, ARTISTS, TRACKS, type Artist, type ArtistMetadata, type ArtistWithTracks } from "./artists";

export const getArtistById = (id: string): Artist | null => {
  return ARTISTS.find((artist) => artist.id === id) ?? null;
};

export const getTracksByArtistId = (artistId: string): Track[] => {
  return TRACKS.filter((track) => track.artistId === artistId);
};

export const getArtistMetadata = (artistId: string): ArtistMetadata | null => {
  return ARTIST_METADATA.find((meta) => meta.artistId === artistId) ?? null;
};

export const getArtistWithTracks = (artistId: string): ArtistWithTracks | null => {
  const artist = getArtistById(artistId);
  if (!artist) return null;

  const tracks = getTracksByArtistId(artistId);
  const metadata = getArtistMetadata(artistId);

  return {
    ...artist,
    tracks: {
      metadata: {
        videoPreview: metadata?.videoPreview ?? {
          present: false,
          thumbnailUrl: "",
        },
      },
      data: tracks,
    },
  };
};

export const getSavedTracks = (): Track[] => {
  return TRACKS.filter((track) => track.isSaved);
};

export const getMusicVideoTracks = (): Track[] => {
  return TRACKS.filter((track) => track.isMusicVideo);
};

export const getActiveTrack = (): Track | null => {
  return TRACKS.find((track) => track.isActive) ?? null;
};

export const getTrackById = (trackId: string): Track | null => {
  return TRACKS.find((track) => track.id === trackId) ?? null;
};

export const getTrackCountByArtist = (): Record<string, number> => {
  return TRACKS.reduce(
    (acc, track) => {
      acc[track.artistId] = (acc[track.artistId] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
};

export const getArtistsByPopularity = (): Artist[] => {
  return [...ARTISTS].sort((a, b) => b.monthlyListeners - a.monthlyListeners);
};

export const getTracksByArtistIds = (artistIds: string[]): Track[] => {
  return TRACKS.filter((track) => artistIds.includes(track.artistId));
};
