import { Link } from "react-router";

export const RightSidebar = () => {
  return (
    <aside className="right-sidebar">
      <div className="h-full flex flex-col">
        <div className="px-4">
          <div className="flex items-center h-16 py-2">
            <button className="p-2 text-[#b3b3b3] hover:text-white transition-colors">
              <svg
                role="img"
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="fill-current size-4"
              >
                <path d="M5.03 10.53a.75.75 0 1 1-1.06-1.06L5.44 8 3.97 6.53a.75.75 0 0 1 1.06-1.06l2 2a.75.75 0 0 1 0 1.06z"></path>
                <path d="M1 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm.5 1.5h8v13h-8zm13 13H11v-13h3.5z"></path>
              </svg>
            </button>
            <div className="ms-3">
              <Link
                to="/"
                className="text-base font-bold"
              >
                Cerito Loro
              </Link>
            </div>
            <div className="flex gap-2 ms-auto">
              <button
                aria-label="More option"
                className="p-2 text-[#b3b3b3] hover:text-white transition-colors"
              >
                <svg
                  role="img"
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="size-4 fill-current"
                >
                  <path d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"></path>
                </svg>
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
        <div className="right-sidebar-container flex-1 h-0 relative">
          <div className="right-sidebar-viewport">
            <div className="right-sidebar-content px-4">
              <div>
                <div className="w-full aspect-square overflow-hidden rounded-lg relative">
                  <img
                    src="https://i.scdn.co/image/ab67616d0000b2730f94886d67ae4e92a92b2281"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex h-auto items-center">
                <div>
                  <h2 className="mt-4  text-2xl font-bold">Banyu Moto</h2>
                  <p className="text-base text-text-subdued">Sleman Receh</p>
                </div>
                <div className="ms-auto flex gap-2">
                  <button
                    aria-label="Copy Link to Song"
                    className="p-2 text-[#b3b3b3] hover:text-white transition-colors"
                  >
                    <svg
                      role="img"
                      viewBox="0 0 16 16"
                      className="size-6 fill-current"
                    >
                      <path d="M1 5.75A.75.75 0 0 1 1.75 5H4v1.5H2.5v8h11v-8H12V5h2.25a.75.75 0 0 1 .75.75v9.5a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75z"></path>
                      <path d="M8 9.576a.75.75 0 0 0 .75-.75V2.903l1.454 1.454a.75.75 0 0 0 1.06-1.06L8 .03 4.735 3.296a.75.75 0 0 0 1.06 1.061L7.25 2.903v5.923c0 .414.336.75.75.75"></path>
                    </svg>
                  </button>
                  <button
                    aria-label="Add to liked songs"
                    className="p-2 text-[#b3b3b3] hover:text-white transition-colors"
                  >
                    <svg
                      data-encore-id="icon"
                      role="img"
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      className="size-6 fill-current"
                    >
                      <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"></path>
                      <path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex flex-col rounded-lg bg-background-base overflow-hidden px-4 py-6 mt-6 gap-6">
                <div className="flex">
                  <span className="font-bold text-base">Credits</span>
                  <Link
                    className="ms-auto font-bold text-text-subdued text-sm hover:underline"
                    to="/"
                  >
                    Show all
                  </Link>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <span className="mb-1">Sleman Receh</span>
                      <span className="text-text-subdued text-sm">Main Artist</span>
                    </div>
                    <button className="ms-auto rounded-2xl border-white border px-4 h-8 font-bold text-sm">Follow</button>
                  </div>
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <span className="mb-1">Heri Marwanto</span>
                      <span className="text-text-subdued text-sm">Composer</span>
                    </div>
                    <button className="ms-auto rounded-2xl border-white border px-4 h-8 font-bold text-sm">Follow</button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-lg bg-background-base overflow-hidden px-4 py-6 mt-6 gap-6">
                <div className="flex">
                  <span className="font-bold text-base">Next in queue</span>
                  <Link
                    className="ms-auto font-bold text-text-subdued text-sm hover:underline"
                    to="/"
                  >
                    Open queue
                  </Link>
                </div>
                <div className="flex flex-col">
                  <div className="flex">
                    <div className="relative w-12 h-12 aspect-square rounded-sm overflow-hidden flex shrink-0 me-4">
                      <img
                        src="https://i.scdn.co/image/ab67616d00001e02d7105ffabf2ff9ddd265eab1"
                        className="absolute w-full top-0 bottom-0"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1">Dirimu yang dahulu</span>
                      <span className="text-text-subdued text-sm">Anggis Devaki</span>
                    </div>
                    <button
                      aria-label="More option"
                      className="p-2 text-[#b3b3b3] hover:text-white transition-colors ms-auto"
                    >
                      <svg
                        role="img"
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="size-4 fill-current"
                      >
                        <path d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
