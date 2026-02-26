import type { libraryResponse } from "@/data/library-response";
import { Image } from "@/components/image";
import { Tooltip } from "@/components/ui/tooltip";
import { useSidebarCollapsed } from "@/stores/use-sidebar-store";
import { EncoreIconPlay } from "@/components/encore/icons";
import { Link, useNavigate } from "react-router";
import { transformSpotifyUriToUrl } from "@/features/shared/parsers/parse-uri";
import { EncoreIconPin } from "@/components/encore/icons/encore-icon-pin";

interface PlaylistItemProps {
  playlist: (typeof libraryResponse.data.me.libraryV3.items)[0];
}

export const PlaylistItem = ({ playlist }: PlaylistItemProps) => {
  const isCollapsed = useSidebarCollapsed("left");
  const navigate = useNavigate();
  const itemData = playlist.item.data;

  const title = itemData.name;
  const isPinned = playlist.pinned;
  const isPseudoPlaylist = itemData.__typename === "PseudoPlaylist";

  const imageSources = isPseudoPlaylist ? itemData.image?.sources : itemData.images?.items?.[0]?.sources;

  // Fallback URL utama
  const imageUrl = imageSources?.[0]?.url || "";

  // Buat string srcSet (Format: "url1 64w, url2 300w, url3 640w")
  const imageSrcSet = imageSources?.map((src: { url: string; width?: number }) => `${src.url} ${src.width}w`).join(", ");

  const ownerData = !isPseudoPlaylist ? itemData.ownerV2?.data : null;

  const element = (
    <div
      role="button"
      onClick={() => navigate(transformSpotifyUriToUrl(itemData.uri))}
      className="group hover:bg-background-elevated-highlight rounded-md @min-[280px]/left-sidebar:p-2 flex @min-[421px]/left-sidebar:flex-col @min-[421px]/left-sidebar:gap-2 cursor-pointer"
    >
      <div className="w-12 rounded-md overflow-hidden relative aspect-square @min-[421px]/left-sidebar:w-full">
        <Image
          src={imageUrl}
          srcSet={imageSrcSet}
          alt={""}
          // Sizes memberi tahu browser estimasi ukuran gambar di layar.
          // Saat sidebar kecil/mobile, ukurannya 48px (w-12). Saat sidebar lebar, asumsikan max 300px.
          sizes="(max-width: 420px) 48px, 300px"
          className="object-cover w-full h-full absolute top-0 left-0"
        />

        {/* Play button - desktop */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Mencegah klik tembus ke div utama
            // Tambahkan logika fungsi play di sini nantinya
          }}
          className="flex items-center justify-center bg-[#1ed760] p-2 rounded-full w-12 h-12 absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity @max-[421px]/left-sidebar:hidden hover:scale-105 hover:bg-green-400"
        >
          <EncoreIconPlay className="size-6 fill-background-base" />
        </button>

        {/* Play button - mobile */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Mencegah klik tembus ke div utama
            // Tambahkan logika fungsi play di sini nantinya
          }}
          className="flex items-center justify-center p-2 rounded-full bg-[#1ed760] size-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity @min-[421px]/left-sidebar:hidden"
        >
          <svg
            role="img"
            viewBox="0 0 16 16"
            className="size-6 fill-background-base"
          >
            <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"></path>
          </svg>
        </button>
      </div>

      <div className="flex flex-col ms-4 @min-[421px]/left-sidebar:ms-0 @max-[280px]/left-sidebar:hidden">
        <h2 className="text-[15px] font-medium line-clamp-1">{title}</h2>

        <div className="flex text-text-subdued text-sm">
          {isPinned && <EncoreIconPin className="size-3 fill-[#1ed760] mt-1 me-2 shrink-0" />}

          <div className="line-clamp-1 @min-[421px]/left-sidebar:text-xs">
            {isPseudoPlaylist ? (
              <span>Playlist • {itemData.count} songs</span>
            ) : (
              <span>
                Playlist{" "}
                {ownerData?.name && (
                  <>
                    •{" "}
                    <Link
                      to={transformSpotifyUriToUrl(ownerData.uri)}
                      onClick={(e) => e.stopPropagation()} // Mencegah klik tembus ke div utama
                      className="hover:underline hover:text-text-base"
                    >
                      {ownerData.name}
                    </Link>
                  </>
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return isCollapsed ? (
    <Tooltip
      content={title}
      side="right"
    >
      {element}
    </Tooltip>
  ) : (
    element
  );
};
