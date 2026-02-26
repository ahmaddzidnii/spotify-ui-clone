import { Link } from "react-router";
import { Image } from "@/components/image";
import { EncoreIconPlay } from "@/components/encore/icons";
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
          <button className="flex items-center justify-center bg-[#1ed760] p-2 rounded-full size-12 absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity z-1">
            <EncoreIconPlay className="fill-background-base size-6" />
          </button>
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
