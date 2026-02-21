import { EncoreIconCheck, EncoreIconMoreOptions, EncoreIconPlay, EncoreIconShuffle } from "@/components/encore/icons";
import { Image } from "@/components/image";
import { ScrollArea, type ScrollAreaRef } from "@/components/scroll-area";
import { Button } from "@/components/ui/button";
import { DUMMY_TRACKS_IN_ARTIST_PAGE } from "@/data/tracks";
import { useScrollTrigger } from "@/hooks/use-scroll-trigger";
import { cn } from "@/utils/cn";
import { useRef, useState } from "react";
import { Link, useParams } from "react-router";

export default function TrackList() {
  return (
    <div>
      <div className="flex flex-col">
        {DUMMY_TRACKS_IN_ARTIST_PAGE.map((track, index) => (
          <div
            key={track.id}
            className={cn(
              "group grid grid-cols-[40px_minmax(0,1fr)_120px_40px_80px] gap-4 items-center px-4 py-2 rounded-md transition-colors",
              track.isActive ? "bg-background-elevated-highlight" : "hover:bg-background-elevated-highlight",
            )}
          >
            <div className="flex justify-center text-base">
              {track.isActive ? <EncoreIconPlay /> : <span className="group-hover:hidden text-text-subdued">{index + 1}</span>}
              {!track.isActive && (
                <span className="hidden group-hover:block">
                  <EncoreIconPlay />
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 overflow-hidden">
              <Image
                src={track.coverUrl}
                alt={track.title}
                className="w-10 h-10 object-cover rounded-sm shrink-0"
              />
              <div className="flex flex-col truncate">
                <span
                  className={`truncate text-base ${track.isActive || track.title === "Seventeen" || track.title === "Rapsodi" || track.title === "Fortune Cookie Yang Mencinta" ? "text-white" : "text-white group-hover:text-white"}`}
                >
                  {track.title}
                </span>
              </div>
            </div>

            <div className="text-sm text-right text-text-subdued">{track.playCount}</div>

            <div className="flex justify-center">{track.isSaved && <EncoreIconCheck className="fill-[#1ed760]" />}</div>

            <div className="flex items-center justify-end gap-3 text-sm pr-2 text-text-subdued">
              <span>{track.duration}</span>
              <div className={`flex items-center opacity-0 group-hover:opacity-100 transition-opacity ${track.isActive ? "opacity-100" : ""}`}>
                <button className="p-1 focus:outline-none">
                  <EncoreIconMoreOptions />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const ArtistPage = () => {
  const { id } = useParams();
  console.log(id);

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

  return (
    <>
      <header
        ref={headerRef}
        style={{
          visibility: isScrolled ? "visible" : "hidden",
          opacity: "calc(var(--scroll, 0) * 1.6)",
        }}
        className="absolute inset-x-0 top-0 p-4 bg-[#5B0058FF] h-16 flex items-center z-1"
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
          <span className="font-semibold text-3xl">JKT48</span>
        </div>
      </header>
      <div className="before-scroll-node ">
        <div ref={wrapperRef}>
          <div className="sticky top-0 z-50 h-0 w-full overflow-visible"></div>
          <div
            style={{
              backgroundImage: "url('https://image-cdn-fa.spotifycdn.com/image/ab67618600009d80eb8e79216d982f582071da3d')",
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
              backgroundColor: `rgba(91, 0, 88, calc(var(--scroll, 0) * 2.3))`,
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
              JKT48
            </p>
            <p className="mt-2">1,540,960 monthly listeners</p>
          </div>
        </div>
        <div className="min-h-screen pb-24 mt-4 bg-background-base relative z-0">
          <div className="-z-1 bg-linear-to-b from-[#5b0058b3] to-transparent absolute top-0 left-0 w-full h-[173px]" />
          <div className="flex flex-col m-auto p-6">
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
              <div className="ml-6">
                <div
                  role="button"
                  className="w-[38px] h-[48px] rounded-xl border-2 border-text-subdued flex items-center justify-center overflow-hidden"
                >
                  <img
                    src="https://i.scdn.co/image/ab67ba6900002ea625059949a3b0744a3c7e5ade"
                    alt="Video"
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
            <div>
              <h2 className="font-semibold text-2xl mt-8 mb-4">Popular</h2>
              <TrackList />
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
