import React from "react";
import { EncoreIconClock } from "@/components/encore/icons";

export const AlbumTrackListHeader: React.FC = () => {
  return (
    <div className="grid grid-cols-[40px_1fr_auto] gap-4 px-4 py-2 border-b border-background-elevated-highlight text-text-subdued font-semibold text-sm mb-2 items-center">
      <div className="text-center font-normal">#</div>
      <div className="font-normal">Title</div>
      <div className="flex items-center justify-end pr-8 gap-2">
        <EncoreIconClock className="size-4" />
      </div>
    </div>
  );
};
