import { FaPlus } from "react-icons/fa6";
import { ScrollArea } from "@/components/scroll-area";
import { type CSSProperties } from "react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { useSidebarWidth, useSidebarActions } from "@/stores/use-sidebar-store";
import { PlaylistItem } from "@/features/playlist/components/playlist-item";
import { likedSongs, playlists } from "@/data/playlists";
import { Tooltip } from "@/components/ui/tooltip";
import { useSidebarFullStore } from "@/stores/use-sidebar-full-store";
import { EncoreIconCollapse, EncoreIconMinimize, EncoreIconExpand, EncoreIconLibrary } from "@/components/encore/icons";

export const LeftSidebar = () => {
  const activeFull = useSidebarFullStore((state) => state.activeFull);
  const toggleLeftFull = useSidebarFullStore((state) => state.toggleLeftFull);

  const isFull = activeFull === "left";

  const sidebarWidth = useSidebarWidth("left");
  const { toggle } = useSidebarActions();

  const handleCollapse = () => {
    toggle("left", "user");
  };

  return (
    <>
      <div
        style={{ "--left-sidebar-width": `${sidebarWidth}`, display: isFull ? "block" : "none" } as CSSProperties}
        className="sidebar-left-filler"
      ></div>
      <aside
        style={{ "--left-sidebar-width": `${sidebarWidth}` } as CSSProperties}
        className={cn("left-sidebar @container/left-sidebar", isFull && "full")}
      >
        <div className="h-full flex flex-col">
          <div className="px-4 @max-[280px]/left-sidebar:hidden">
            <div className="flex items-center h-16 py-2">
              {!isFull && (
                <Tooltip
                  content="Collapse Your Library"
                  side="top"
                >
                  <Button
                    variant="tertiary"
                    className="p-2"
                    onClick={handleCollapse}
                  >
                    <EncoreIconCollapse className="size-4" />
                  </Button>
                </Tooltip>
              )}
              <div className="ms-3">
                <span className="text-base font-bold">Your Library</span>
              </div>
              <div className="flex gap-2 ms-auto">
                <Tooltip
                  content="Create playlist,folder,or jam"
                  side="top"
                >
                  <button
                    aria-label="Create"
                    className="p-2 text-sm  font-bold text-[#b3b3b3] hover:bg-background-elevated-highlight transition-colors inline-flex items-center gap-2 rounded-2xl"
                  >
                    <FaPlus />
                    <span className="hidden @[330px]/left-sidebar:block"> Create</span>
                  </button>
                </Tooltip>
                <Tooltip
                  content={isFull ? "Minimize Your Library" : "Expand Your Library"}
                  side="top"
                >
                  <Button
                    variant="tertiary"
                    aria-label="Full screen"
                    className="p-2"
                    onClick={toggleLeftFull}
                  >
                    {isFull ? <EncoreIconMinimize className="size-4" /> : <EncoreIconExpand className="size-4" />}
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>

          {/* Colapsed Sidebar Header */}
          <div className="px-4 @min-[280px]/left-sidebar:hidden">
            <div className="flex flex-col items-center py-2 gap-6">
              <Tooltip
                content="Open Your Library"
                side="right"
              >
                <Button
                  variant="tertiary"
                  className="p-2 group"
                  onClick={handleCollapse}
                >
                  <EncoreIconCollapse className="size-5 rotate-180 hidden group-hover:block" />
                  <EncoreIconLibrary className="size-5 group-hover:hidden" />
                </Button>
              </Tooltip>

              <div className="flex gap-2">
                <Tooltip
                  content="Create playlist,folder,or jam"
                  side="right"
                >
                  <button
                    aria-label="Create"
                    className="p-2 text-sm  font-bold text-[#b3b3b3] hover:bg-background-elevated-highlight transition-colors inline-flex items-center gap-2 rounded-2xl"
                  >
                    <FaPlus className="size-5" />
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-2 px-4 py-4 @min-[421px]/left-sidebar:grid @min-[421px]/left-sidebar:grid-cols-2 @min-[500px]/left-sidebar:grid-cols-3 @min-[600px]/left-sidebar:grid-cols-4 @min-[900px]/left-sidebar:grid-cols-6">
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
    </>
  );
};
