import { FaPlus } from "react-icons/fa6";
import { ScrollArea } from "./scroll-area";

const RANDOM_IMAGES = [
  "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8483eb4d87830db91d9d310055",
  "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8418a92d4aefda166310706c10",
  "https://mosaic.scdn.co/300/ab67616d00001e0200f98503376497ab98757f0aab67616d00001e025630e188f3ff752d38f97087ab67616d00001e02be7982704b25a460843a308bab67616d00001e02d67195a1fc32eae4835450ae",
  "https://mosaic.scdn.co/300/ab6761610000e5eb07189aefe72bf176ecd0b2abab67616d00001e025630e188f3ff752d38f97087ab67616d00001e02be7982704b25a460843a308bab67616d00001e02d67195a1fc32eae4835450ae",
];

export const LeftSidebar = () => {
  return (
    <aside className="left-sidebar">
      <div className="h-full flex flex-col">
        <div className="px-4">
          <div className="flex items-center h-16 py-2">
            <button className="p-2 text-[#b3b3b3] hover:text-white transition-colors">
              <svg
                data-encore-id="icon"
                role="img"
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="fill-current size-4"
              >
                <path d="M10.97 5.47a.75.75 0 1 1 1.06 1.06L10.56 8l1.47 1.47a.75.75 0 1 1-1.06 1.06l-2-2a.75.75 0 0 1 0-1.06z"></path>
                <path d="M1 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm.5 1.5H5v13H1.5zm13 13h-8v-13h8z"></path>
              </svg>
            </button>
            <div className="ms-3">
              <span className="text-base font-bold">Your Library</span>
            </div>
            <div className="flex gap-2 ms-auto">
              <button
                aria-label="Create"
                className="p-2 text-sm  font-bold text-[#b3b3b3] hover:bg-background-elevated-highlight transition-colors inline-flex items-center gap-2 rounded-2xl"
              >
                <FaPlus />
                Create
              </button>
              <button
                aria-label="Full screen"
                className="p-2 text-[#b3b3b3] hover:text-white transition-colors"
              >
                <svg
                  role="img"
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="size-4 fill-current"
                >
                  <path d="M6.53 9.47a.75.75 0 0 1 0 1.06l-2.72 2.72h1.018a.75.75 0 0 1 0 1.5H1.25v-3.579a.75.75 0 0 1 1.5 0v1.018l2.72-2.72a.75.75 0 0 1 1.06 0zm2.94-2.94a.75.75 0 0 1 0-1.06l2.72-2.72h-1.018a.75.75 0 1 1 0-1.5h3.578v3.579a.75.75 0 0 1-1.5 0V3.81l-2.72 2.72a.75.75 0 0 1-1.06 0"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-4 px-4 py-4">
            <div className="flex">
              <div className="size-12 rounded-md overflow-hidden relative aspect-square">
                <img
                  src="https://i.scdn.co/image/ab6761610000e5eb07189aefe72bf176ecd0b2ab"
                  alt="Playlist cover"
                  className="object-cover w-full h-full absolute top-0 left-0"
                />
              </div>
              <div className="flex flex-col ms-4">
                <h2 className="text-base font-medium">Liked Songs</h2>
                <div className="flex text-text-subdued text-sm">
                  <svg
                    role="img"
                    viewBox="0 0 16 16"
                    className="size-3 fill-[#1ed760]  mt-1 me-2"
                  >
                    <title>Pinned</title>
                    <path d="M8.822.797a2.72 2.72 0 0 1 3.847 0l2.534 2.533a2.72 2.72 0 0 1 0 3.848l-3.678 3.678-1.337 4.988-4.486-4.486L1.28 15.78a.75.75 0 0 1-1.06-1.06l4.422-4.422L.156 5.812l4.987-1.337z"></path>
                  </svg>
                  <p>
                    Playlist <span>• 3 songs</span>
                  </p>
                </div>
              </div>
            </div>
            {Array.from({ length: 20 }).map((_, index) => (
              <div
                className="flex"
                key={index}
              >
                <div className="size-12 rounded-md overflow-hidden relative aspect-square">
                  <img
                    src={RANDOM_IMAGES[index % RANDOM_IMAGES.length]}
                    alt="Playlist cover"
                    className="object-cover w-full h-full absolute top-0 left-0"
                  />
                </div>
                <div className="flex flex-col ms-4">
                  <h2 className="text-base font-medium">Playlist #{index + 1}</h2>
                  <div className="flex text-text-subdued text-sm">
                    <p>
                      Playlist <span>• ahmaddzidnii</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
};
