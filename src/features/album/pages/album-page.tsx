import { useRef, useState } from "react";
import { Link, useParams } from "react-router";

import { getArtistWithTracks } from "@/data/query";
import { useScrollTrigger } from "@/hooks/use-scroll-trigger";

import { generateDarkenHex, hexToRgb } from "@/features/shared/formaters/format-color";

import { Image } from "@/components/image";
import { Button } from "@/components/ui/button";
import { ScrollArea, type ScrollAreaRef } from "@/components/scroll-area";
import { EncoreIconInfo } from "@/components/encore/icons/encore-icon-info";
import {
  EncoreIconClock,
  EncoreIconMoreOptions,
  EncoreIconPlus,
  EncoreIconShuffle,
  EncoreIconDownload,
  EncoreIconPlay,
  EncoreIconCheck,
} from "@/components/encore/icons";
import { Footer } from "@/layouts/components/footer";
import { artistDiscographyData } from "@/data/album";

const tracks = [
  { id: 1, title: "Eureka Milik Kita", artist: "JKT48", duration: "4:11", isSaved: false, isPlaying: false },
  { id: 2, title: "Seventeen", artist: "JKT48", duration: "3:45", isSaved: true, isPlaying: false },
  { id: 3, title: "New Ship", artist: "JKT48", duration: "4:48", isSaved: false, isPlaying: false },
  { id: 4, title: "Better", artist: "JKT48", duration: "4:49", isSaved: false, isPlaying: true },
  { id: 5, title: "Mari Menjadi Pohon Sakura", artist: "JKT48", duration: "5:32", isSaved: false, isPlaying: false },
  { id: 6, title: "Pin Heel Merah dan Profesor", artist: "JKT48", duration: "4:12", isSaved: false, isPlaying: false },
  { id: 7, title: "Tolong Ingatlah", artist: "JKT48", duration: "5:18", isSaved: false, isPlaying: false },
  { id: 8, title: "Ingin Bertemu", artist: "JKT48", duration: "3:52", isSaved: false, isPlaying: false },
];

export const AlbumPage = () => {
  const artist = getArtistWithTracks("2l8I5pWUnfF7bMK1z6EJRk");

  const { id } = useParams();

  const scrollRef = useRef<ScrollAreaRef | null>(null);
  const isScrolled = useScrollTrigger(scrollRef, 50);
  const headerRef = useRef<HTMLDivElement>(null);
  const playButtonBottomRef = useRef<HTMLDivElement>(null);

  const [mustShowPlayButtonTop, setMustShowPlayButtonTop] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = (e.target as HTMLDivElement).scrollTop;

    const maxScroll = window.innerHeight * 0.4;
    const progress = Math.min(scrollTop / maxScroll, 1);

    if (headerRef.current) {
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

  const dominantColor = "#D02070FF";
  const darkenedColor = generateDarkenHex(dominantColor);
  const darkenedColorRGB = hexToRgb(darkenedColor);
  return (
    <>
      <header
        ref={headerRef}
        style={{
          visibility: isScrolled ? "visible" : "hidden",
          opacity: "calc(var(--scroll, 0) * 1.6)",
          backgroundColor: `${darkenedColor}`,
        }}
        className="absolute inset-x-0 top-0 p-4 h-16 flex items-center z-1"
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
          <span className="font-semibold text-2xl">Mahagita Vol. 2</span>
        </div>
      </header>
      <ScrollArea
        className="flex-1"
        ref={scrollRef}
        onScrollCapture={handleScroll}
      >
        <div
          style={
            {
              "--main-view-grid-width": "100cqw",
              "--fluid-height": "clamp(186px, 186px + (var(--main-view-grid-width) - 600px) / 424 * 150, 336px)",
              "--min-fluid-height": "clamp(186px, 186px + (var(--main-view-grid-width) - 600px) / 424 * 90, 276px)",

              minHeight: "var(--min-fluid-height)",
              height: "min(30vh, var(--fluid-height))",
              maxHeight: "336px",
            } as React.CSSProperties
          }
          className="flex items-end relative w-full pb-6 z-10"
        >
          <div
            style={{
              backgroundColor: `${darkenedColor}`,
              backgroundImage: `linear-gradient(to bottom, ${dominantColor}, transparent)`,
            }}
            className="absolute top-0 left-0 w-full h-full -z-1"
          ></div>

          <div className="flex px-6 z-10 flex-1 w-full items-end">
            <div
              style={{
                boxShadow: "0 4px 60px #00000080",
                // dari 120px membesar ke 240px
                width: "clamp(120px, 120px + (var(--main-view-grid-width) - 600px) / 424 * 80, 240px)",
                height: "clamp(120px, 120px + (var(--main-view-grid-width) - 600px) / 424 * 80, 240px)",
              }}
              className="relative rounded-xl overflow-hidden me-5 shrink-0"
            >
              <Image
                src="https://i.scdn.co/image/ab67616d00001e02f6ce264866ac7fa1664b4db4"
                alt="Album cover"
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>

            <div className="flex-col flex justify-end">
              <p className="font-medium text-sm">Album</p>

              <p
                style={{
                  fontFamily: "var(--font-display)",
                  // 30px membesar ke 76px
                  fontSize: "clamp(30px, 30px + (var(--main-view-grid-width) - 600px) / 424 * 26, 76px)",
                  lineHeight: "clamp(54px, 54px + (var(--main-view-grid-width) - 600px) / 424 * 28, 82px)",
                }}
                className="font-extrabold tracking-tight mt-1 mb-2"
              >
                Mahagita Vol. 2
              </p>

              {/* Meta Info */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Image
                    alt="JKT48"
                    src="https://i.scdn.co/image/ab6761610000101f07189aefe72bf176ecd0b2ab"
                    className="size-6 rounded-full me-2"
                  />
                  <Link
                    to="/artist/2l8I5pWUnfF7bMK1z6EJRk"
                    className="font-semibold"
                  >
                    JKT48
                  </Link>
                  <span className="ms-2 text-sm text-text-subdued">• 2023 • 11 songs, 51 min 10 sec</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-screen bg-background-base relative z-0">
          <div
            style={{
              height: "173px",
              background: `linear-gradient(to bottom, rgba(${darkenedColorRGB.r},${darkenedColorRGB.g},${darkenedColorRGB.b},0.7), transparent)`,
            }}
            className="-z-1  absolute top-0 left-0 w-full"
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
                    style={{
                      width: "38px",
                      height: "48px",
                    }}
                    className="rounded-xl border-2 border-text-subdued flex items-center justify-center overflow-hidden"
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
                <Button variant="tertiary">
                  <EncoreIconPlus className="size-7" />
                </Button>
              </div>
              <div className="ml-6">
                <Button variant="tertiary">
                  <EncoreIconDownload className="size-8" />
                </Button>
              </div>
              <div className="ml-6">
                <Button variant="tertiary">
                  <EncoreIconMoreOptions className="size-7" />
                </Button>
              </div>
            </div>
            <div>
              <div className="pt-6 font-sans">
                <div className="grid grid-cols-[40px_1fr_auto] gap-4 px-4 py-2 border-b border-background-elevated-highlight text-text-subdued font-semibold text-sm mb-2 items-center">
                  <div className="text-center font-normal">#</div>
                  <div className="font-normal">Title</div>
                  <div className="flex items-center justify-end pr-8 gap-2">
                    <EncoreIconClock className="size-4" />
                  </div>
                </div>

                <div className="flex flex-col">
                  {tracks.map((track, index) => (
                    <div
                      key={track.id}
                      className={`group grid grid-cols-[40px_1fr_auto] gap-4 px-4 py-2 rounded-md items-center cursor-pointer transition-colors ${
                        track.isPlaying ? "bg-background-elevated-highlight" : "hover:bg-background-elevated-highlight"
                      }`}
                    >
                      <div className="flex items-center justify-center w-6 h-6 ml-1 text-text-subdued">
                        {track.isPlaying ? (
                          <svg
                            viewBox="0 0 24 24"
                            className="w-4 h-4 fill-white"
                          >
                            <path d="M8 5.14v14l11-7-11-7z"></path>
                          </svg>
                        ) : (
                          <>
                            <span className="text-base group-hover:hidden">{index + 1}</span>
                            <EncoreIconPlay
                              viewBox="0 0 24 24"
                              className="w-4 h-4 fill-white hidden group-hover:block"
                            />
                          </>
                        )}
                      </div>

                      <div className="flex flex-col overflow-hidden">
                        <span className={`text-[15px] truncate ${track.isPlaying ? "text-[#1db954]" : "text-white"}`}>{track.title}</span>
                        <span className="text-[13px] text-text-subdued truncate group-hover:text-white transition-colors mt-0.5">{track.artist}</span>
                      </div>

                      <div className="flex items-center justify-end gap-5">
                        {track.isSaved ? (
                          <EncoreIconCheck
                            viewBox="0 0 16 16"
                            className="size-4.5 fill-[#1ed760]"
                          />
                        ) : (
                          <Button
                            variant="tertiary"
                            aria-label="Add to Liked Songs"
                            className={`${track.isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`}
                          >
                            <EncoreIconPlus
                              viewBox="0 0 16 16"
                              className="w-4 h-4 fill-current transition-colors"
                            />
                          </Button>
                        )}

                        {/* Durasi */}
                        <span className="text-sm text-text-subdued w-8 text-right">{track.duration}</span>

                        <button
                          aria-label="More options"
                          className={`${track.isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`}
                        >
                          <svg
                            viewBox="0 0 16 16"
                            className="w-4 h-4 fill-current  transition-colors"
                          >
                            <path d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 text-text-subdued  leading-tight">
              <p className="text-sm">March 12, 2021</p>
              <p className="text-xs">&copy; 2021 Universal Music Indonesia</p>
            </div>
            <div className="mt-16 flex flex-col">
              <h2 className="font-bold text-2xl">More by JKT48</h2>
              <div
                style={
                  {
                    "--min-column-width": "180px",
                    "--row-count": 1,
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(var(--min-column-width), 1fr))",
                    gridAutoRows: 0,
                    overflow: "hidden",
                    gridTemplateRows: "repeat(var(--row-count), minmax(0, 1fr))",
                  } as React.CSSProperties
                }
                className="mt-4"
              >
                {artistDiscographyData.moreAlbumsByArtist.items
                  .filter((f) => f.id != id)
                  .map((b) => (
                    <div
                      key={b.id}
                      className="group px-2 py-1.5 rounded-md hover:bg-background-elevated-highlight transition-colors"
                    >
                      <div className="flex flex-col">
                        <div className="w-full aspect-square overflow-hidden rounded-md relative">
                          <Link to="#">
                            <Image
                              src={b.coverArt.sources[0].url}
                              alt={`Album cover for ${b.name} by ${artist.name}`}
                              className="absolute top-0 left-0 object-cover object-center w-full h-full"
                            />
                          </Link>
                          <button className="flex items-center justify-center bg-[#1ed760] p-2 rounded-full size-12 absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity z-1">
                            <EncoreIconPlay className="fill-background-base size-6" />
                          </button>
                        </div>
                        <div className="mt-2">
                          <Link
                            to="#"
                            className="font-semibold line-clamp-2"
                          >
                            {b.name}
                          </Link>
                          <p className="text-sm text-text-subdued mt-1">{b.date.year}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </ScrollArea>
    </>
  );
};
