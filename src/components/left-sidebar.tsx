import { FaPlus } from "react-icons/fa6";
import { ScrollArea } from "./scroll-area";
import { useState, type CSSProperties } from "react";
import { cn } from "@/utils/cn";
import { Button } from "./ui/button";
import { useSidebarStore } from "@/stores/use-sidebar-store";
import { PlaylistItem } from "./playlist-item";
import { likedSongs, playlists } from "@/data/playlists";

export const LeftSidebar = () => {
  const [isFull, setIsFull] = useState(false);

  const sidebarWidth = useSidebarStore((state) => state.leftSidebarWidth);
  const toggleLeftCollapse = useSidebarStore((state) => state.toggleLeftCollapse);

  const handleCollapse = () => {
    toggleLeftCollapse();
  };

  return (
    <aside
      style={{ "--left-sidebar-width": `${sidebarWidth}px` } as CSSProperties}
      className={cn("left-sidebar @container/left-sidebar", isFull && "full")}
    >
      <div className="h-full flex flex-col">
        <div className="px-4 @max-[280px]/left-sidebar:hidden">
          <div className="flex items-center h-16 py-2">
            {!isFull && (
              <>
                <Button
                  variant="tertiary"
                  className="p-2"
                  onClick={handleCollapse}
                >
                  <svg
                    role="img"
                    viewBox="0 0 16 16"
                    className="fill-current size-4"
                  >
                    <path d="M10.97 5.47a.75.75 0 1 1 1.06 1.06L10.56 8l1.47 1.47a.75.75 0 1 1-1.06 1.06l-2-2a.75.75 0 0 1 0-1.06z"></path>
                    <path d="M1 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm.5 1.5H5v13H1.5zm13 13h-8v-13h8z"></path>
                  </svg>
                </Button>
              </>
            )}
            <div className="ms-3">
              <span className="text-base font-bold">Your Library</span>
            </div>
            <div className="flex gap-2 ms-auto">
              <button
                aria-label="Create"
                className="p-2 text-sm  font-bold text-[#b3b3b3] hover:bg-background-elevated-highlight transition-colors inline-flex items-center gap-2 rounded-2xl"
              >
                <FaPlus />
                <span className="hidden @[330px]/left-sidebar:block"> Create</span>
              </button>
              <Button
                variant="tertiary"
                aria-label="Full screen"
                className="p-2"
                onClick={() => setIsFull((prev) => !prev)}
              >
                {isFull ? (
                  <svg
                    role="img"
                    viewBox="0 0 16 16"
                    className="size-4 fill-current"
                  >
                    <path d="M14.53 1.47a.75.75 0 0 1 0 1.06l-2.72 2.72h1.018a.75.75 0 1 1 0 1.5H9.25V3.171a.75.75 0 1 1 1.5 0V4.19l2.72-2.72a.75.75 0 0 1 1.06 0M1.47 14.53a.75.75 0 0 1 0-1.06l2.72-2.72H3.171a.75.75 0 0 1 0-1.5H6.75v3.579a.75.75 0 1 1-1.5 0V11.81l-2.72 2.72a.75.75 0 0 1-1.06 0"></path>
                  </svg>
                ) : (
                  <svg
                    role="img"
                    viewBox="0 0 16 16"
                    className="size-4 fill-current"
                  >
                    <path d="M6.53 9.47a.75.75 0 0 1 0 1.06l-2.72 2.72h1.018a.75.75 0 0 1 0 1.5H1.25v-3.579a.75.75 0 0 1 1.5 0v1.018l2.72-2.72a.75.75 0 0 1 1.06 0zm2.94-2.94a.75.75 0 0 1 0-1.06l2.72-2.72h-1.018a.75.75 0 1 1 0-1.5h3.578v3.579a.75.75 0 0 1-1.5 0V3.81l-2.72 2.72a.75.75 0 0 1-1.06 0"></path>
                  </svg>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Colapsed Sidebar Header */}
        <div className="px-4 @min-[280px]/left-sidebar:hidden">
          <div className="flex flex-col items-center py-2 gap-6">
            <Button
              variant="tertiary"
              className="p-2 group"
              onClick={handleCollapse}
            >
              <svg
                role="img"
                viewBox="0 0 16 16"
                className="fill-current size-5 rotate-180 hidden group-hover:block"
              >
                <path d="M10.97 5.47a.75.75 0 1 1 1.06 1.06L10.56 8l1.47 1.47a.75.75 0 1 1-1.06 1.06l-2-2a.75.75 0 0 1 0-1.06z"></path>
                <path d="M1 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm.5 1.5H5v13H1.5zm13 13h-8v-13h8z"></path>
              </svg>
              <svg
                role="img"
                viewBox="0 0 24 24"
                className="size-5 fill-current group-hover:hidden"
              >
                <path d="M14.5 2.134a1 1 0 0 1 1 0l6 3.464a1 1 0 0 1 .5.866V21a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 .5-.866M16 4.732V20h4V7.041zM3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1m6 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1"></path>
              </svg>
            </Button>

            <div className="flex gap-2">
              <button
                aria-label="Create"
                className="p-2 text-sm  font-bold text-[#b3b3b3] hover:bg-background-elevated-highlight transition-colors inline-flex items-center gap-2 rounded-2xl"
              >
                <FaPlus className="size-5" />
              </button>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-2 px-4 py-4 flex-wrap  @min-[421px]/left-sidebar:grid @min-[421px]/left-sidebar:grid-cols-6">
            <PlaylistItem playlist={likedSongs} />
            {playlists.map((playlist) => (
              <PlaylistItem
                key={playlist.id}
                playlist={playlist}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
};
