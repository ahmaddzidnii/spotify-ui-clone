import React from "react";

interface AlbumHeaderProps {
  albumName: string;
  isScrolled: boolean;
  mustShowPlayButton: boolean;
  backgroundColor: string;
  scrollProgress: number;
  headerRef: React.RefObject<HTMLDivElement | null>;
}

export const AlbumHeader: React.FC<AlbumHeaderProps> = ({
  albumName,
  isScrolled,
  mustShowPlayButton,
  backgroundColor,
  scrollProgress,
  headerRef,
}) => {
  return (
    <header
      ref={headerRef}
      style={
        {
          "--background-base": backgroundColor,
          visibility: isScrolled ? "visible" : "hidden",
          opacity: `calc(${scrollProgress} * 1.6)`,
          backgroundColor: "var(--background-base)",
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
        <button className="flex items-center justify-center bg-[#1ed760] p-2 rounded-full w-12 h-12">
          <svg
            role="img"
            viewBox="0 0 16 16"
            className="w-6 h-6 fill-background-base"
          >
            <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"></path>
          </svg>
        </button>
        <span className="font-semibold text-2xl">{albumName}</span>
      </div>
    </header>
  );
};
