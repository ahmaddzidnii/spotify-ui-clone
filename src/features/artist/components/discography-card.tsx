import { Link } from "react-router";

import { Image } from "@/components/image";
import { buildSrcSet } from "@/features/shared/utils/builder";
import { EncoreIconPlay } from "@/components/encore/icons";
import { transformAlbumType } from "../../shared/utils/transformers";

interface DiscographyCardProps {
  name: string;
  coverArtSources: { url: string; width?: number; height?: number }[];
  releaseYear: string | number;
  type: string;
}

export const DiscographyCard = ({ name, coverArtSources, releaseYear, type }: DiscographyCardProps) => {
  const coverArtUrl = coverArtSources[0]?.url || "";
  const coverArtSrcSet = buildSrcSet(coverArtSources);
  return (
    <div className="group px-2 py-1.5 rounded-md hover:bg-background-elevated-highlight transition-colors">
      <div className="flex flex-col">
        <div className="w-full aspect-square overflow-hidden rounded-md relative">
          <Link to="#">
            <Image
              src={coverArtUrl}
              srcSet={coverArtSrcSet}
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
          <p className="text-sm text-text-subdued mt-1">
            {releaseYear} • {transformAlbumType(type)}
          </p>
        </div>
      </div>
    </div>
  );
};
