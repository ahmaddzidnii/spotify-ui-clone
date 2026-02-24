import { useRef, useState } from "react";
import { Link } from "react-router";

import { useScrollTrigger } from "@/hooks/use-scroll-trigger";

import { hexToRgb } from "@/features/shared/formaters/format-color";

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
  EncoreIconPersonPlus,
} from "@/components/encore/icons";
import { Footer } from "@/layouts/components/footer";
import { ARTISTS } from "@/data/artists";

const tracks = [
  {
    id: "00WwcAFUBtfrsnfNYgplaM",
    title: "Banyu Moto",
    artists: [{ id: "0jcgtGZTWxoepAUgADwcHP", name: "Sleman Receh" }],
    album: "Banyu Moto",
    dateAdded: "1 week ago",
    coverUrl: "https://i.scdn.co/image/ab67616d000048510f94886d67ae4e92a92b2281",
    duration: "4:09",
    isSaved: true,
  },
  {
    id: "2Jp7oaFGIyaSV30pFoALV5",
    title: "Tak Satu Cerita",
    artists: [
      { id: "6usptTdSkyzOX8rWIE4Y12", name: "Rizwan Fadilah" },
      { id: "0sLoVTeBT6akDY7ecDxKYe", name: "Nabila Taqiyyah" },
    ],
    album: "Tak Satu Cerita",
    dateAdded: "1 week ago",
    coverUrl: "https://i.scdn.co/image/ab67616d00004851c5b4a9d8fdc63b9562a4d280",
    duration: "3:46",
    isSaved: true,
  },
  {
    id: "7q4zdBAgLFETdnslE7Z0Eq",
    title: "Seventeen",
    artists: [{ id: "2l8I5pWUnfF7bMK1z6EJRk", name: "JKT48" }],
    album: "Mahagita Vol. 2",
    dateAdded: "1 week ago",
    coverUrl: "https://i.scdn.co/image/ab67616d00004851f6ce264866ac7fa1664b4db4",
    duration: "3:45",
    isSaved: true,
  },
  {
    id: "7uKhfJ39tRz3xiX3K7GIkD",
    title: "Yang Penting Halal",
    artists: [{ id: "5pnSNZZRyYViu2n58Zlw1J", name: "Wali" }],
    album: "Aku Bukan Bang Toyib",
    dateAdded: "1 week ago",
    coverUrl: "https://i.scdn.co/image/ab67616d00004851ab85980da8a5c59d26309a6f",
    duration: "3:43",
    isSaved: true,
  },
  {
    id: "3CSFXGhoR8C9kBF90xhIXG",
    title: "Tanpa Cinta",
    artists: [
      { id: "7Ln5yumFjHCkeZ8bAzHUcp", name: "Yovie Widianto" },
      { id: "0kPb52ySN2k9P6wEZPTUzm", name: "Tiara Andini" },
    ],
    album: "Tanpa Cinta",
    dateAdded: "1 week ago",
    coverUrl: "https://i.scdn.co/image/ab67616d00004851d1b4ab00a8b44b4405f884e0",
    duration: "4:15",
    isSaved: true,
  },
  {
    id: "6RAxgUG90f39dVSGUr4qOd",
    title: "Kisah Tanpa Dirimu",
    artists: [{ id: "7lXTU6VtJQWfiN2vuZyzqf", name: "Anggis Devaki" }],
    album: "Devaki",
    dateAdded: "1 week ago",
    coverUrl: "https://i.scdn.co/image/ab67616d00004851d7105ffabf2ff9ddd265eab1",
    duration: "4:17",
    isSaved: true,
  },
  {
    id: "14U7MYdN06aGlSwUiLk5Ec",
    title: "Matanyo",
    artists: [{ id: "5pnSNZZRyYViu2n58Zlw1J", name: "Wali" }],
    album: "Matanyo",
    dateAdded: "1 week ago",
    coverUrl: "https://i.scdn.co/image/ab67616d00004851e2b1609ed1664cc5f58d25ef",
    duration: "3:57",
    isSaved: true,
  },
  {
    id: "3GIiXoibZNOxoB4QJ0b8UR",
    title: "Dirimu Yang Dulu",
    artists: [{ id: "7lXTU6VtJQWfiN2vuZyzqf", name: "Anggis Devaki" }],
    album: "Devaki",
    dateAdded: "1 week ago",
    coverUrl: "https://i.scdn.co/image/ab67616d00004851d7105ffabf2ff9ddd265eab1",
    duration: "4:00",
    isSaved: true,
  },
  {
    id: "0MhNhoGoKkOILkpAq80cdc",
    title: "Doy",
    artists: [{ id: "2I3STBPK1DymMXPCjg3UIT", name: "Kangen Band" }],
    album: "Bintang 14 Hari",
    dateAdded: "1 week ago",
    coverUrl: "https://i.scdn.co/image/ab67616d00004851ba8d883787d66e655c9b87a6",
    duration: "3:24",
    isSaved: true,
  },
  {
    id: "3iVrCWKaz6nJW5rIHHa804",
    title: "Lagu Pernikahan Kita",
    artists: [
      { id: "0kPb52ySN2k9P6wEZPTUzm", name: "Tiara Andini" },
      { id: "7j5PGC0BF48rRtcmgbVvOT", name: "Arsy Widianto" },
    ],
    album: "Kelembutan Hati Tiara Andini",
    dateAdded: "1 week ago",
    coverUrl: "https://i.scdn.co/image/ab67616d00004851d11bc434ce0cccff653a97f9",
    duration: "4:21",
    isSaved: true,
  },
  {
    id: "7GA7UU24MIqxSbIIwP8YSF",
    title: "Cintanya Aku",
    artists: [
      { id: "0kPb52ySN2k9P6wEZPTUzm", name: "Tiara Andini" },
      { id: "7j5PGC0BF48rRtcmgbVvOT", name: "Arsy Widianto" },
    ],
    album: "Kelembutan Hati Tiara Andini",
    dateAdded: "1 week ago",
    coverUrl: "https://i.scdn.co/image/ab67616d00004851d11bc434ce0cccff653a97f9",
    duration: "3:54",
    isSaved: true,
  },
  {
    id: "1N9KSlqlBbPF0NNYWtttma",
    title: "Hargai Aku",
    artists: [{ id: "6H857CtcaYMSxOB4jvSIZf", name: "Armada" }],
    album: "Satu Hati Sejuta Cinta",
    dateAdded: "1 week ago",
    coverUrl: "https://i.scdn.co/image/ab67616d00004851f1c411e94c33fdd57edd9a69",
    duration: "4:05",
    isSaved: true,
  },
  {
    id: "58ppCbtUwYO4Byr0HHzEvd",
    title: "Pudar",
    artists: [{ id: "0ygQsC5td2maGmglpzd7tp", name: "Rossa" }],
    album: "Kembali",
    dateAdded: "1 week ago",
    coverUrl: "https://i.scdn.co/image/ab67616d000048518c39c4d88b818026927af825",
    duration: "3:00",
    isSaved: true,
  },
  {
    id: "7k5KS786ibuDQIU4YKRnQ7",
    title: "Bayangan Cinta Yang Lalu",
    artists: [
      { id: "1ltPgn4r3rgK3NcpJZScIp", name: "KIM" },
      { id: "0sLoVTeBT6akDY7ecDxKYe", name: "Nabila Taqiyyah" },
    ],
    album: "Bayangan Cinta Yang Lalu",
    dateAdded: "1 week ago",
    coverUrl: "https://i.scdn.co/image/ab67616d00004851e767793661e86eb9aff6753e",
    duration: "3:44",
    isSaved: true,
  },
  {
    id: "238QZNu3LMzPj2PUoE8AIk",
    title: "Teramini",
    artists: [{ id: "3qL7BzwJOXq3EzAio36aLX", name: "Ghea Indrawari" }],
    album: "Berdamai",
    dateAdded: "1 week ago",
    coverUrl: "https://i.scdn.co/image/ab67616d000048519798fbe1bd1cdf2915bd0394",
    duration: "3:40",
    isSaved: true,
  },
  {
    id: "57egBaCTBOuAs7ErKxyYjN",
    title: "Cerito Loro",
    artists: [
      { id: "5423rMdVbchY2cgu0GgH5X", name: "Happy Asmara" },
      { id: "1coVIbS4yAqP5hmezkHAXM", name: "Royal Music" },
    ],
    album: "Cerito Loro",
    dateAdded: "1 week ago",
    coverUrl: "https://i.scdn.co/image/ab67616d000048517f434994802d189dfc66a626",
    duration: "6:17",
    isSaved: true,
  },
  {
    id: "1W3ufHAL2XuSKqjkBRewrh",
    title: "Fortune Cookie Yang Mencinta",
    artists: [{ id: "2l8I5pWUnfF7bMK1z6EJRk", name: "JKT48" }],
    album: "Mahagita - Kamikyokutachi",
    dateAdded: "1 week ago",
    coverUrl: "https://i.scdn.co/image/ab67616d00004851c1fb3e1f3cd9e8ace9cda286",
    duration: "4:42",
    isSaved: true,
  },
  {
    id: "73fHRZD78M67KShlr2Xz4l",
    title: "365 Nichi No Kamihikouki - Pesawat Kertas 365 Hari",
    artists: [{ id: "2l8I5pWUnfF7bMK1z6EJRk", name: "JKT48" }],
    album: "Mahagita - Kamikyokutachi",
    dateAdded: "1 week ago",
    coverUrl: "https://i.scdn.co/image/ab67616d00004851c1fb3e1f3cd9e8ace9cda286",
    duration: "4:40",
    isSaved: true,
  },
  {
    id: "6CsSNFkQVVuQjRQMrzyDzq",
    title: "Percik Kecil",
    artists: [
      { id: "47z98pKd71yIbgXwe9LPVC", name: "Bernadya" },
      { id: "2l8I5pWUnfF7bMK1z6EJRk", name: "JKT48" },
    ],
    album: "Percik Kecil",
    dateAdded: "1 week ago",
    coverUrl: "https://i.scdn.co/image/ab67616d0000485191389f69b393611aff87a6ac",
    duration: "3:49",
    isSaved: true,
  },
  {
    id: "7gB98EWp4p9VKxOToaqrhM",
    title: "Cinta Terakhir",
    artists: [{ id: "1sqYIwXAmhrcSTsYmsTFAr", name: "Ari Lasso" }],
    album: "Selalu Ada",
    dateAdded: "1 week ago",
    coverUrl: "https://i.scdn.co/image/c23dbcd38ebe42a2d6a07f970845d01063e3b424",
    duration: "3:57",
    isSaved: true,
  },
  {
    id: "0ql6fgz8qk0pAEKrGeSppJ",
    title: "bergema sampai selamanya",
    artists: [{ id: "6UgERnTHmjk3qXM9x5vzyO", name: "Nadhif Basalamah" }],
    album: "Nadhif (laman berikutnya)",
    dateAdded: "1 week ago",
    coverUrl: "https://i.scdn.co/image/ab67616d00004851f3e3f888fbfcc916ecce50a9",
    duration: "3:18",
    isSaved: true,
  },
];

export const PlaylistPage = () => {
  const artist = ARTISTS.find((x) => x.id == "2l8I5pWUnfF7bMK1z6EJRk");

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

  const dominantColor = "#785858FF";
  const darkenedColor = "#4A2D2EFF";
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
          <span className="font-semibold text-2xl">Ngodingh</span>
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
                src="https://mosaic.scdn.co/300/ab67616d00001e020f94886d67ae4e92a92b2281ab67616d00001e02ab85980da8a5c59d26309a6fab67616d00001e02c5b4a9d8fdc63b9562a4d280ab67616d00001e02f6ce264866ac7fa1664b4db4"
                alt="Playlist cover"
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>

            <div className="flex-col flex justify-end">
              <p className="font-medium text-sm">Public Playlist</p>

              <p
                style={{
                  fontFamily: "var(--font-display)",
                  // 30px membesar ke 76px
                  fontSize: "clamp(30px, 30px + (var(--main-view-grid-width) - 600px) / 424 * 26, 76px)",
                  lineHeight: "clamp(54px, 54px + (var(--main-view-grid-width) - 600px) / 424 * 28, 82px)",
                }}
                className="font-extrabold tracking-tight mt-1 mb-2"
              >
                Ngodingh
              </p>

              {/* Meta Info */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Link
                    to="/user/2l8I5pWUnfF7bMK1z6EJRk"
                    className="font-semibold"
                  >
                    ahmaddzidnii
                  </Link>
                  <span className="ms-2 text-sm text-text-subdued">• 11 songs, 51 min 10 sec</span>
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
                  <EncoreIconDownload className="size-8" />
                </Button>
              </div>
              <div className="ml-6">
                <Button variant="tertiary">
                  <EncoreIconPersonPlus className="size-8" />
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
                {/* Header Row */}
                <div className="grid grid-cols-[40px_minmax(0,6fr)_minmax(0,4fr)_minmax(0,3fr)_minmax(120px,auto)] gap-4 px-4 py-2 border-b border-background-elevated-highlight text-text-subdued font-normal text-sm mb-2 items-center">
                  <div className="text-center">#</div>
                  <div>Title</div>
                  <div>Album</div>
                  <div>Date added</div>
                  <div className="flex items-center justify-end pr-8 gap-2">
                    <EncoreIconClock className="size-4" />
                  </div>
                </div>

                {/* Track List */}
                <div className="flex flex-col">
                  {tracks.map((track, index) => (
                    <div
                      key={track.id}
                      className={`group grid grid-cols-[40px_minmax(0,6fr)_minmax(0,4fr)_minmax(0,3fr)_minmax(120px,auto)] gap-4 px-4 py-2 rounded-md items-center cursor-pointer transition-colors ${"hover:bg-background-elevated-highlight"}`}
                    >
                      {/* 1. Index & Play/Pause Icon */}
                      <div className="flex items-center justify-center w-6 h-6 ml-1 text-text-subdued">
                        {false ? (
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

                      <div className="flex items-center gap-3 overflow-hidden pr-4">
                        <img
                          src={track.coverUrl || "/default-cover.png"}
                          alt="Album cover"
                          className="w-10 h-10 rounded-sm object-cover shrink-0"
                        />
                        <div className="flex flex-col overflow-hidden">
                          <span className={`text-base font-normal truncate ${"text-white"}`}>{track.title}</span>
                          <span className="text-[13px] text-text-subdued truncate group-hover:text-white transition-colors mt-0.5 flex items-center gap-1.5">
                            {track.artists.map((artist, index) => (
                              <Link
                                key={artist.id}
                                to={`/artist/${artist.id}`}
                              >
                                {artist.name}
                                {index < track.artists.length - 1 && ", "}
                              </Link>
                            ))}
                          </span>
                        </div>
                      </div>

                      <div className="text-sm text-text-subdued truncate group-hover:text-white transition-colors pr-4">{track.album}</div>

                      <div className="text-sm text-text-subdued truncate pr-4">1 week ago</div>

                      <div className="flex items-center justify-end gap-4">
                        {track.isSaved ? (
                          <EncoreIconCheck
                            viewBox="0 0 16 16"
                            className="size-4.5 fill-[#1ed760]"
                          />
                        ) : (
                          <Button
                            variant="tertiary"
                            aria-label="Add to Liked Songs"
                            className={`${"opacity-0 group-hover:opacity-100"} transition-opacity`}
                          >
                            <EncoreIconPlus
                              viewBox="0 0 16 16"
                              className="w-4 h-4 fill-current transition-colors text-text-subdued hover:text-white"
                            />
                          </Button>
                        )}

                        {/* Durasi */}
                        <span className="text-sm text-text-subdued w-8 text-right tabular-nums">{track.duration}</span>

                        {/* More Options */}
                        <button
                          aria-label="More options"
                          className={`${"opacity-0 group-hover:opacity-100"} transition-opacity text-text-subdued hover:text-white`}
                        >
                          <svg
                            viewBox="0 0 16 16"
                            className="w-4 h-4 fill-current transition-colors"
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
          </div>
        </div>
        <Footer />
      </ScrollArea>
    </>
  );
};
