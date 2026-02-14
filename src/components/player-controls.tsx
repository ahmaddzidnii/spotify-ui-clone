import { Button } from "./ui/button";

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
        <Button variant="tertiary">
          <svg
            role="img"
            viewBox="0 0 16 16"
            className="w-4 h-4 fill-current"
          >
            <path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z"></path>
            <path d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z"></path>
          </svg>
        </Button>

        {/* Previous Button */}
        <Button
          variant="tertiary"
          className="p-2"
        >
          <svg
            role="img"
            viewBox="0 0 16 16"
            className="w-4 h-4 fill-current"
          >
            <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7z"></path>
          </svg>
        </Button>

        {/* Play/Pause Button */}
        <Button
          variant="primary"
          className="w-8 h-8 rounded-full hover:scale-105 transition-transform"
          aria-label="Play"
        >
          <svg
            role="img"
            viewBox="0 0 16 16"
            className="w-4 h-4 fill-background-base"
          >
            <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"></path>
          </svg>
        </Button>

        {/* Next Button */}
        <Button
          variant="tertiary"
          className="p-2"
        >
          <svg
            role="img"
            viewBox="0 0 16 16"
            className="w-4 h-4 fill-current"
          >
            <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z"></path>
          </svg>
        </Button>

        {/* Repeat Button */}
        <Button
          variant="tertiary"
          className="p-2"
        >
          <svg
            role="img"
            viewBox="0 0 16 16"
            className="w-4 h-4 fill-current"
          >
            <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 11h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z"></path>
          </svg>
        </Button>
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
