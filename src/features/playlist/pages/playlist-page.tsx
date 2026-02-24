import { useMemo, useRef, useState } from "react";
import { useParams } from "react-router";

import { useScrollTrigger } from "@/hooks/use-scroll-trigger";

import { rgbToHex } from "@/features/shared/formaters/format-color";

import { ScrollArea, type ScrollAreaRef } from "@/components/scroll-area";
import { Footer } from "@/layouts/components/footer";
import { playlists } from "@/data/playlists";
import { EntityError } from "@/features/error/components/entitiy-error";

import { PlaylistHeader, PlaylistHero, PlaylistActionBar, PlaylistTrackList } from "../components";

export const PlaylistPage = () => {
  const { id } = useParams();
  const uri = `spotify:playlist:${id}`;
  const playlist = playlists[uri as keyof typeof playlists] || null;

  const scrollRef = useRef<ScrollAreaRef | null>(null);
  const isScrolled = useScrollTrigger(scrollRef, 50);
  const headerRef = useRef<HTMLDivElement>(null);
  const playButtonBottomRef = useRef<HTMLDivElement>(null);

  const [mustShowPlayButtonTop, setMustShowPlayButtonTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = (e.target as HTMLDivElement).scrollTop;
    const maxScroll = window.innerHeight * 0.4;
    const progress = Math.min(scrollTop / maxScroll, 1);

    setScrollProgress(progress);

    if (playButtonBottomRef.current) {
      const top = playButtonBottomRef.current.getBoundingClientRect().top;
      setMustShowPlayButtonTop(Math.floor(top) < 71);
    }
  };

  if (!playlist) {
    return <EntityError entityName="playlist" />;
  }

  const content = playlist.content;

  const totalDuration = useMemo(() => {
    return content.items.reduce((acc, item) => acc + item.itemV2.data.trackDuration.totalMilliseconds / 1000, 0);
  }, [content.items]);

  const totalTracks = content.totalCount;

  const visualIdentity = playlist.visualIdentity.squareCoverImage.extractedColorSet;
  const colorBackgroundBase = rgbToHex(
    visualIdentity.higherContrast.backgroundBase.red,
    visualIdentity.higherContrast.backgroundBase.green,
    visualIdentity.higherContrast.backgroundBase.blue,
    visualIdentity.higherContrast.backgroundBase.alpha,
  );

  const colorBackgroundBase70 = `rgba(${visualIdentity.higherContrast.backgroundBase.red}, ${visualIdentity.higherContrast.backgroundBase.green}, ${visualIdentity.higherContrast.backgroundBase.blue}, 0.7)`;

  const colorBackgroundBaseMinContrast = rgbToHex(
    visualIdentity.minContrast.backgroundBase.red,
    visualIdentity.minContrast.backgroundBase.green,
    visualIdentity.minContrast.backgroundBase.blue,
    visualIdentity.minContrast.backgroundBase.alpha,
  );

  return (
    <>
      <PlaylistHeader
        playlistName={playlist.name}
        isScrolled={isScrolled}
        mustShowPlayButton={mustShowPlayButtonTop}
        backgroundColor={colorBackgroundBase}
        scrollProgress={scrollProgress}
        headerRef={headerRef}
      />
      <ScrollArea
        className="flex-1"
        ref={scrollRef}
        onScrollCapture={handleScroll}
      >
        <PlaylistHero
          playlistName={playlist.name}
          coverImageSources={playlist.images.items[0].sources}
          owner={{
            uri: playlist.ownerV2.data.uri,
            name: playlist.ownerV2.data.name,
          }}
          totalTracks={totalTracks}
          totalDuration={totalDuration}
          backgroundColor={colorBackgroundBase}
          backgroundColorMinContrast={colorBackgroundBaseMinContrast}
        />
        <div className="min-h-screen bg-background-base relative z-0">
          <div
            style={
              {
                "--background-base-70": colorBackgroundBase70,
                height: "173px",
                background: `linear-gradient(to bottom, var(--background-base-70), transparent)`,
              } as React.CSSProperties
            }
            className="-z-1  absolute top-0 left-0 w-full"
          />
          <div className="flex flex-col -mt-1 p-6">
            <PlaylistActionBar
              watchFeedThumbnail={playlist.watchFeedEntrypoint.thumbnailImage.data.sources[0].url}
              playButtonRef={playButtonBottomRef}
            />
            <div>
              <PlaylistTrackList items={content.items} />
            </div>
          </div>
        </div>
        <Footer />
      </ScrollArea>
    </>
  );
};
