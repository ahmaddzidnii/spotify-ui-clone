import React from "react";
import { Link } from "react-router";
import { Image } from "@/components/image";
import { EncoreIconPlay } from "@/components/encore/icons";

interface AlbumCardProps {
  id: string;
  name: string;
  coverArtUrl: string;
  releaseYear: number;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({ id, name, coverArtUrl, releaseYear }) => {
  console.log(id);
  return (
    <div className="group px-2 py-1.5 rounded-md hover:bg-background-elevated-highlight transition-colors">
      <div className="flex flex-col">
        <div className="w-full aspect-square overflow-hidden rounded-md relative">
          <Link to="#">
            <Image
              src={coverArtUrl}
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
          <p className="text-sm text-text-subdued mt-1">{releaseYear}</p>
        </div>
      </div>
    </div>
  );
};
