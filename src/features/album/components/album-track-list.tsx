import React from "react";
import { AlbumTrackListHeader } from "./album-track-list-header";
import { AlbumTrackRow } from "./album-track-row";
import { useAlbumTracks } from "../context/album-page-context";

export const AlbumTrackList: React.FC = () => {
  const tracks = useAlbumTracks();
  return (
    <div className="pt-6 font-sans">
      <AlbumTrackListHeader />
      <div className="flex flex-col">
        {tracks.map((track, index) => (
          <AlbumTrackRow
            key={track.uid}
            track={track}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};
