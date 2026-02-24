import React from "react";
import { Button } from "@/components/ui/button";
import { EncoreIconShuffle, EncoreIconDownload, EncoreIconPersonPlus, EncoreIconMoreOptions } from "@/components/encore/icons";

interface PlaylistActionBarProps {
  watchFeedThumbnail: string;
  playButtonRef?: React.RefObject<HTMLDivElement | null>;
}

export const PlaylistActionBar: React.FC<PlaylistActionBarProps> = ({ watchFeedThumbnail, playButtonRef }) => {
  return (
    <div
      className="flex items-center"
      ref={playButtonRef}
    >
      <button className="flex items-center justify-center bg-[#1ed760] p-2 rounded-full size-14">
        <svg
          role="img"
          viewBox="0 0 16 16"
          className="w-6 h-6 fill-background-base"
        >
          <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"></path>
        </svg>
      </button>

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
            src={watchFeedThumbnail}
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
