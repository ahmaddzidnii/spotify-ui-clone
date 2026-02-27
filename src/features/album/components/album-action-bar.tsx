import React from "react";
import { Button } from "@/components/ui/button";
import { PlayButton } from "@/components/ui/play-button";
import { EncoreIconShuffle, EncoreIconPlus, EncoreIconDownload, EncoreIconMoreOptions } from "@/components/encore/icons";
import { useAlbumWatchFeed } from "../context/album-page-context";

interface AlbumActionBarProps {
  playButtonRef?: React.RefObject<HTMLDivElement | null>;
}

export const AlbumActionBar: React.FC<AlbumActionBarProps> = ({ playButtonRef }) => {
  const watchFeed = useAlbumWatchFeed();
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
          className="rounded-xl border-2 border-text-subdued flex items-center justify-center overflow-hidden relative"
        >
          <img
            src={watchFeed?.thumbnailImageUrl || ""}
            alt=""
            className="absolute object-cover aspect-9/16"
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
          <EncoreIconPlus className="size-7" />
        </Button>
      </div>
      <div className="ml-6">
        <Button variant="tertiary">
          <EncoreIconDownload className="size-8" />
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
