import React from "react";
import { PlaylistTrackListHeader } from "./playlist-track-list-header";
import { PlaylistTrackRow } from "./playlist-track-row";

interface ImageSource {
  url: string;
  width?: number;
  height?: number;
}

interface Artist {
  uri: string;
  profile: {
    name: string;
  };
}

interface Album {
  name: string;
  coverArt: {
    sources: ImageSource[];
  };
}

interface Track {
  name: string;
  uri: string;
  albumOfTrack: Album;
  artists: {
    items: Artist[];
  };
  trackDuration: {
    totalMilliseconds: number;
  };
}

interface PlaylistItem {
  uid: string;
  addedAt: {
    isoString: string;
  };
  itemV2: {
    data: Track;
  };
}

interface PlaylistTrackListProps {
  items: PlaylistItem[];
}

export const PlaylistTrackList: React.FC<PlaylistTrackListProps> = ({ items }) => {
  return (
    <div className="pt-6 font-sans">
      <PlaylistTrackListHeader />
      <div className="flex flex-col">
        {items.map((item, index) => (
          <PlaylistTrackRow
            key={item.uid}
            track={item.itemV2.data}
            index={index}
            addedAt={item.addedAt.isoString}
          />
        ))}
      </div>
    </div>
  );
};
