import type { Playlist } from "@/data/playlists";

interface PlaylistItemProps {
  playlist: Playlist;
}

export const PlaylistItem = ({ playlist }: PlaylistItemProps) => {
  return (
    <div
      role="button"
      className="group hover:bg-background-elevated-highlight rounded-md @min-[280px]/left-sidebar:p-2 flex @min-[421px]/left-sidebar:flex-col @min-[421px]/left-sidebar:gap-2"
    >
      <div className="w-12 rounded-md overflow-hidden relative aspect-square @min-[421px]/left-sidebar:w-full">
        <img
          src={playlist.coverImage}
          alt={`${playlist.title} cover`}
          className="object-cover w-full h-full absolute top-0 left-0"
        />
        {/* Play button - shows on hover for larger screens */}
        <button className="flex items-center justify-center bg-[#1ed760] p-2 rounded-full w-12 h-12 absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity @max-[421px]/left-sidebar:hidden">
          <svg
            role="img"
            viewBox="0 0 16 16"
            className="w-6 h-6 fill-background-base"
          >
            <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"></path>
          </svg>
        </button>
        {/* Play button - centered for mobile view */}
        <button className="flex items-center justify-center p-2 rounded-full bg-[#1ed760] size-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity @min-[421px]/left-sidebar:hidden">
          <svg
            role="img"
            viewBox="0 0 16 16"
            className="w-6 h-6 fill-background-base"
          >
            <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"></path>
          </svg>
        </button>
      </div>
      <div className="flex flex-col ms-4 @min-[421px]/left-sidebar:ms-0 @max-[280px]/left-sidebar:hidden">
        <h2 className="text-base font-medium">{playlist.title}</h2>
        <div className="flex text-text-subdued text-sm">
          {playlist.isPinned && (
            <svg
              role="img"
              viewBox="0 0 16 16"
              className="size-3 fill-[#1ed760] mt-1 me-2"
            >
              <title>Pinned</title>
              <path d="M8.822.797a2.72 2.72 0 0 1 3.847 0l2.534 2.533a2.72 2.72 0 0 1 0 3.848l-3.678 3.678-1.337 4.988-4.486-4.486L1.28 15.78a.75.75 0 0 1-1.06-1.06l4.422-4.422L.156 5.812l4.987-1.337z"></path>
            </svg>
          )}
          <p className="line-clamp-1 @min-[421px]/left-sidebar:text-xs">
            {playlist.subtitle || playlist.type}
            {playlist.songCount && <span> • {playlist.songCount} songs</span>}
            {playlist.subtitle && !playlist.songCount && playlist.type === "playlist" && <span> • {playlist.subtitle}</span>}
          </p>
        </div>
      </div>
    </div>
  );
};
