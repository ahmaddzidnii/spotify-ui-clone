import React from "react";
import { PlaylistTrackListHeader } from "./playlist-track-list-header";
import { PlaylistTrackRow } from "./playlist-track-row";
import type { PlaylistTrack } from "../model/content.model";

interface PlaylistTrackListProps {
  items: PlaylistTrack[];
}

export const PlaylistTrackList: React.FC<PlaylistTrackListProps> = ({ items }) => {
  return (
    <div className="pt-6 font-sans">
      <PlaylistTrackListHeader />
      <div className="flex flex-col">
        {items.map((item, index) => (
          <PlaylistTrackRow
            key={item.uid}
            track={item.track}
            index={index}
            addedAt={item.addedAt}
          />
        ))}
      </div>
    </div>
  );
};
