import React from "react";
import { AlbumTrackListHeader } from "./album-track-list-header";
import { AlbumTrackRow } from "./album-track-row";

interface Track {
  uid: string;
  track: {
    name: string;
    duration: {
      totalMilliseconds: number;
    };
    saved: boolean;
    artists: {
      items: Array<{
        uri: string;
        profile: {
          name: string;
        };
      }>;
    };
  };
}

interface AlbumTrackListProps {
  tracks: Track[];
}

export const AlbumTrackList: React.FC<AlbumTrackListProps> = ({ tracks }) => {
  return (
    <div className="pt-6 font-sans">
      <AlbumTrackListHeader />
      <div className="flex flex-col">
        {tracks.map((track, index) => (
          <AlbumTrackRow
            key={track.uid}
            track={track.track}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};
