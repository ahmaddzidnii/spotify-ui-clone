import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { AlbumCard } from "./album-card";
import { useAlbumArtists, useMoreAlbumsByArtist } from "../context/album-page-context";
import type { AlbumRelease } from "../model/releases.model";

interface AlbumMoreByArtistProps {
  currentAlbumId?: string;
}

export const AlbumMoreByArtist: React.FC<AlbumMoreByArtistProps> = ({ currentAlbumId }) => {
  const artists = useAlbumArtists();
  const moreAlbums = useMoreAlbumsByArtist();

  const artistName = artists[0]?.name || "";
  const albums = moreAlbums.popularReleases || [];
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

  const filteredAlbums: AlbumRelease[] = albums.filter((album) => album.id !== currentAlbumId);

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
            name={album.name}
            coverArtSources={album.coverSources}
            releaseYear={album.releaseYear}
          />
        ))}
      </div>
    </div>
  );
};
