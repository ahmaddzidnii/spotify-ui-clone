import { Link } from "react-router";

import { Image } from "@/components/image";
import { useArtistPick, useArtistProfile } from "../context/artist-page-context";

export const ArtistPick = () => {
  const pinnedItem = useArtistPick();
  const profile = useArtistProfile();

  if (!pinnedItem) {
    return null;
  }

  const isPosterStyle = pinnedItem.isPosterStyle;
  const avatarUrl = profile.avatarImage.url;

  return (
    <div className="mt-8">
      <h2 className="font-semibold text-2xl mb-4">Artist Pick</h2>

      {isPosterStyle ? (
        /* --- TIPE A: POSTER BESAR --- */
        <div className="relative group overflow-hidden rounded-xl aspect-[1.1/1] max-w-[343px] cursor-pointer">
          <Image
            alt="Background"
            src={pinnedItem.backgroundImageUrl || ""}
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
            <span className="text-black text-xs font-bold leading-tight line-clamp-1">{pinnedItem.comment}</span>
          </div>

          {/* Bottom Info Track */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-3">
              <div className="size-14 rounded overflow-hidden shrink-0 shadow-lg">
                <Image
                  src={pinnedItem.thumbnailUrl}
                  alt="Track Cover"
                />
              </div>
              <div>
                <Link
                  to={pinnedItem.item.path}
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
              src={pinnedItem.thumbnailUrl}
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
              <span className="text-text-subdued text-xs font-medium">Posted By {profile.name}</span>
            </div>
            <Link
              to={pinnedItem.item.path}
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
