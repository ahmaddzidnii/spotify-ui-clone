import { Chip } from "@/components/ui/chip";
import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";
import { DiscographyCard } from "./discography-card";
import { useArtistDiscography } from "../context/artist-page-context";

const TabEnum = {
  PopularReleases: "popular-releases",
  Albums: "albums",
  SinglesAndEPs: "singles-and-eps",
} as const;

export const ArtistDiscography = () => {
  const discography = useArtistDiscography();
  const [activeTab, setActiveTab] = useState<(typeof TabEnum)[keyof typeof TabEnum]>(TabEnum.PopularReleases);

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

  const getDisplayData = () => {
    switch (activeTab) {
      case TabEnum.Albums:
        return discography.albums;
      case TabEnum.SinglesAndEPs:
        return discography.singlesAndEPs;
      default:
        return discography.popularReleases;
    }
  };

  const albumsToDisplay = getDisplayData();

  const hasData = (tab: (typeof TabEnum)[keyof typeof TabEnum]) => {
    switch (tab) {
      case TabEnum.PopularReleases:
        return discography.popularReleases.length > 0;
      case TabEnum.Albums:
        return discography.albums.length > 0;
      case TabEnum.SinglesAndEPs:
        return discography.singlesAndEPs.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="mt-8">
      <h2 className="font-semibold text-2xl mb-4">Discography</h2>
      <div className="flex my-4">
        {hasData(TabEnum.PopularReleases) && (
          <Chip
            variant={activeTab === TabEnum.PopularReleases ? "active" : "inactive"}
            className="mr-4"
            onClick={() => {
              setActiveTab(TabEnum.PopularReleases);
            }}
          >
            Popular Releases
          </Chip>
        )}

        {hasData(TabEnum.Albums) && (
          <Chip
            variant={activeTab === TabEnum.Albums ? "active" : "inactive"}
            className="mr-4"
            onClick={() => {
              setActiveTab(TabEnum.Albums);
            }}
          >
            Albums
          </Chip>
        )}

        {hasData(TabEnum.SinglesAndEPs) && (
          <Chip
            variant={activeTab === TabEnum.SinglesAndEPs ? "active" : "inactive"}
            className="mr-4"
            onClick={() => {
              setActiveTab(TabEnum.SinglesAndEPs);
            }}
          >
            Singles and EPs
          </Chip>
        )}
      </div>
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
          {albumsToDisplay.map((album) => (
            <DiscographyCard
              key={album.id}
              name={album.name}
              coverArtSources={album.coverArt.sources}
              releaseYear={album.releaseDate.year}
              type={album.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
