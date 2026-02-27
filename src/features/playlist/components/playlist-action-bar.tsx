import React from "react";
import { Button } from "@/components/ui/button";
import { PlayButton } from "@/components/ui/play-button";
import { EncoreIconShuffle, EncoreIconDownload, EncoreIconPersonPlus, EncoreIconMoreOptions } from "@/components/encore/icons";
import { usePlaylistWatchFeedEntrypoint } from "../context/playlist-page-context";

interface PlaylistActionBarProps {
  playButtonRef?: React.RefObject<HTMLDivElement | null>;
}

export const PlaylistActionBar: React.FC<PlaylistActionBarProps> = ({ playButtonRef }) => {
  const watchFeedEntrypoint = usePlaylistWatchFeedEntrypoint();
  return (
    <div
      className="flex items-center"
      ref={playButtonRef}
    >
      <PlayButton size="md" />

      <div className="ml-6">
        <div
          role="button"
          style={{
            width: "38px",
            height: "48px",
          }}
          className="rounded-xl border-2 border-text-subdued flex items-center justify-center overflow-hidden"
        >
          <img
            src={watchFeedEntrypoint.thumbnailUrl}
            alt=""
          />
        </div>
      </div>

      <div className="ml-6">
        <Button variant="tertiary">
          <EncoreIconShuffle className="size-7" />
        </Button>
      </div>
      <div className="ml-6">
        <Button variant="tertiary">
          <EncoreIconDownload className="size-8" />
        </Button>
      </div>
      <div className="ml-6">
        <Button variant="tertiary">
          <EncoreIconPersonPlus className="size-8" />
        </Button>
      </div>
      <div className="ml-6">
        <Button variant="tertiary">
          <EncoreIconMoreOptions className="size-7" />
        </Button>
      </div>
    </div>
  );
};
