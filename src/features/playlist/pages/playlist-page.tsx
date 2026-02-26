import { useRef, useState } from "react";
import { useParams } from "react-router";

import { useScrollTrigger } from "@/hooks/use-scroll-trigger";

import { rgbToHex } from "@/features/shared/formaters/format-color";

import { ScrollArea, type ScrollAreaRef } from "@/components/scroll-area";
import { Footer } from "@/layouts/components/footer";
import { EntityError } from "@/features/error/components/entitiy-error";

import { PlaylistHeader, PlaylistHero, PlaylistActionBar, PlaylistTrackList } from "../components";
import { mapPlaylistApiToModel } from "../adapter/playlist.adapter";
import { getPlaylistById } from "../data/playlist.store";
import { PlaylistProvider } from "../context/playlist-page-context";

export const PlaylistPage = () => {
  const { id } = useParams();
  const uri = `spotify:playlist:${id}`;

  const rawPlaylistData = getPlaylistById(uri);

  if (!rawPlaylistData) {
    return <EntityError entityName="playlist" />;
  }

  const playlistModel = mapPlaylistApiToModel(rawPlaylistData);

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

  const colorSet = playlistModel.visualIdentity.extractedColorSet;

  const colorBackgroundBase = rgbToHex(
    colorSet.higherContrast.backgroundBase.red,
    colorSet.higherContrast.backgroundBase.green,
    colorSet.higherContrast.backgroundBase.blue,
    colorSet.higherContrast.backgroundBase.alpha,
  );

  const colorBackgroundBase70 = `rgba(${colorSet.higherContrast.backgroundBase.red}, ${colorSet.higherContrast.backgroundBase.green}, ${colorSet.higherContrast.backgroundBase.blue}, 0.7)`;

  const colorBackgroundBaseMinContrast = rgbToHex(
    colorSet.minContrast.backgroundBase.red,
    colorSet.minContrast.backgroundBase.green,
    colorSet.minContrast.backgroundBase.blue,
    colorSet.minContrast.backgroundBase.alpha,
  );

  return (
    <PlaylistProvider value={playlistModel}>
      <PlaylistHeader
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
            <PlaylistActionBar playButtonRef={playButtonBottomRef} />
            <div>
              <PlaylistTrackList items={playlistModel.tracks} />
            </div>
          </div>
        </div>
        <Footer />
      </ScrollArea>
    </PlaylistProvider>
  );
};
