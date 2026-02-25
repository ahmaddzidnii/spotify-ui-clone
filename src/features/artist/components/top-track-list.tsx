import { cn } from "@/utils/cn";
import { Image } from "@/components/image";
import { EncoreIconCheck, EncoreIconMoreOptions, EncoreIconPlay } from "@/components/encore/icons";

import { type TopTracks } from "@/data/types";
import { formatDuration } from "@/features/shared/formaters/format.duration";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface TopTrackListProps {
  tracks: TopTracks;
}

export const TopTrackList = ({ tracks }: TopTrackListProps) => {
  const [visibleCount, setVisibleCount] = useState(5);
  return (
    <div>
      <h2 className="font-semibold text-2xl mt-8 mb-4">Popular</h2>
      <div>
        <div className="flex flex-col">
          {tracks.items.slice(0, visibleCount).map(({ track, uid }, index) => (
            <div
              key={uid}
              className={cn(
                "group grid grid-cols-[40px_minmax(0,1fr)_120px_40px_80px] gap-4 items-center px-4 py-2 rounded-md transition-colors",
                "hover:bg-background-elevated-highlight",
              )}
            >
              <div className="flex justify-center text-base">
                <span className="group-hover:hidden text-text-subdued">{index + 1}</span>

                <span className="hidden group-hover:block">
                  <EncoreIconPlay />
                </span>
              </div>

              <div className="flex items-center gap-3 overflow-hidden">
                <Image
                  src={track.albumOfTrack.coverArt.sources[0].url}
                  alt={""}
                  className="w-10 h-10 object-cover rounded-sm shrink-0"
                />
                <div className="flex flex-col truncate">
                  <span className={cn("truncate text-base ", "text-white group-hover:text-white")}>{track.name}</span>
                </div>
              </div>

              <div className="text-sm text-right text-text-subdued">{new Intl.NumberFormat("en-US").format(Number(track.playcount))}</div>

              <div className="flex justify-center">
                <EncoreIconCheck className="fill-[#1ed760]" />
              </div>

              <div className="flex items-center justify-end gap-3 text-sm pr-2 text-text-subdued">
                <span>{formatDuration(track.duration.totalMilliseconds / 1000)}</span>
                <div className={`flex items-center opacity-0 group-hover:opacity-100 transition-opacity`}>
                  <button className="p-1 focus:outline-none">
                    <EncoreIconMoreOptions />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {tracks.items.length > 5 && (
        <Button
          variant="tertiary"
          className="text-sm mt-4 font-semibold text-text-subdued hover:scale-100"
          onClick={() => setVisibleCount((prev) => (prev === 5 ? 10 : 5))}
        >
          {visibleCount === 5 ? "See more" : "Show less"}
        </Button>
      )}
    </div>
  );
};
