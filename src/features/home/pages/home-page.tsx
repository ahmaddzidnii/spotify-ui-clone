import { useRef } from "react";
import { useNavigate } from "react-router";
import { ScrollArea, type ScrollAreaRef } from "@/components/scroll-area";
import { Image } from "@/components/image";
import { PlayButton } from "@/components/ui/play-button";
import { useScrollTrigger } from "@/hooks/use-scroll-trigger";
import { useThemeStore } from "@/stores/use-theme-store";
import { useExtractColor } from "@/hooks/use-extract-color";
import { RECENTS } from "@/data/recents";
import { NEW_MUSIC_FRIDAY } from "@/data/new-music-friday";
import { getDateName } from "@/utils/get-day-name";
import { Carousel, MediaCard } from "@/features/shared/components";

export const HomePage = () => {
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
    <div className="h-full flex flex-col relative overflow-hidden home-content">
      <div
        className="w-full h-64  mt-0 absolute top-0 left-0 pointer-events-none transition-colors duration-300 ease-in-out z-0"
        style={{
          backgroundColor: dominantColor,
          backgroundImage: "linear-gradient(#0009 0%, var(--background-elevated-base) 100%), var(--background-noise)",
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
          className="px-10 h-16 z-20 flex items-center sticky top-0 gap-2 mb-2 transition-colors duration-200 ease-in-out"
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
                    className="h-12 bg-background-tinted-base rounded-sm overflow-hidden cursor-pointer hover:bg-[#fff3] transition-colors relative group"
                    onMouseEnter={() => handleCardHover(r.imageUrl)}
                    onClick={() => handleCardClick(r.href)}
                  >
                    <div className="text-sm font-medium flex items-center h-full">
                      <div className="relative w-12 h-12 aspect-square">
                        <Image
                          src={r.imageUrl}
                          alt="Playlist cover"
                          className="object-cover w-full h-full absolute top-0 left-0"
                        />
                      </div>
                      <span className="line-clamp-2  ms-2">{r.title}</span>
                    </div>
                    <PlayButton
                      size="xs"
                      iconSize="xs"
                      variant="hover"
                      positioning="absolute"
                      className="right-2 top-1/2 -translate-y-1/2"
                    />
                  </div>
                );
              })}
            </div>
          </section>
          {/* <section
            style={
              {
                "--carousel-shelf-element-width": "calc(var(--content-max-width) / var(--regular-shelf-max-count))",
                "--carousel-shelf-min-items": 1.5,
                "--shelf-collapsable-min-width": "calc(var(--carousel-shelf-element-width) * var(--carousel-shelf-min-items, 1))",
                "--shelf-carousel-margin-start-mul": -1,
                "--shelf-carousel-margin-end-mul": -1,
              } as React.CSSProperties
            }
            className="shelf flex flex-col relative"
          > */}
          <Carousel
            title={`It's New Music ${getDateName(new Date())}`}
            showAll={true}
            onShowAll={() => console.log("Show all clicked")}
            className="shelf"
          >
            {NEW_MUSIC_FRIDAY.map((playlist) => (
              <MediaCard
                key={playlist.id}
                title={""}
                subtitle={playlist.description}
                imageSources={[{ url: playlist.imageUrl }]}
                href={"#"}
                imageShape="square"
              />
            ))}
          </Carousel>
          {/* </section> */}
        </div>
      </ScrollArea>
    </div>
  );
};
