import { Link } from "react-router";
import { Image } from "@/components/image";
import { PlayButton } from "@/components/ui/play-button";

interface ImageSource {
  url: string;
  width?: number;
  height?: number;
}

export interface CircularArtistCardProps {
  /**
   * Nama artist
   */
  name: string;

  /**
   * Role atau deskripsi (e.g., "Artist", "Producer", "Featured Artist")
   */
  role: string;

  /**
   * Array sources untuk responsive image
   */
  imageSources: ImageSource[];

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
 * CircularArtistCard - Card component untuk menampilkan artist dengan circular image
 *
 * Digunakan untuk:
 * - Related Artists section
 * - Fans Also Like section
 * - Artist collaborations
 */
export const CircularArtistCard = ({ name, role, imageSources, href = "#", className = "" }: CircularArtistCardProps) => {
  const imageUrl = imageSources[0]?.url || "";

  return (
    <div className={`group px-2 py-1.5 rounded-md hover:bg-background-elevated-highlight transition-colors ${className}`}>
      <div className="flex flex-col">
        <div className="w-full aspect-square overflow-hidden relative">
          <Link to={href}>
            <Image
              src={imageUrl}
              sizes="(min-width: 768px) 180px, 120px"
              alt={name}
              className="absolute top-0 left-0 object-cover object-center w-full h-full  rounded-full"
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
          <p className="text-sm text-text-subdued mt-1 line-clamp-2">{role}</p>
        </div>
      </div>
    </div>
  );
};
