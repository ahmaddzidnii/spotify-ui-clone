import React from "react";
import { EncoreIconClock } from "@/components/encore/icons";

export const PlaylistTrackListHeader: React.FC = () => {
  return (
    <div className="grid grid-cols-[40px_minmax(0,6fr)_minmax(0,4fr)_minmax(0,3fr)_minmax(120px,auto)] gap-4 px-4 py-2 border-b border-background-elevated-highlight text-text-subdued font-normal text-sm mb-2 items-center">
      <div className="text-center">#</div>
      <div>Title</div>
      <div>Album</div>
      <div>Date added</div>
      <div className="flex items-center justify-end pr-8 gap-2">
        <EncoreIconClock className="size-4" />
      </div>
    </div>
  );
};
