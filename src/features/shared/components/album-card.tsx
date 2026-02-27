import { Link } from "react-router";
import { Image } from "@/components/image";
import { PlayButton } from "@/components/ui/play-button";
import { buildSrcSet } from "@/features/shared/utils/builder";
import { transformAlbumType } from "@/features/shared/utils/transformers";

interface ImageSource {
  url: string;
  width?: number;
  height?: number;
}

export interface AlbumCardProps {
  /**
   * Nama album
   */
  name: string;

  /**
   * Array sources untuk responsive image
   */
  coverArtSources: ImageSource[];

  /**
   * Tahun rilis album (opsional)
   */
  releaseYear?: string | number;

  /**
   * Tipe album: "album", "single", "compilation", dll (opsional)
   */
  albumType?: string;

  /**
   * URL tujuan saat card diklik
   */
  href?: string;

  /**
   * Custom className untuk container
   */
  className?: string;
}

/**
 * AlbumCard - Card component untuk menampilkan album dengan metadata
 *
 * Digunakan untuk:
 * - Discography section
 * - Album grid/list
 * - Featured albums
 */
export const AlbumCard = ({ name, coverArtSources, releaseYear, albumType, href = "#", className = "" }: AlbumCardProps) => {
  const coverArtUrl = coverArtSources[0]?.url || "";
  const coverArtSrcSet = buildSrcSet(coverArtSources);

  return (
    <div className={`group px-2 py-1.5 rounded-md hover:bg-background-elevated-highlight transition-colors ${className}`}>
      <div className="flex flex-col">
        <div className="w-full aspect-square overflow-hidden rounded-md relative">
          <Link to={href}>
            <Image
              src={coverArtUrl}
              srcSet={coverArtSrcSet}
              sizes="(min-width: 768px) 180px, 120px"
              alt={name}
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
            to={href}
            className="font-semibold line-clamp-2"
          >
            {name}
          </Link>
          {(releaseYear || albumType) && (
            <p className="text-sm text-text-subdued mt-1">
              {releaseYear && <span>{releaseYear}</span>}
              {releaseYear && albumType && <span> • </span>}
              {albumType && <span>{transformAlbumType(albumType)}</span>}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
