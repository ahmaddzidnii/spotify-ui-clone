import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router";

import { useScrollTrigger } from "@/hooks/use-scroll-trigger";

import { Image } from "@/components/image";
import { Button } from "@/components/ui/button";
import { ScrollArea, type ScrollAreaRef } from "@/components/scroll-area";
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
import { albums } from "@/data/album";
import { transformSpotifyUriToUrl } from "@/features/shared/parsers/parse-uri";
import { formatDuration } from "@/features/shared/formaters/format.duration";
import { transformAlbumType, transformCopyrightType } from "../lib/utils";
import { rgbToHex } from "@/features/shared/formaters/format-color";
import { EntityError } from "@/features/error/components/entitiy-error";
import { cn } from "@/utils/cn";

export const AlbumPage = () => {
  const { id } = useParams();

  const album = albums.find((a) => a.id === id);

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

  const gridContainerRef = useRef(null);

  // 2. State untuk menyimpan angka class (misal: 4 untuk nrVisibleCards-4)
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    // Pastikan ref sudah terpasang ke elemen DOM
    if (!gridContainerRef.current) return;

    // 3. Inisialisasi ResizeObserver
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Ambil lebar container saat ini secara real-time
        const containerWidth = entry.contentRect.width;

        // Ukuran minimal kartu berdasarkan variabel CSS Spotify tadi
        const minColumnWidth = 180;
        const gridGap = 0; // Asumsi ada jarak antar kartu 24px

        // 4. Kalkulasi matematika: Lebar Container dibagi (Lebar Kartu + Gap)
        // Math.floor digunakan agar angkanya selalu dibulatkan ke bawah (tidak ada setengah kartu)
        const calculatedColumns = Math.floor((containerWidth + gridGap) / (minColumnWidth + gridGap));

        // 5. Update state dengan angka jumlah kartu maksimal yang muat
        // Jika lebarnya cukup untuk 5 kolom, maka state menjadi 5
        setVisibleCount(calculatedColumns > 0 ? calculatedColumns : 1);
      }
    });

    // Mulai memantau container
    observer.observe(gridContainerRef.current);

    // Cleanup function: Hentikan pemantauan jika komponen dihapus dari layar (mencegah memory leak)
    return () => {
      observer.disconnect();
    };
  }, []);

  if (!album) {
    return <EntityError entityName="album" />;
  }

  const totalDurationSeconds = useMemo(() => {
    return album.tracksV2.items.reduce((acc, track) => acc + track.track.duration.totalMilliseconds / 1000, 0);
  }, [album.tracksV2.items]);

  const visualIdentity = album.visualIdentity;
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
          <span className="font-semibold text-2xl">{album.name}</span>
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
            style={
              {
                "--background-base": colorBackgroundBase,
                "--background-base-min-contrast": colorBackgroundBaseMinContrast,
                backgroundColor: "var(--background-base)",
                backgroundImage: `linear-gradient(to bottom, var(--background-base-min-contrast), transparent)`,
              } as React.CSSProperties
            }
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
                src={album.coverArt.sources[0].url}
                alt="Album cover"
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>

            <div className="flex-col flex justify-end">
              <p className="font-medium text-sm">{transformAlbumType(album.type)}</p>

              <p
                style={{
                  fontFamily: "var(--font-display)",
                  // 30px membesar ke 76px
                  fontSize: "clamp(30px, 30px + (var(--main-view-grid-width) - 600px) / 424 * 26, 76px)",
                  lineHeight: "clamp(54px, 54px + (var(--main-view-grid-width) - 600px) / 424 * 28, 82px)",
                }}
                className="font-extrabold tracking-tight mt-1 mb-2"
              >
                {album.name}
              </p>

              {/* Meta Info */}
              <div className="flex items-center gap-2">
                <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                  {/* Artists */}
                  {album.artists.totalCount > 1 ? (
                    <div className="flex flex-wrap items-center min-w-0">
                      {album.artists.items.map((artist, index) => (
                        <React.Fragment key={artist.id}>
                          <Link
                            to={transformSpotifyUriToUrl(artist.uri)}
                            className="font-bold wrap-break-word"
                          >
                            {artist.profile.name}
                          </Link>

                          {index < album.artists.items.length - 1 && <span className="mx-1 text-text-subdued">•</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  ) : (
                    album.artists.items.map((artist) => (
                      <div
                        key={artist.id}
                        className="flex items-center min-w-0"
                      >
                        <Image
                          alt="Artist avatar"
                          src={artist.visuals.avatarImage.sources[0].url}
                          className="me-2 size-6 shrink-0 rounded-full"
                        />
                        <Link
                          to={transformSpotifyUriToUrl(artist.uri)}
                          className="font-semibold wrap-break-word"
                        >
                          {artist.profile.name}
                        </Link>
                      </div>
                    ))
                  )}

                  {/* Meta */}
                  <span className="text-text-subdued wrap-break-word">
                    • {album.date.isoString.split("-")[0]} • {album.discs.items.reduce((acc, d) => acc + d.tracks.totalCount, 0)} songs,{" "}
                    {formatDuration(totalDurationSeconds, { compact: false })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                  style={{
                    width: "38px",
                    height: "48px",
                  }}
                  className="rounded-xl border-2 border-text-subdued flex items-center justify-center overflow-hidden relative"
                >
                  <img
                    src={album.watchFeedEntrypoint.thumbnailImage.data.imageId}
                    alt=""
                    className="absolute object-cover aspect-9/16"
                  />
                </div>
              </div>

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
                  {album.tracksV2.items.map((track, index) => (
                    <div
                      key={track.uid}
                      className={`group grid grid-cols-[40px_1fr_auto] gap-4 px-4 py-2 rounded-md items-center cursor-pointer transition-colors ${"hover:bg-background-elevated-highlight"}`}
                    >
                      <div className="flex items-center justify-center w-6 h-6 ml-1 text-text-subdued">
                        <span className="text-base group-hover:hidden">{index + 1}</span>
                        <EncoreIconPlay
                          viewBox="0 0 24 24"
                          className="w-4 h-4 fill-white hidden group-hover:block"
                        />
                      </div>

                      <div className="flex flex-col overflow-hidden">
                        <span className={`text-[15px] truncate "text-white"}`}>{track.track.name}</span>
                        <div className="flex">
                          {track.track.artists.items.map((artist, i) => (
                            <span
                              key={artist.profile.name}
                              className="text-[13px] text-text-subdued truncate group-hover:text-white transition-colors mt-0.5"
                            >
                              <Link to={transformSpotifyUriToUrl(artist.uri)}>{artist.profile.name}</Link>
                              {i < track.track.artists.items.length - 1 && ","}
                              &nbsp;
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-5">
                        {track.track.saved ? (
                          <EncoreIconCheck
                            viewBox="0 0 16 16"
                            className="size-4.5 fill-[#1ed760]"
                          />
                        ) : (
                          <Button
                            variant="tertiary"
                            aria-label="Add to Liked Songs"
                            className={`opacity-0 group-hover:opacity-100 transition-opacity`}
                          >
                            <EncoreIconPlus
                              viewBox="0 0 16 16"
                              className="w-4 h-4 fill-current transition-colors"
                            />
                          </Button>
                        )}

                        {/* Durasi */}
                        <span className="text-sm text-text-subdued w-8 text-right">
                          {formatDuration(track.track.duration.totalMilliseconds / 1000)}
                        </span>

                        <button
                          aria-label="More options"
                          className={`opacity-0 group-hover:opacity-100 transition-opacity`}
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
              <p className="text-sm">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(album.date.isoString))}
              </p>
              {album.copyright.items.map((c, i) => (
                <p
                  key={i}
                  className="text-xs"
                >
                  {transformCopyrightType(c.type)} {c.text.replace(/[©℗]/g, "")}
                </p>
              ))}
            </div>
            <div className="mt-16 flex flex-col">
              <h2 className="font-bold text-2xl">More by {album.artists.items[0].profile.name}</h2>
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
                {album.moreAlbumsByArtist.items
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
                              alt=""
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
