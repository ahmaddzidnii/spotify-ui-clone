import { Link } from "react-router";
import { ScrollArea } from "@/components/scroll-area";
import { Image as OptimizedImage } from "@/components/image";
import { useState, useEffect, type CSSProperties } from "react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/stores/use-sidebar-store";
import { FastAverageColor } from "fast-average-color";

export const RightSidebar = () => {
  const [isFull, setIsFull] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [bgColor, setBgColor] = useState("rgb(83, 83, 83)");

  const sidebarWidth = useSidebarStore((state) => state.rightSidebarWidth);
  const setRightSidebarWidth = useSidebarStore((state) => state.setRightSidebarWidth);

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
    setIsCollapsed((prev) => !prev);
    setRightSidebarWidth(!isCollapsed ? 40 : 420);
  };

  return (
    <aside
      style={{ "--right-sidebar-width": `${sidebarWidth}px` } as CSSProperties}
      className={cn("right-sidebar @container/right-sidebar", isFull && "full")}
    >
      {/* Button Collapse */}

      <Button
        variant="tertiary"
        className={cn(
          "h-full w-full",
          "@[61px]/right-sidebar:hidden", // sembunyikan saat >= 61px
        )}
        onClick={handleCollapse}
      >
        <svg
          role="img"
          viewBox="0 0 16 16"
          className="size-6 fill-current"
        >
          <path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0"></path>
        </svg>
      </Button>

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
              <Button
                className="p-2 mr-3"
                aria-label="Collapse"
                variant="tertiary"
                onClick={handleCollapse}
              >
                <svg
                  role="img"
                  viewBox="0 0 16 16"
                  className="fill-current size-4"
                >
                  <path d="M5.03 10.53a.75.75 0 1 1-1.06-1.06L5.44 8 3.97 6.53a.75.75 0 0 1 1.06-1.06l2 2a.75.75 0 0 1 0 1.06z"></path>
                  <path d="M1 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm.5 1.5h8v13h-8zm13 13H11v-13h3.5z"></path>
                </svg>
              </Button>
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
                <svg
                  role="img"
                  viewBox="0 0 16 16"
                  className="size-4 fill-current"
                >
                  <path d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"></path>
                </svg>
              </Button>
              <Button
                aria-label="Full screen"
                className="p-2"
                variant="tertiary"
                onClick={() => {
                  setIsFull((prev) => !prev);
                }}
              >
                <svg
                  role="img"
                  viewBox="0 0 16 16"
                  className="size-4 fill-current"
                >
                  <path d="M6.53 9.47a.75.75 0 0 1 0 1.06l-2.72 2.72h1.018a.75.75 0 0 1 0 1.5H1.25v-3.579a.75.75 0 0 1 1.5 0v1.018l2.72-2.72a.75.75 0 0 1 1.06 0zm2.94-2.94a.75.75 0 0 1 0-1.06l2.72-2.72h-1.018a.75.75 0 1 1 0-1.5h3.578v3.579a.75.75 0 0 1-1.5 0V3.81l-2.72 2.72a.75.75 0 0 1-1.06 0"></path>
                </svg>
              </Button>
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
                <Button
                  aria-label="Copy Link to Song"
                  className="p-2"
                  variant="tertiary"
                >
                  <svg
                    role="img"
                    viewBox="0 0 16 16"
                    className="size-6 fill-current"
                  >
                    <path d="M1 5.75A.75.75 0 0 1 1.75 5H4v1.5H2.5v8h11v-8H12V5h2.25a.75.75 0 0 1 .75.75v9.5a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75z"></path>
                    <path d="M8 9.576a.75.75 0 0 0 .75-.75V2.903l1.454 1.454a.75.75 0 0 0 1.06-1.06L8 .03 4.735 3.296a.75.75 0 0 0 1.06 1.061L7.25 2.903v5.923c0 .414.336.75.75.75"></path>
                  </svg>
                </Button>
                <Button
                  aria-label="Add to liked songs"
                  className="p-2"
                  variant="tertiary"
                >
                  <svg
                    data-encore-id="icon"
                    role="img"
                    viewBox="0 0 16 16"
                    className="size-6 fill-current"
                  >
                    <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"></path>
                    <path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75"></path>
                  </svg>
                </Button>
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
                    <svg
                      role="img"
                      viewBox="0 0 16 16"
                      className="size-4 fill-current"
                    >
                      <path d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"></path>
                    </svg>
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
                <svg
                  role="img"
                  viewBox="0 0 16 16"
                  className="size-4 fill-current"
                >
                  <path d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"></path>
                </svg>
              </Button>
              <Button
                aria-label="Full screen"
                className="p-2"
                variant="tertiary"
                onClick={() => {
                  setIsFull((prev) => !prev);
                }}
              >
                <svg
                  role="img"
                  viewBox="0 0 16 16"
                  className="size-4 fill-current"
                >
                  <path d="M14.53 1.47a.75.75 0 0 1 0 1.06l-2.72 2.72h1.018a.75.75 0 1 1 0 1.5H9.25V3.171a.75.75 0 1 1 1.5 0V4.19l2.72-2.72a.75.75 0 0 1 1.06 0M1.47 14.53a.75.75 0 0 1 0-1.06l2.72-2.72H3.171a.75.75 0 0 1 0-1.5H6.75v3.579a.75.75 0 1 1-1.5 0V11.81l-2.72 2.72a.75.75 0 0 1-1.06 0"></path>
                </svg>
              </Button>
            </div>
          </div>
          <section>
            <div className="w-full aspect-square overflow-hidden rounded-2xl relative xl:max-w-[420px] mx-auto">
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
  );
};
