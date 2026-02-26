import React, { useRef, useState } from "react";
import { useParams } from "react-router";

import { useScrollTrigger } from "@/hooks/use-scroll-trigger";

import { ScrollArea, type ScrollAreaRef } from "@/components/scroll-area";
import { Footer } from "@/layouts/components/footer";
import { rgbToHex } from "@/features/shared/formaters/format-color";
import { EntityError } from "@/features/error/components/entitiy-error";

import { AlbumHeader, AlbumHero, AlbumActionBar, AlbumTrackList, AlbumCopyright, AlbumMoreByArtist } from "../components";
import { getAlbumById } from "../data/album.store";
import { mapAlbumApiToModel } from "../adapter/album.adapter";
import { AlbumProvider } from "../context/album-page-context";

export const AlbumPage = () => {
  const { id } = useParams();

  const uri = `spotify:album:${id}`;
  const rawAlbumData = getAlbumById(uri);

  if (!rawAlbumData) {
    return <EntityError entityName="album" />;
  }

  const album = mapAlbumApiToModel(rawAlbumData);

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

  const visualIdentity = album.visualIdentity.extractedColorSet;
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
    <AlbumProvider value={album}>
      <AlbumHeader
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
        <AlbumHero
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
            <AlbumActionBar playButtonRef={playButtonBottomRef} />
            <div>
              <AlbumTrackList />
            </div>
            <AlbumCopyright />
            <AlbumMoreByArtist currentAlbumId={id} />
          </div>
        </div>
        <Footer />
      </ScrollArea>
    </AlbumProvider>
  );
};
