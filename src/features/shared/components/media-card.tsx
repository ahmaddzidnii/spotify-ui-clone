import { Link } from "react-router";
import { Image } from "@/components/image";
import { PlayButton } from "@/components/ui/play-button";

interface ImageSource {
  url: string;
  width?: number;
  height?: number;
}

export interface MediaCardProps {
  /**
   * Judul media (nama playlist, album, track, dll)
   */
  title: string;

  /**
   * Subtitle/deskripsi (artist, tahun, dll)
   */
  subtitle: string;

  /**
   * Array sources untuk responsive image
   */
  imageSources: ImageSource[];

  /**
   * URL tujuan saat card diklik
   */
  href?: string;

  /**
   * Bentuk gambar
   * - square: untuk playlist, album, track (default)
   * - circular: untuk artist
   */
  imageShape?: "square" | "circular";

  /**
   * Custom className untuk container
   */
  className?: string;
}

/**
 * MediaCard - Generic card component untuk menampilkan media content
 *
 * Digunakan untuk:
 * - Playlist cards
 * - Album cards (tanpa metadata detail)
 * - Track cards
 * - Artist cards (dengan imageShape="circular")
 */
export const MediaCard = ({ title, subtitle, imageSources, href = "#", imageShape = "square", className = "" }: MediaCardProps) => {
  const imageUrl = imageSources[0]?.url || "";
  const imageRoundedClass = imageShape === "circular" ? "rounded-full" : "rounded-md";

  return (
    <div className={`group px-2 py-1.5 rounded-md hover:bg-background-elevated-highlight transition-colors ${className}`}>
      <div className="flex flex-col">
        <div className={`w-full aspect-square overflow-hidden ${imageRoundedClass} relative`}>
          <Link to={href}>
            <Image
              src={imageUrl}
              sizes="(min-width: 768px) 180px, 120px"
              alt={title}
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
            {title}
          </Link>
          <p className="text-sm text-text-subdued mt-1 line-clamp-2">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};
