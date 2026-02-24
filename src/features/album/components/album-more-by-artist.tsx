import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { AlbumCard } from "./album-card";

interface Album {
  id: string;
  name: string;
  coverArt: {
    sources: Array<{ url: string }>;
  };
  date: {
    year: number;
  };
}

interface AlbumMoreByArtistProps {
  artistName: string;
  albums: Album[];
  currentAlbumId?: string;
}

export const AlbumMoreByArtist: React.FC<AlbumMoreByArtistProps> = ({ artistName, albums, currentAlbumId }) => {
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    if (!gridContainerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const containerWidth = entry.contentRect.width;
        const minColumnWidth = 180;
        const gridGap = 0;

        const calculatedColumns = Math.floor((containerWidth + gridGap) / (minColumnWidth + gridGap));
        setVisibleCount(calculatedColumns > 0 ? calculatedColumns : 1);
      }
    });

    observer.observe(gridContainerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const filteredAlbums = albums.filter((album) => album.id !== currentAlbumId);

  return (
    <div className="mt-16 flex flex-col">
      <h2 className="font-bold text-2xl">More by {artistName}</h2>
      <div
        ref={gridContainerRef}
        style={
          {
            "--min-column-width": "180px",
            "--row-count": 1,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(var(--min-column-width), 1fr))",
            gridAutoRows: 0,
            gridTemplateRows: "repeat(var(--row-count), minmax(0, 1fr))",
          } as React.CSSProperties
        }
        className={cn("mt-4", `nrVisibleCards-${visibleCount}`)}
      >
        {filteredAlbums.map((album) => (
          <AlbumCard
            key={album.id}
            id={album.id}
            name={album.name}
            coverArtUrl={album.coverArt.sources[0].url}
            releaseYear={album.date.year}
          />
        ))}
      </div>
    </div>
  );
};
