import React from "react";
import { PlayButton } from "@/components/ui/play-button";
import { useAlbumInfo } from "../context/album-page-context";

interface AlbumHeaderProps {
  isScrolled: boolean;
  mustShowPlayButton: boolean;
  backgroundColor: string;
  scrollProgress: number;
  headerRef: React.RefObject<HTMLDivElement | null>;
}

export const AlbumHeader: React.FC<AlbumHeaderProps> = ({ isScrolled, mustShowPlayButton, backgroundColor, scrollProgress, headerRef }) => {
  const info = useAlbumInfo();
  return (
    <header
      ref={headerRef}
      style={
        {
          "--background-base": backgroundColor,
          backgroundColor: "var(--background-base)",
          visibility: isScrolled ? "visible" : "hidden",
          opacity: `calc(${scrollProgress} * 1.6)`,
        } as React.CSSProperties
      }
      className="absolute inset-x-0 top-0 p-4 h-16 flex items-center z-1"
    >
      <div
        style={{
          visibility: mustShowPlayButton ? "visible" : "hidden",
          opacity: mustShowPlayButton ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
        className="flex items-center gap-2"
      >
        <PlayButton size="sm" />
        <span className="font-semibold text-2xl">{info.name}</span>
      </div>
    </header>
  );
};
