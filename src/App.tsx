import { useRef } from "react";
import { ScrollArea, type ScrollAreaRef } from "./components/scroll-area";
import { useScrollTrigger } from "./hooks/use-scroll-trigger";
import { useNavigate } from "react-router";
import { useThemeStore } from "./stores/use-theme-store";
import { useExtractColor } from "./hooks/use-extract-color";
import { RECENTS } from "./data/recents";

function App() {
  const scrollRef = useRef<ScrollAreaRef | null>(null);
  const isScrolled = useScrollTrigger(scrollRef, 10);

  const navigate = useNavigate();

  const dominantColor = useThemeStore((state) => state.dominantColor);
  const dominantColorDark = useThemeStore((state) => state.dominantColorDark);
  const { extractColorFromImage } = useExtractColor();

  const handleCardHover = (imageSrc: string) => {
    extractColorFromImage(imageSrc);
  };

  const handleCardClick = (navigatePath: string) => {
    navigate(navigatePath);
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      <div
        className="w-full h-64  mt-0 absolute top-0 left-0 pointer-events-none transition-colors duration-300 ease-in-out z-0"
        style={{
          backgroundColor: dominantColor,
          backgroundImage: "linear-gradient(#0009 0%, var(--background-base) 100%), var(--background-noise)",
        }}
      ></div>
      <ScrollArea
        className="flex-1"
        ref={scrollRef}
      >
        <div
          style={{
            backgroundColor: isScrolled ? dominantColorDark : "transparent",
            backgroundImage: isScrolled ? "var(--background-noise)" : "none",
          }}
          className="px-10 h-16 z-20 flex items-center sticky top-0 gap-2 mb-2 transition-colors duration-200 ease-in-out relative"
        >
          <button
            aria-label="Create"
            className="p-2 text-sm font-medium px-4 py-2 bg-[#f0f0f0] text-background-base transition-colors inline-flex items-center gap-2 rounded-2xl"
          >
            All
          </button>
          <button
            aria-label="Create"
            className="p-2 text-sm font-medium px-4 py-2 bg-background-tinted-base hover:bg-background-tinted-highlight transition-colors inline-flex items-center gap-2 rounded-2xl"
          >
            Music
          </button>
          <button
            aria-label="Create"
            className="p-2 text-sm font-medium px-4 py-2 bg-background-tinted-base hover:bg-background-tinted-highlight transition-colors inline-flex items-center gap-2 rounded-2xl"
          >
            Podcast
          </button>
        </div>
        <div className="px-10 pb-4 flex flex-col gap-6">
          <section className="min-h-12 flex flex-col mb-4 relative">
            <div className="grid grid-cols-2 gap-2  @[780px]/main-view:grid-cols-4">
              {RECENTS.map((r) => {
                return (
                  <div
                    key={r.id}
                    className="h-12 bg-background-tinted-base rounded-sm overflow-hidden cursor-pointer hover:bg-background-tinted-highlight transition-colors"
                    onMouseEnter={() => handleCardHover(r.imageUrl)}
                    onClick={() => handleCardClick(r.href)}
                  >
                    <div className="text-sm font-medium flex items-center h-full">
                      <div className="relative w-12 h-12 aspect-square">
                        <img
                          src={r.imageUrl}
                          alt="Playlist cover"
                          className="object-cover w-full h-full absolute top-0 left-0"
                          crossOrigin="anonymous"
                        />
                      </div>
                      <span className="line-clamp-2  ms-2">{r.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          <section>
            <div className="flex justify-between">
              <h2 className="text-2xl hover:underline font-semibold mb-4">It's New Music Friday</h2>
              <span className="text-base font-medium text-text-subdued hover:underline">Show all</span>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(8)].map((_, index) => {
                const imageSrc = `https://newjams-images.scdn.co/image/ab67647800003f8a/dt/v3/release-radar/ab6761610000e5eb9adad46022570f8b8b3209a9/en`;
                return (
                  <div
                    key={index}
                    className="flex flex-col cursor-pointer group"
                  >
                    <div className="relative w-full rounded-md overflow-hidden pb-[100%] mb-2">
                      <img
                        src={imageSrc}
                        alt="Playlist cover"
                        className="object-cover w-full h-full absolute top-0 left-0"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <span className="font-medium text-sm line-clamp-2 group-hover:underline">New Music Friday Indonesia {index + 1}</span>
                    <span className="text-text-subdued text-xs line-clamp-1">Various Artists</span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
}

export default App;
