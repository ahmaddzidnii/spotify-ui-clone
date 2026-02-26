import { useRef, useState } from "react";
import { useParams } from "react-router";

import { useScrollTrigger } from "@/hooks/use-scroll-trigger";

import { rgbToHex } from "@/features/shared/formaters/format-color";

import { Button } from "@/components/ui/button";
import { ScrollArea, type ScrollAreaRef } from "@/components/scroll-area";
import { EncoreIconMoreOptions, EncoreIconShuffle } from "@/components/encore/icons";

import { TopTrackList } from "../components/top-track-list";
import { Footer } from "@/layouts/components/footer";
import { EntityError } from "@/features/error/components/entitiy-error";
import { ArtistPick } from "../components/artist-pick";
import { ArtistDiscography } from "../components/discography";
import { ArtistFeaturing } from "../components/featuring";
import { mapArtistApiToModel } from "../adapter/artist.adapter";
import { getArtistById } from "../data/artist.store";
import { ArtistProvider } from "../context/artist-page-context";
import { ArtistDiscoveredOn } from "../components/artist-discovered-on";

export const ArtistPage = () => {
  const { id } = useParams();
  const uri = `spotify:artist:${id}`;

  const rawArtistData = getArtistById(uri);

  if (!rawArtistData) {
    return <EntityError entityName="artist" />;
  }

  const artistModel = mapArtistApiToModel(rawArtistData);

  const scrollRef = useRef<ScrollAreaRef | null>(null);
  const isScrolled = useScrollTrigger(scrollRef, 50);
  const headerRef = useRef<HTMLDivElement>(null);
  const playButtonBottomRef = useRef<HTMLDivElement>(null);

  const [mustShowPlayButtonTop, setMustShowPlayButtonTop] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = (e.target as HTMLDivElement).scrollTop;

    const maxScroll = window.innerHeight * 0.4;

    // Menghitung rasio scroll (0 hingga 1)
    const progress = Math.min(scrollTop / maxScroll, 1);

    if (wrapperRef.current) {
      wrapperRef.current.style.setProperty("--scroll", progress.toString());
      headerRef.current?.style.setProperty("--scroll", progress.toString());
    }

    if (playButtonBottomRef.current) {
      const top = playButtonBottomRef.current.getBoundingClientRect().top;
      setMustShowPlayButtonTop(Math.floor(top) < 71);
    }
  };

  const colorSet = artistModel.visualIdentity.extractedColorSet;

  const colorBackgroundBase = rgbToHex(
    colorSet.higherContrast.backgroundBase.red,
    colorSet.higherContrast.backgroundBase.green,
    colorSet.higherContrast.backgroundBase.blue,
    colorSet.higherContrast.backgroundBase.alpha,
  );

  const colorBackgroundBase70 = `rgba(${colorSet.higherContrast.backgroundBase.red}, ${colorSet.higherContrast.backgroundBase.green}, ${colorSet.higherContrast.backgroundBase.blue}, 0.7)`;

  return (
    <ArtistProvider value={artistModel}>
      <header
        ref={headerRef}
        style={
          {
            "--background-base": colorBackgroundBase,
            visibility: isScrolled ? "visible" : "hidden",
            opacity: "calc(var(--scroll, 0) * 1.6)",
            backgroundColor: "var(--background-base)",
          } as React.CSSProperties
        }
        className="absolute inset-x-0 top-0 p-4  h-16 flex items-center z-1"
      >
        <div
          style={{
            visibility: mustShowPlayButtonTop ? "visible" : "hidden",
            opacity: mustShowPlayButtonTop ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
          className="flex items-center gap-2"
        >
          <button className="flex items-center justify-center bg-[#1ed760] p-2 rounded-full w-12 h-12">
            <svg
              role="img"
              viewBox="0 0 16 16"
              className="w-6 h-6 fill-background-base"
            >
              <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"></path>
            </svg>
          </button>
          <span className="font-semibold text-3xl">{artistModel.profile.name}</span>
        </div>
      </header>
      <div className="before-scroll-node">
        <div ref={wrapperRef}>
          <div className="sticky top-0 z-50 h-0 w-full overflow-visible"></div>
          <div
            style={{
              backgroundImage: `url(${artistModel.headerImage.images[0]?.url || ""})`,
              backgroundPosition: "50% 15%",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              zIndex: 0,
            }}
            className="h-[40dvh] flex items-end absolute top-0 left-0 w-full animate-spotify-scroll"
          />
          <div
            style={{
              background: "linear-gradient(#0000 0%, #00000080 100%), var(--background-noise)",
            }}
            className="absolute top-0 left-0 h-full w-full z-0"
          />
          <div
            style={{
              backgroundColor: `rgba(${colorSet.higherContrast.backgroundBase.red}, ${colorSet.higherContrast.backgroundBase.green}, ${colorSet.higherContrast.backgroundBase.blue}, calc(var(--scroll, 0) * 2.3))`,
            }}
            className="absolute top-0 left-0 h-full w-full z-0"
          />
        </div>
      </div>
      <ScrollArea
        className="flex-1"
        ref={scrollRef}
        onScrollCapture={handleScroll}
      >
        <div className="h-[40dvh] flex items-end relative z-10">
          <div className="flex flex-col p-4 z-1 flex-1">
            <p
              style={{
                fontFamily: "var(--font-display)",
              }}
              className="text-[76px] font-extrabold tracking-tight"
            >
              {artistModel.profile.name}
            </p>
            <p className="mt-2">{artistModel.stats.formatedMonthlyListeners} monthly listeners</p>
          </div>
        </div>
        <div className="pb-24 mt-4 bg-background-base relative z-0">
          <div
            style={
              {
                "--background-base-70": colorBackgroundBase70,
                background: `linear-gradient(to bottom, var(--background-base-70), transparent)`,
              } as React.CSSProperties
            }
            className="-z-1  absolute top-0 left-0 w-full h-43.25"
          />
          <div className="flex flex-col -mt-1 p-6">
            <div
              className="flex items-center"
              ref={playButtonBottomRef}
            >
              <button className="flex items-center justify-center bg-[#1ed760] p-2 rounded-full size-14">
                <svg
                  role="img"
                  viewBox="0 0 16 16"
                  className="w-6 h-6 fill-background-base"
                >
                  <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"></path>
                </svg>
              </button>

              {/* TODO: Add watchFeedEntrypoint to model */}
              <div className="ml-6">
                <div
                  role="button"
                  className="w-9.5 h-12 rounded-xl border-2 border-text-subdued flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={artistModel.watchFeedEntrypoint.thumbnailImage}
                    alt={"Watch Feed"}
                  />
                </div>
              </div>

              <div className="ml-6">
                <Button variant="tertiary">
                  <EncoreIconShuffle className="size-7" />
                </Button>
              </div>

              <div className="ml-6">
                <button className="ms-auto rounded-2xl border-white border px-4 h-8 font-bold text-sm">Follow</button>
              </div>
              <div className="ml-6">
                <Button variant="tertiary">
                  <EncoreIconMoreOptions className="size-7" />
                </Button>
              </div>
            </div>
            <TopTrackList />
            <ArtistPick />
            <ArtistDiscography />
            <ArtistFeaturing />
            {/* <ArtistAbout /> */}
            <ArtistDiscoveredOn />
            {/* <ArtistPlaylist /> */}
            {/* <RelatedArtist /> */}
            {/* <AppearsOn />  */}
          </div>
        </div>
        <Footer />
      </ScrollArea>
    </ArtistProvider>
  );
};
