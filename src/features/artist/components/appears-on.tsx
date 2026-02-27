import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";
import { AlbumCard } from "@/features/shared/components/album-card";
import { useAppearsOnReleases } from "../context/artist-page-context";

export const AppearsOn = () => {
  const appearsOn = useAppearsOnReleases();

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

  return (
    <div className="mt-8">
      <h2 className="font-semibold text-2xl mb-4">Appears on</h2>
      <div>
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
          {appearsOn.map((album) => (
            <AlbumCard
              key={album.id}
              name={album.name}
              coverArtSources={album.coverArt.sources}
              releaseYear={album.releaseDate.year}
              albumType={album.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
