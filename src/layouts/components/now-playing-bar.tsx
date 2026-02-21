import { Button } from "@/components/ui/button";
import { Image } from "@/components/image";
import {
  EncoreIconCheck,
  EncoreIconLyrics,
  EncoreIconQueue,
  EncoreIconConnectDevice,
  EncoreIconVolume,
  EncoreIconFullscreenEnter,
  EncoreIconFullscreenExit,
} from "@/components/encore/icons";

import { PlayerControls } from "./player-controls";
import { useEffect, useState } from "react";
import { Tooltip } from "@/components/ui/tooltip";
import { useLocation, useNavigate } from "react-router";
import { useSidebarFullStore } from "@/stores/use-sidebar-full-store";

export const NowPlayingBar = () => {
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);

  const navigate = useNavigate();
  const location = useLocation();
  const isAnySidebarFull = useSidebarFullStore((state) => state.activeFull) !== null;
  const closeAnySidebarOpen = useSidebarFullStore((state) => state.closeAnyFull);
  const shouldActivateLyrics = location.pathname === "/lyrics" && !isAnySidebarFull;

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleChange);
    };
  }, []);

  const handleLyricsClick = () => {
    if (isAnySidebarFull) {
      closeAnySidebarOpen();
    }

    if (shouldActivateLyrics) {
      navigate("/");
      return;
    }

    navigate("/lyrics");
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  return (
    <div className="now-playing-bar pt-4! @container/now-playing-bar-container">
      <div className="h-[72px] flex justify-between items-center w-full px-4 pb-4">
        {/* Left: Now Playing Info */}
        <div className="w-[30%] @max-[900px]/now-playing-bar-container:w-[25%] @max-[700px]/now-playing-bar-container:w-[20%] @max-[600px]/now-playing-bar-container:w-0 flex-shrink-0 overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded overflow-hidden flex-shrink-0">
              <Image
                className="w-full h-full object-cover"
                src="https://i.scdn.co/image/ab67616d0000b2730f94886d67ae4e92a92b2281"
                alt="Album cover"
              />
            </div>
            <div className="min-w-0 ml-1">
              <p className="text-[13px] mb-1 font-medium text-white truncate">Banyu Moto</p>
              <p className="text-[11px] font-medium text-text-subdued truncate hover:underline cursor-pointer">Sleman Receh</p>
            </div>
            <button
              className="ml-2 p-2 text-[#b3b3b3] hover:text-white transition-colors"
              aria-label="Add to liked songs"
            >
              <EncoreIconCheck className="w-4 h-4 fill-[#10ca54]" />
            </button>
          </div>
        </div>

        {/* Center: Player Controls */}
        <div className="w-[40%] @max-[900px]/now-playing-bar-container:w-[50%] @max-[700px]/now-playing-bar-container:w-[60%] @max-[600px]/now-playing-bar-container:w-full flex-shrink min-w-0">
          <PlayerControls />
        </div>

        {/* Right: Volume & Other Controls */}
        <div className="w-[30%] @max-[900px]/now-playing-bar-container:w-[25%] @max-[700px]/now-playing-bar-container:w-[20%] @max-[600px]/now-playing-bar-container:w-0 flex-shrink-0 flex justify-end items-center gap-0">
          <Tooltip content="Lyrics">
            <Button
              variant="tertiary"
              className="p-2 relative"
              aria-label="Lyrics"
              onClick={handleLyricsClick}
            >
              <EncoreIconLyrics
                style={{
                  fill: shouldActivateLyrics ? "#1db954" : "currentColor",
                }}
                className="w-4 h-4"
              />
              {shouldActivateLyrics && (
                <span
                  style={{
                    color: "#1db954",
                  }}
                  className="absolute -bottom-2"
                >
                  •
                </span>
              )}
            </Button>
          </Tooltip>

          <Tooltip content="Queue">
            <Button
              variant="tertiary"
              className="p-2"
              aria-label="Queue"
            >
              <EncoreIconQueue className="w-4 h-4" />
            </Button>
          </Tooltip>

          <Tooltip content="Connect to a device">
            <Button
              variant="tertiary"
              className="p-2"
              aria-label="Connect to a device"
            >
              <EncoreIconConnectDevice className="w-4 h-4" />
            </Button>
          </Tooltip>

          <div className="flex items-center gap-2">
            <Tooltip content="Mute">
              <Button
                variant="tertiary"
                className="p-2"
                aria-label="Mute"
              >
                <EncoreIconVolume className="w-4 h-4" />
              </Button>
            </Tooltip>

            <div className="w-[93px] group">
              <div className="relative h-1 bg-[#4d4d4d] rounded-full overflow-hidden">
                <div className="absolute h-full bg-white rounded-full group-hover:bg-[#1db954] transition-colors w-[60%]">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </div>
          </div>

          <Tooltip content={isFullscreen ? "Exit full screen" : "Enter Full screen"}>
            <Button
              variant="tertiary"
              className="p-2"
              aria-label="Full screen"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? <EncoreIconFullscreenExit /> : <EncoreIconFullscreenEnter />}
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
