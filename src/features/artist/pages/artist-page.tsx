import { EncoreIconMoreOptions, EncoreIconShuffle } from "@/components/encore/icons";
import { Image } from "@/components/image";
import { ScrollArea, type ScrollAreaRef } from "@/components/scroll-area";
import { Button } from "@/components/ui/button";
import { useScrollTrigger } from "@/hooks/use-scroll-trigger";
import { useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { TrackList } from "../components/track-list";
import { getArtistById } from "@/data/artists";
import { formatNumber } from "@/features/shared/formaters/format-number";
import { hexToRgb } from "@/features/shared/formaters/format-color";
import { EncoreIconInfo } from "@/components/encore/icons/encore-icon-info";
export const ArtistPage = () => {
  const { id } = useParams();

  const artist = getArtistById(id!);

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

  if (!artist) {
    return (
      <div className="flex items-center justify-center h-full flex-col gap-4">
        <EncoreIconInfo className="size-16" />
        <p className="text-3xl font-bold">Something went wrong while loading the artist.</p>
        <p className="text-base font-medium">Search for something else?</p>
      </div>
    );
  }

  const { r, g, b } = hexToRgb(artist.cover.dominantColor);

  return (
    <>
      <header
        ref={headerRef}
        style={{
          visibility: isScrolled ? "visible" : "hidden",
          opacity: "calc(var(--scroll, 0) * 1.6)",
          backgroundColor: `rgba(${r}, ${g}, ${b}`,
        }}
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
          <span className="font-semibold text-3xl">{artist.name}</span>
        </div>
      </header>
      <div className="before-scroll-node">
        <div ref={wrapperRef}>
          <div className="sticky top-0 z-50 h-0 w-full overflow-visible"></div>
          <div
            style={{
              backgroundImage: `url(${artist.cover.url})`,
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
              backgroundColor: `rgba(${r}, ${g}, ${b}, calc(var(--scroll, 0) * 2.3))`,
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
              {artist.name}
            </p>
            <p className="mt-2">{formatNumber(artist.monthlyListeners)} monthly listeners</p>
          </div>
        </div>
        <div className="min-h-screen pb-24 mt-4 bg-background-base relative z-0">
          <div
            style={{
              background: `linear-gradient(to bottom, rgba(${r},${g},${b}), transparent)`,
            }}
            className="-z-1  absolute top-0 left-0 w-full h-[173px]"
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
              {artist.tracks.metadata.videoPreview.present && (
                <div className="ml-6">
                  <div
                    role="button"
                    className="w-[38px] h-[48px] rounded-xl border-2 border-text-subdued flex items-center justify-center overflow-hidden"
                  >
                    <img
                      src={artist.tracks.metadata.videoPreview.thumbnailUrl}
                      alt={`Track video preview thumbnail for ${artist.name}`}
                    />
                  </div>
                </div>
              )}
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
            <div>
              <h2 className="font-semibold text-2xl mt-8 mb-4">Popular</h2>
              <TrackList tracks={artist.tracks.data} />
              <Button
                variant="tertiary"
                className="text-sm mt-4 font-semibold text-text-subdued hover:scale-100"
              >
                See more
              </Button>
            </div>
            <div>
              <h2 className="font-semibold text-2xl mt-8 mb-4">Artist Pick</h2>
              <div className="flex">
                <div className="relative size-22 aspect-square overflow-hidden rounded-xl me-4">
                  <Image
                    alt="Image"
                    src="https://i.scdn.co/image/ab67616d00001e02d96453e606852f7868e15963"
                    className="object-cover object-center w-full h-full"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2 text-sm">
                    <div className="size-6 aspect-square overflow-hidden rounded-full">
                      <Image
                        alt="Image"
                        src="https://i.scdn.co/image/ab6761610000101f07189aefe72bf176ecd0b2ab"
                        className="object-cover object-center w-full h-full"
                      />
                    </div>
                    <span className="text-text-subdued">Posted By JKT48</span>
                  </div>
                  <Link
                    to="/album/0eIpkNRhkvjZFnik8x8Ao3"
                    className="font-semibold text-lg"
                  >
                    Andai 'Ku Bukan Idola
                  </Link>
                  <p className="text-sm text-text-subdued mt-1">Single</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  );
};
