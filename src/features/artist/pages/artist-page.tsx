import { Image } from "@/components/image";
import { ScrollArea, type ScrollAreaRef } from "@/components/scroll-area";
import { Button } from "@/components/ui/button";
import { useScrollTrigger } from "@/hooks/use-scroll-trigger";
import { cn } from "@/utils/cn";
import { useRef, useState } from "react";
import { useParams } from "react-router";

const tracks = [
  {
    id: 1,
    title: "Seventeen",
    playCount: "43,582,632",
    duration: "3:45",
    isSaved: true,
    isMusicVideo: false,
    isActive: false,
    coverUrl: "https://i.scdn.co/image/ab67616d00001e02f6ce264866ac7fa1664b4db4",
  },
  {
    id: 2,
    title: "Rapsodi",
    playCount: "136,379,509",
    duration: "3:58",
    isSaved: false,
    isMusicVideo: false,
    isActive: false,
    coverUrl: "https://i.scdn.co/image/ab67616d00001e02dcd3a934c5c00bdfc1fd4d5c",
  },
  {
    id: 3,
    title: "Fortune Cookie Yang Mencinta",
    playCount: "51,809,889",
    duration: "4:42",
    isSaved: true,
    isMusicVideo: false,
    isActive: false,
    coverUrl: "https://i.scdn.co/image/ab67616d00001e02c1fb3e1f3cd9e8ace9cda286",
  },
  {
    id: 4,
    title: "Percik Kecil",
    playCount: "5,664,230",
    duration: "3:49",
    isSaved: true,
    isMusicVideo: true,
    isActive: true,
    coverUrl: "https://i.scdn.co/image/ab67616d00001e0291389f69b393611aff87a6ac",
  },
  {
    id: 5,
    title: "Andai 'Ku Bukan Idola",
    playCount: "369,326",
    duration: "4:13",
    isSaved: false,
    isMusicVideo: false,
    isActive: false,
    coverUrl: "https://i.scdn.co/image/ab67616d00001e02d96453e606852f7868e15963",
  },
];

// 2. Ikon SVG Inline (Untuk mengurangi dependensi eksternal)
const PlayIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4 text-white"
  >
    <path d="M8 5.14v14l11-7-11-7z" />
  </svg>
);

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="#1ed760"
    className="w-4 h-4"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
    />
  </svg>
);

const EllipsisIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 text-gray-400 hover:text-white"
  >
    <path d="M6 12a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0zm6 2a2 2 0 100-4 2 2 0 000 4z" />
  </svg>
);

export default function TrackList() {
  return (
    <div>
      <div className="flex flex-col">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className={cn(
              "group grid grid-cols-[40px_minmax(0,1fr)_120px_40px_80px] gap-4 items-center px-4 py-2 rounded-md transition-colors",
              track.isActive ? "bg-background-elevated-highlight" : "hover:bg-background-elevated-highlight",
            )}
          >
            {/* Kolom 1: Nomor atau Ikon Play */}
            <div className="flex justify-center text-base">
              {track.isActive ? <PlayIcon /> : <span className="group-hover:hidden text-text-subdued">{index + 1}</span>}
              {!track.isActive && (
                <span className="hidden group-hover:block">
                  <PlayIcon />
                </span>
              )}
            </div>

            {/* Kolom 2: Gambar Album & Judul */}
            <div className="flex items-center gap-3 overflow-hidden">
              <Image
                src={track.coverUrl}
                alt={track.title}
                className="w-10 h-10 object-cover rounded-sm flex-shrink-0"
              />
              <div className="flex flex-col truncate">
                <span
                  className={`truncate text-base ${track.isActive || track.title === "Seventeen" || track.title === "Rapsodi" || track.title === "Fortune Cookie Yang Mencinta" ? "text-white" : "text-white group-hover:text-white"}`}
                >
                  {track.title}
                </span>
              </div>
            </div>

            {/* Kolom 3: Jumlah Putar */}
            <div className="text-sm text-right">{track.playCount}</div>

            {/* Kolom 4: Ikon Checked (Saved) */}
            <div className="flex justify-center">{track.isSaved && <CheckIcon />}</div>

            {/* Kolom 5: Durasi & Ellipsis */}
            <div className="flex items-center justify-end gap-3 text-sm pr-2">
              <span>{track.duration}</span>
              <div className={`flex items-center opacity-0 group-hover:opacity-100 transition-opacity ${track.isActive ? "opacity-100" : ""}`}>
                <button className="p-1 focus:outline-none">
                  <EllipsisIcon />
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
  const playButtonBottomRef = useRef<HTMLDivElement>(null);

  const [mustShowPlayButtonTop, setMustShowPlayButtonTop] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = (e.target as HTMLDivElement).scrollTop;

    const maxScroll = window.innerHeight * 0.4;

    // Hitung progress dari 0.0 sampai 1.0
    const progress = Math.min(scrollTop / maxScroll, 1);

    // Suntikkan nilai ke variabel CSS
    if (wrapperRef.current) {
      wrapperRef.current.style.setProperty("--scroll", progress.toString());
    }

    // Cek posisi play button setiap scroll
    if (playButtonBottomRef.current) {
      const top = playButtonBottomRef.current.getBoundingClientRect().top;
      setMustShowPlayButtonTop(top < 90);
    }
  };

  return (
    <>
      <header
        style={{
          visibility: isScrolled ? "visible" : "hidden",
          opacity: isScrolled ? 1 : 0,
          transition: "visibility 0s, opacity 0.6s ease-in-out",
        }}
        className="absolute inset-x-0 top-0 p-4 bg-[#5B0058FF] h-16 flex items-center z-1"
      >
        <div
          style={{
            visibility: mustShowPlayButtonTop ? "visible" : "hidden",
            opacity: mustShowPlayButtonTop ? 1 : 0,
            transition: "visibility 0s, opacity 0.3s ease-in-out",
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
              backgroundColor: `rgba(91, 0, 88, calc(var(--scroll, 0) * 0.9))`,
            }}
            className="absolute top-0 left-0 h-full w-full z-0"
          />
        </div>
      </div>
      <ScrollArea
        className="min-h-screen flex-1"
        ref={scrollRef}
        onScrollCapture={handleScroll}
      >
        <div className="h-[40dvh] flex items-end relative z-10">
          <div className="flex flex-col p-4 z-1 flex-1">
            <p className="text-[76px] font-extrabold">JKT48</p>
            <p className="mt-2">1,540,960 monthly listeners</p>
          </div>
        </div>
        <div className="h-full mt-4 bg-background-base relative z-0">
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
                  <svg
                    data-encore-id="icon"
                    role="img"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="fill-current size-8"
                  >
                    <path d="M18.788 3.702a1 1 0 0 1 1.414-1.414L23.914 6l-3.712 3.712a1 1 0 1 1-1.414-1.414L20.086 7h-1.518a5 5 0 0 0-3.826 1.78l-7.346 8.73a7 7 0 0 1-5.356 2.494H1v-2h1.04a5 5 0 0 0 3.826-1.781l7.345-8.73A7 7 0 0 1 18.569 5h1.518l-1.298-1.298z"></path>
                    <path d="M18.788 14.289a1 1 0 0 0 0 1.414L20.086 17h-1.518a5 5 0 0 1-3.826-1.78l-1.403-1.668-1.306 1.554 1.178 1.4A7 7 0 0 0 18.568 19h1.518l-1.298 1.298a1 1 0 1 0 1.414 1.414L23.914 18l-3.712-3.713a1 1 0 0 0-1.414 0zM7.396 6.49l2.023 2.404-1.307 1.553-2.246-2.67a5 5 0 0 0-3.826-1.78H1v-2h1.04A7 7 0 0 1 7.396 6.49"></path>
                  </svg>
                </Button>
              </div>

              <div className="ml-6">
                <button className="ms-auto rounded-2xl border-white border px-4 h-8 font-bold text-sm">Follow</button>
              </div>
              <div className="ml-6">
                <Button variant="tertiary">
                  <svg
                    data-encore-id="icon"
                    role="img"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="fill-current size-8"
                  >
                    <path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"></path>
                  </svg>
                </Button>
              </div>
            </div>
            <div>
              <h2 className="font-semibold text-2xl mt-8 mb-2 font-semibold">Popular</h2>
              <TrackList />
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  );
};
