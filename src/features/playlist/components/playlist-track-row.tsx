import React from "react";
import { Link } from "react-router";
import { EncoreIconPlay, EncoreIconCheck } from "@/components/encore/icons";
import { formatRelativeTime } from "@/features/shared/formaters/date";
import { Image } from "@/components/image";
import type { Track } from "../model/content.model";
import type { ImageSource } from "../model/shared.types";

interface PlaylistTrackRowProps {
  track: Track;
  index: number;
  addedAt: string;
  isPlaying?: boolean;
  isSaved?: boolean;
}

const buildSrcSet = (sources: ImageSource[]) => {
  return sources
    .filter((source) => source.width)
    .sort((a, b) => (a.width || 0) - (b.width || 0))
    .map((source) => `${source.url} ${source.width}w`)
    .join(", ");
};

export const PlaylistTrackRow: React.FC<PlaylistTrackRowProps> = ({ track, index, addedAt, isPlaying = false, isSaved = false }) => {
  const albumCoverSrcSet = buildSrcSet(track.album.sources);
  const albumCoverUrl = track.album.coverUrl;

  return (
    <div
      className={`group grid grid-cols-[40px_minmax(0,6fr)_minmax(0,4fr)_minmax(0,3fr)_minmax(120px,auto)] gap-4 px-4 py-2 rounded-md items-center cursor-pointer transition-colors ${"hover:bg-background-elevated-highlight"}`}
    >
      {/* 1. Index & Play/Pause Icon */}
      <div className="flex items-center justify-center w-6 h-6 ml-1 text-text-subdued">
        {isPlaying ? (
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-white"
          >
            <path d="M8 5.14v14l11-7-11-7z"></path>
          </svg>
        ) : (
          <>
            <span className="text-base group-hover:hidden">{index + 1}</span>
            <EncoreIconPlay
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-white hidden group-hover:block"
            />
          </>
        )}
      </div>

      <div className="flex items-center gap-3 overflow-hidden pr-4">
        <Image
          src={albumCoverUrl}
          srcSet={albumCoverSrcSet}
          sizes="40px"
          alt="Album cover"
          className="w-10 h-10 rounded-sm object-cover shrink-0"
        />
        <div className="flex flex-col overflow-hidden">
          <span className={`text-base font-normal truncate ${isPlaying ? "text-[#1ed760]" : "text-white"}`}>{track.name}</span>
          <span className="text-[13px] text-text-subdued truncate group-hover:text-white transition-colors mt-0.5 flex items-center gap-1.5">
            {track.artists.map((artist, i) => (
              <Link
                key={artist.uri}
                to={artist.path}
              >
                {artist.name}
                {i < track.artists.length - 1 && ", "}
              </Link>
            ))}
          </span>
        </div>
      </div>

      <div className="text-sm text-text-subdued truncate group-hover:text-white transition-colors pr-4">{track.album.name}</div>

      <div className="text-sm text-text-subdued truncate pr-4">{formatRelativeTime(addedAt)}</div>

      <div className="flex items-center justify-end gap-4">
        {isSaved && (
          <EncoreIconCheck
            viewBox="0 0 16 16"
            className="size-4.5 fill-[#1ed760]"
          />
        )}

        <span className="text-sm text-text-subdued w-8 text-right tabular-nums">{track.duration.formatted}</span>

        <button
          aria-label="More options"
          className={`${"opacity-0 group-hover:opacity-100"} transition-opacity text-text-subdued hover:text-white`}
        >
          <svg
            viewBox="0 0 16 16"
            className="w-4 h-4 fill-current transition-colors"
          >
            <path d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
