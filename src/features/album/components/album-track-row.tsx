import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { EncoreIconPlay, EncoreIconPlus, EncoreIconCheck } from "@/components/encore/icons";
import { transformSpotifyUriToUrl } from "@/features/shared/parsers/parse-uri";
import { formatDuration } from "@/features/shared/formaters/format.duration";
import type { Track } from "../model/content.model";

interface AlbumTrackRowProps {
  track: Track;
  index: number;
}

export const AlbumTrackRow: React.FC<AlbumTrackRowProps> = ({ track, index }) => {
  return (
    <div className="group grid grid-cols-[40px_1fr_auto] gap-4 px-4 py-2 rounded-md items-center cursor-pointer transition-colors hover:bg-background-elevated-highlight">
      <div className="flex items-center justify-center w-6 h-6 ml-1 text-text-subdued">
        <span className="text-base group-hover:hidden">{index + 1}</span>
        <EncoreIconPlay
          viewBox="0 0 24 24"
          className="w-4 h-4 fill-white hidden group-hover:block"
        />
      </div>

      <div className="flex flex-col overflow-hidden">
        <span className="text-[15px] truncate text-white">{track.name}</span>
        <div className="flex">
          {track.artists.map((artist, i) => (
            <span
              key={artist.name}
              className="text-[13px] text-text-subdued truncate group-hover:text-white transition-colors mt-0.5"
            >
              <Link to={transformSpotifyUriToUrl(artist.uri)}>{artist.name}</Link>
              {i < track.artists.length - 1 && ","}
              &nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-5">
        {track.isSaved ? (
          <EncoreIconCheck
            viewBox="0 0 16 16"
            className="size-4.5 fill-[#1ed760]"
          />
        ) : (
          <Button
            variant="tertiary"
            aria-label="Add to Liked Songs"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <EncoreIconPlus
              viewBox="0 0 16 16"
              className="w-4 h-4 fill-current transition-colors"
            />
          </Button>
        )}

        <span className="text-sm text-text-subdued w-8 text-right">{formatDuration(track.duration.totalMilliseconds / 1000)}</span>

        <button
          aria-label="More options"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
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
