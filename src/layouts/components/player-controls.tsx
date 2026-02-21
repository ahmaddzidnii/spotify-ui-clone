import { EncoreIconPlay, EncoreIconShuffle, EncoreIconPrevious, EncoreIconNext, EncoreIconRepeat } from "@/components/encore/icons";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";

export const PlayerControls = () => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentTime = 113;
  const duration = 264;

  return (
    <div className="flex flex-col items-center w-full   ">
      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-4 mb-2">
        {/* Shuffle Button */}
        <Tooltip content="Shuffle">
          <Button variant="tertiary">
            <EncoreIconShuffle className="w-4 h-4" />
          </Button>
        </Tooltip>

        {/* Previous Button */}
        <Tooltip content="Previous">
          <Button
            variant="tertiary"
            className="p-2"
          >
            <EncoreIconPrevious className="w-4 h-4" />
          </Button>
        </Tooltip>

        {/* Play/Pause Button */}
        <Tooltip content="Play">
          <Button
            variant="primary"
            className="w-8 h-8 rounded-full hover:scale-105 transition-transform"
            aria-label="Play"
          >
            <EncoreIconPlay className="w-4 h-4 fill-background-base" />
          </Button>
        </Tooltip>

        {/* Next Button */}
        <Tooltip content="Next">
          <Button
            variant="tertiary"
            className="p-2"
          >
            <EncoreIconNext className="w-4 h-4" />
          </Button>
        </Tooltip>

        {/* Repeat Button */}
        <Tooltip content="Repeat">
          <Button
            variant="tertiary"
            className="p-2"
          >
            <EncoreIconRepeat className="w-4 h-4" />
          </Button>
        </Tooltip>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-2 w-full">
        <span className="text-xs text-text-subdued min-w-[40px] text-right">{formatTime(currentTime)}</span>
        <div className="flex-1 group relative">
          <div className="h-1 bg-[#4d4d4d] rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all group-hover:bg-[#1db954] relative"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
        </div>
        <span className="text-xs text-text-subdued min-w-[40px]">{formatTime(duration)}</span>
      </div>
    </div>
  );
};
