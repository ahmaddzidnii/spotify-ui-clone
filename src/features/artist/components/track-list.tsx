import { cn } from "@/utils/cn";
import { Image } from "@/components/image";
import { EncoreIconCheck, EncoreIconMoreOptions, EncoreIconPlay } from "@/components/encore/icons";
import type { Track } from "@/data/artists";

interface TrackListProps {
  tracks: Track[];
}

export const TrackList = ({ tracks }: TrackListProps) => {
  return (
    <div>
      <div className="flex flex-col">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className={cn(
              "group grid grid-cols-[40px_minmax(0,1fr)_120px_40px_80px] gap-4 items-center px-4 py-2 rounded-md transition-colors",
              track.isActive ? "bg-background-elevated-highlight" : "hover:bg-background-elevated-highlight",
            )}
          >
            <div className="flex justify-center text-base">
              {track.isActive ? <EncoreIconPlay /> : <span className="group-hover:hidden text-text-subdued">{index + 1}</span>}
              {!track.isActive && (
                <span className="hidden group-hover:block">
                  <EncoreIconPlay />
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 overflow-hidden">
              <Image
                src={track.coverUrl}
                alt={track.title}
                className="w-10 h-10 object-cover rounded-sm shrink-0"
              />
              <div className="flex flex-col truncate">
                <span
                  className={`truncate text-base ${track.isActive || track.title === "Seventeen" || track.title === "Rapsodi" || track.title === "Fortune Cookie Yang Mencinta" ? "text-white" : "text-white group-hover:text-white"}`}
                >
                  {track.title}
                </span>
              </div>
            </div>

            <div className="text-sm text-right text-text-subdued">{track.playCount}</div>

            <div className="flex justify-center">{track.isSaved && <EncoreIconCheck className="fill-[#1ed760]" />}</div>

            <div className="flex items-center justify-end gap-3 text-sm pr-2 text-text-subdued">
              <span>{track.duration}</span>
              <div className={`flex items-center opacity-0 group-hover:opacity-100 transition-opacity ${track.isActive ? "opacity-100" : ""}`}>
                <button className="p-1 focus:outline-none">
                  <EncoreIconMoreOptions />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
