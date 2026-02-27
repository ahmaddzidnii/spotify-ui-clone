import { Link } from "react-router";
import { Image } from "@/components/image";
import { PlayButton } from "@/components/ui/play-button";
import type { ImageSource } from "../model";

interface DiscoveredOnCardProps {
  name: string;
  description: string;
  coverArtSources: ImageSource[];
}

export const DiscoveredOnCard = ({ name, description, coverArtSources }: DiscoveredOnCardProps) => {
  return (
    <div className="group px-2 py-1.5 rounded-md hover:bg-background-elevated-highlight transition-colors">
      <div className="flex flex-col">
        <div className="w-full aspect-square overflow-hidden rounded-md relative">
          <Link to="#">
            <Image
              src={coverArtSources[0]?.url || ""}
              sizes="(min-width: 768px) 180px, 120px"
              alt=""
              className="absolute top-0 left-0 object-cover object-center w-full h-full"
            />
          </Link>
          <PlayButton
            size="sm"
            variant="hover"
            positioning="absolute"
            className="right-2 bottom-2 z-1"
          />
        </div>
        <div className="mt-2">
          <Link
            to="#"
            className="font-semibold line-clamp-2"
          >
            {name}
          </Link>
          <p className="text-sm text-text-subdued mt-1 line-clamp-2">{description}</p>
        </div>
      </div>
    </div>
  );
};
