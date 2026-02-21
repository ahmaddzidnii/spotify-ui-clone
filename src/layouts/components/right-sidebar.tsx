import { Link } from "react-router";
import { ScrollArea } from "@/components/scroll-area";
import { Image as OptimizedImage } from "@/components/image";
import { useState, useEffect, type CSSProperties } from "react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { useSidebarWidth, useSidebarActions } from "@/stores/use-sidebar-store";
import { FastAverageColor } from "fast-average-color";
import { Tooltip } from "@/components/ui/tooltip";
import { useSidebarFullStore } from "@/stores/use-sidebar-full-store";
import {
  EncoreIconChevronLeft,
  EncoreIconChevronRight,
  EncoreIconMoreOptions,
  EncoreIconExpand,
  EncoreIconMinimize,
  EncoreIconCopy,
  EncoreIconPlus,
} from "@/components/encore/icons";

export const RightSidebar = () => {
  const activeFull = useSidebarFullStore((state) => state.activeFull);
  const toggleLeftFull = useSidebarFullStore((state) => state.toggleRightFull);

  const isFull = activeFull === "right";

  const [bgColor, setBgColor] = useState("rgb(83, 83, 83)");

  const sidebarWidth = useSidebarWidth("right");
  const { toggle } = useSidebarActions();

  const imageUrl = "https://i.scdn.co/image/ab67616d0000b2730f94886d67ae4e92a92b2281";
  // const imageUrl = " https://i.scdn.co/image/ab6761610000e5eb07189aefe72bf176ecd0b2ab";

  useEffect(() => {
    const fac = new FastAverageColor();
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      try {
        const color = fac.getColor(img);
        setBgColor(color.rgb);
      } catch (error) {
        console.error("Error extracting color:", error);
      } finally {
        fac.destroy();
      }
    };
  }, [imageUrl]);

  const handleCollapse = () => {
    toggle("right", "user");
  };

  return (
    <>
      <div
        className="sidebar-right-filler "
        style={{ "--right-sidebar-width": `${sidebarWidth}` } as CSSProperties}
      ></div>
      <aside
        style={{ "--right-sidebar-width": `${sidebarWidth}` } as CSSProperties}
        className={cn("right-sidebar @container/right-sidebar group", isFull && "full")}
      >
        {/* Button Collapse */}
        <Tooltip
          content="Show Now Playing view"
          side="left"
        >
          <Button
            variant="tertiary"
            className={cn(
              "h-full w-full",
              "@[61px]/right-sidebar:hidden", // sembunyikan saat >= 61px
            )}
            onClick={handleCollapse}
          >
            <EncoreIconChevronLeft className="size-6" />
          </Button>
        </Tooltip>

        {/* Ui saat display tidak full */}
        <div
          className={cn(
            "h-full flex flex-col",
            "@max-[60px]/right-sidebar:hidden", // sembunyikan saat <= 60px
            "@min-[421px]/right-sidebar:hidden",
          )}
        >
          <div className="px-4">
            <div className="flex items-center h-16 py-2">
              {!isFull && (
                <Tooltip
                  content="Hide Now Playing view"
                  side="top"
                >
                  <Button
                    className="p-2 mr-3"
                    aria-label="Collapse"
                    variant="tertiary"
                    onClick={handleCollapse}
                  >
                    <EncoreIconChevronRight className="size-4" />
                  </Button>
                </Tooltip>
              )}

              <div>
                <Link
                  to="/"
                  className="text-base font-bold"
                >
                  Banyu Moto
                </Link>
              </div>
              <div className="flex gap-2 ms-auto">
                <Button
                  aria-label="More option"
                  className="p-2"
                  variant="tertiary"
                >
                  <EncoreIconMoreOptions className="size-4" />
                </Button>
                <Tooltip
                  content="Expand Now Playing View"
                  side="top"
                >
                  <Button
                    aria-label="Full screen"
                    className="p-2"
                    variant="tertiary"
                    onClick={toggleLeftFull}
                  >
                    <EncoreIconExpand className="size-4" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="px-4 py-4">
              <div className="w-full aspect-square overflow-hidden rounded-lg relative xl:max-w-96 mx-auto">
                <OptimizedImage
                  src={imageUrl}
                  alt="Album cover"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
              <div className="flex h-auto items-center">
                <div>
                  <h2 className="mt-4  text-2xl font-bold">Banyu Moto</h2>
                  <p className="text-base text-text-subdued">Sleman Receh</p>
                </div>
                <div className="ms-auto flex gap-2">
                  <Tooltip
                    content="Copy Link to Song"
                    side="top"
                  >
                    <Button
                      aria-label="Copy Link to Song"
                      className="p-2 invisible group-hover:visible transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                      variant="tertiary"
                    >
                      <EncoreIconCopy className="size-6" />
                    </Button>
                  </Tooltip>

                  <Tooltip
                    content="Add to liked songs"
                    side="top"
                  >
                    <Button
                      aria-label="Add to liked songs"
                      className="p-2"
                      variant="tertiary"
                    >
                      <EncoreIconPlus className="size-6" />
                    </Button>
                  </Tooltip>
                </div>
              </div>
              <div className="flex flex-col rounded-lg bg-background-base overflow-hidden px-4 py-6 mt-6 gap-6">
                <div className="flex">
                  <span className="font-bold text-base">Credits</span>
                  <Link
                    className="ms-auto font-bold text-text-subdued text-sm hover:underline"
                    to="/"
                  >
                    Show all
                  </Link>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <span className="mb-1">Sleman Receh</span>
                      <span className="text-text-subdued text-sm">Main Artist</span>
                    </div>
                    <button className="ms-auto rounded-2xl border-white border px-4 h-8 font-bold text-sm">Follow</button>
                  </div>
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <span className="mb-1">Heri Marwanto</span>
                      <span className="text-text-subdued text-sm">Composer</span>
                    </div>
                    <button className="ms-auto rounded-2xl border-white border px-4 h-8 font-bold text-sm">Follow</button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-lg bg-background-base overflow-hidden px-4 py-6 mt-6 gap-6">
                <div className="flex">
                  <span className="font-bold text-base">Next in queue</span>
                  <Link
                    className="ms-auto font-bold text-text-subdued text-sm hover:underline"
                    to="/"
                  >
                    Open queue
                  </Link>
                </div>
                <div className="flex flex-col">
                  <div className="flex">
                    <div className="relative w-12 h-12 aspect-square rounded-sm overflow-hidden flex shrink-0 me-4">
                      <OptimizedImage
                        src="https://i.scdn.co/image/ab67616d00001e02d7105ffabf2ff9ddd265eab1"
                        alt="Queue item cover"
                        className="absolute w-full top-0 bottom-0"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1">Dirimu yang dahulu</span>
                      <span className="text-text-subdued text-sm">Anggis Devaki</span>
                    </div>
                    <Button
                      aria-label="More option"
                      className="p-2 ms-auto"
                      variant="tertiary"
                    >
                      <EncoreIconMoreOptions className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Ui saat full screen mode */}
        <div className="flex flex-col h-full @max-[421px]/right-sidebar:hidden relative z-0">
          <div
            style={
              {
                "--cinema-mode-bg-color-from": bgColor,
                backgroundColor: bgColor,
                backgroundImage: `
    linear-gradient(
      to bottom,
      var(--cinema-mode-bg-color-from),
      var(--cinema-mode-bg-color-from)
    )
  `,
              } as CSSProperties
            }
            className="h-[calc(100vh-var(--panel-gap)*2)] absolute  inset-0 -z-1  transition-[background] duration-300"
          ></div>
          <ScrollArea className="flex-1 px-6 ">
            <div className="flex items-center h-16 py-2 sticky top-0 w-full bg-transparent">
              <div>
                <Link
                  to="/"
                  className="text-base font-bold"
                >
                  Banyu Moto
                </Link>
              </div>
              <div className="flex gap-2 ms-auto">
                <Button
                  aria-label="More option"
                  className="p-2"
                  variant="tertiary"
                >
                  <EncoreIconMoreOptions className="size-4" />
                </Button>
                <Tooltip
                  content="Minimize Now Playing View"
                  side="top"
                >
                  <Button
                    aria-label="Full screen"
                    className="p-2"
                    variant="tertiary"
                    onClick={toggleLeftFull}
                  >
                    <EncoreIconMinimize className="size-4" />
                  </Button>
                </Tooltip>
              </div>
            </div>
            <section>
              <div className="aspect-square overflow-hidden rounded-2xl relative max-w-[420px] mx-auto">
                <OptimizedImage
                  src={imageUrl}
                  alt="Album cover"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
            </section>
          </ScrollArea>
        </div>
      </aside>
    </>
  );
};
