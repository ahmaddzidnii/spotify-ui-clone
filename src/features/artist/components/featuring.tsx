import { useEffect, useRef, useState } from "react";

import { cn } from "@/utils/cn";
import { useArtistFeaturingPlaylists, useArtistProfile } from "../context/artist-page-context";

import { MediaCard } from "@/features/shared/components/media-card";

export const ArtistFeaturing = () => {
  const featuringPlaylists = useArtistFeaturingPlaylists();
  const profile = useArtistProfile();
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
      <h2 className="font-semibold text-2xl mb-4">Featuring {profile.name}</h2>

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
          {featuringPlaylists.map((playlist) => (
            <MediaCard
              key={playlist.id}
              title={playlist.name}
              subtitle={playlist.description}
              imageSources={playlist.coverSources}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
