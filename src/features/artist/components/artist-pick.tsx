import { Link } from "react-router";

import { Image } from "@/components/image";
import type { ArtistUnion } from "@/data/types";
import { transformSpotifyUriToUrl } from "@/features/shared/parsers/parse-uri";

interface ArtistPickProps {
  artists: ArtistUnion;
}

export const ArtistPick = ({ artists }: ArtistPickProps) => {
  const pinnedItem = artists.profile.pinnedItem;

  if (!pinnedItem) {
    return null;
  }

  const isPosterStyle = pinnedItem.backgroundImageV2 !== null;

  const trackData = pinnedItem.itemV2.data;
  const avatarUrl = artists.visuals.avatarImage.sources[0].url;

  return (
    <div className="mt-8">
      <h2 className="font-semibold text-2xl mb-4">Artist Pick</h2>

      {isPosterStyle ? (
        /* --- TIPE A: POSTER BESAR --- */
        <div className="relative group overflow-hidden rounded-xl aspect-[1.1/1] max-w-[343px] cursor-pointer">
          <Image
            alt="Background"
            src={pinnedItem.backgroundImageV2.data.sources[0].url}
            className="object-cover w-full h-full transition-transform duration-300"
          />

          <div
            style={{
              background: "linear-gradient(#12121200, #121212)",
            }}
            className="absolute inset-0 transition-opacity duration-300"
          ></div>

          {/* Overlay Comment */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-white rounded-full p-1 pe-4 shadow-xl">
            <div className="size-6 overflow-hidden rounded-full">
              <Image
                src={avatarUrl}
                alt="Artist Avatar"
                className="object-cover"
              />
            </div>
            <span className="text-black text-xs font-bold leading-tight line-clamp-1">
              {pinnedItem.comment || `Posted by ${artists.profile.name}`}
            </span>
          </div>

          {/* Bottom Info Track */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-3">
              <div className="size-14 rounded overflow-hidden shrink-0 shadow-lg">
                <Image
                  src={artists.profile.pinnedItem.thumbnailImage.data.sources[0].url}
                  alt="Track Cover"
                />
              </div>
              <div>
                <Link
                  to={transformSpotifyUriToUrl(trackData.uri)}
                  className="text-white font-bold hover:underline block leading-tight"
                >
                  {pinnedItem.title}
                </Link>
                <p className="text-xs text-gray-300 capitalize">{pinnedItem.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* --- TIPE B: HORIZONTAL LIST */
        <div className="flex">
          <div className="relative size-22 aspect-square overflow-hidden rounded-xl me-4 flex-shrink-0">
            <Image
              alt="Track Image"
              src={pinnedItem.thumbnailImage.data.sources[0].url}
              className="object-cover object-center w-full h-full"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-1.5 text-sm">
              <div className="size-6 aspect-square overflow-hidden rounded-full flex-shrink-0">
                <Image
                  alt="Artist"
                  src={avatarUrl}
                />
              </div>
              <span className="text-text-subdued text-xs font-medium">Posted By {artists.profile.name}</span>
            </div>
            <Link
              to={transformSpotifyUriToUrl(trackData.uri)}
              className="font-bold text-lg leading-tight hover:underline"
            >
              {pinnedItem.title}
            </Link>
            <p className="text-sm text-text-subdued mt-1 capitalize">{pinnedItem.subtitle}</p>
          </div>
        </div>
      )}
    </div>
  );
};
