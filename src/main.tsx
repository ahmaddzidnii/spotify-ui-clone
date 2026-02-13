import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "overlayscrollbars/overlayscrollbars.css";
import "./styles/main.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { GlobalNav } from "./components/global-nav.tsx";
import { PlayerControls } from "./components/player-controls.tsx";
import { RightSidebar } from "./components/right-sidebar.tsx";
import { LeftSidebar } from "./components/left-sidebar.tsx";

const router = createBrowserRouter([
  {
    path: "/",

    element: (
      <div className="app-shell">
        {/* Area 1: Navigasi Atas */}
        <GlobalNav />

        {/* Area 2: Sidebar Menu (Kiri) */}
        <LeftSidebar />

        {/* Area 3: Konten Utama (Teopengah) */}
        <main className="main-view">
          <Outlet />
        </main>

        {/* Area 4: Right Sidebar*/}
        <RightSidebar />

        {/* Area 5: Now playing Bar */}
        <div className="now-playing-bar pt-4!">
          <div className="h-[72px] flex justify-between items-center w-full px-4 pb-4">
            {/* Left: Now Playing Info */}
            <div className="w-[30%] min-w-[180px]">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded overflow-hidden flex-shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src="https://i.scdn.co/image/ab67616d0000b2730f94886d67ae4e92a92b2281"
                    alt="Album cover"
                  />
                </div>
                <div className="min-w-0 ml-1">
                  <p className="text-[13px] mb-1 font-medium text-white truncate">Banyu Moto</p>
                  <p className="text-[11px] font-medium text-text-subdued truncate hover:underline cursor-pointer">Sleman Receh</p>
                </div>
                <button
                  className="ml-2 p-2 text-[#b3b3b3] hover:text-white transition-colors"
                  aria-label="Add to liked songs"
                >
                  <svg
                    data-encore-id="icon"
                    role="img"
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="w-4 h-4 fill-[#10ca54]"
                  >
                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m11.748-1.97a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 1 0-1.061 1.06l2.466 2.467 5.53-5.53z"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Center: Player Controls */}
            <div className="w-[40%] max-w-[722px]">
              <PlayerControls />
            </div>

            {/* Right: Volume & Other Controls */}
            <div className="w-[30%] min-w-[180px] flex justify-end items-center gap-2">
              <button
                className="p-2 text-[#b3b3b3] hover:text-white transition-colors"
                aria-label="Lyrics"
              >
                <svg
                  role="img"
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="w-4 h-4 fill-current"
                >
                  <path d="M13.426 2.574a2.831 2.831 0 0 0-4.797 1.55l3.247 3.247a2.831 2.831 0 0 0 1.55-4.797M10.5 8.118l-2.619-2.62L4.74 9.075 2.065 12.12a1.287 1.287 0 0 0 1.816 1.816l3.06-2.688 3.56-3.129zM7.12 4.094a4.331 4.331 0 1 1 4.786 4.786l-3.974 3.493-3.06 2.689a2.787 2.787 0 0 1-3.933-3.933l2.676-3.045z"></path>
                </svg>
              </button>
              <button
                className="p-2 text-[#b3b3b3] hover:text-white transition-colors"
                aria-label="Queue"
              >
                <svg
                  role="img"
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="w-4 h-4 fill-current"
                >
                  <path d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5zm2.5-1a1 1 0 0 0 0 2h9a1 1 0 1 0 0-2h-9z"></path>
                </svg>
              </button>

              <button
                className="p-2 text-[#b3b3b3] hover:text-white transition-colors"
                aria-label="Connect to a device"
              >
                <svg
                  role="img"
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="w-4 h-4 fill-current"
                >
                  <path d="M6 2.75C6 1.784 6.784 1 7.75 1h6.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15h-6.5A1.75 1.75 0 0 1 6 13.25V2.75zm1.75-.25a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h6.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25h-6.5zm-6 0a.25.25 0 0 0-.25.25v6.5c0 .138.112.25.25.25H4V11H1.75A1.75 1.75 0 0 1 0 9.25v-6.5C0 1.784.784 1 1.75 1H4v1.5H1.75zM4 15H2v-1.5h2V15z"></path>
                  <path d="M13 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-1-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 text-[#b3b3b3] hover:text-white transition-colors"
                  aria-label="Mute"
                >
                  <svg
                    role="img"
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="w-4 h-4 fill-current"
                  >
                    <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path>
                    <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path>
                  </svg>
                </button>
                <div className="w-[93px] group">
                  <div className="relative h-1 bg-[#4d4d4d] rounded-full overflow-hidden">
                    <div className="absolute h-full bg-white rounded-full group-hover:bg-green-500 transition-colors w-[60%]">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="p-2 text-[#b3b3b3] hover:text-white transition-colors"
                aria-label="Full screen"
                onClick={() => {
                  const appShell = document.querySelector(".app-shell");
                  if (!document.fullscreenElement) {
                    appShell?.requestFullscreen();
                  } else {
                    document.exitFullscreen();
                  }
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.25 3C0.25 2.0335 1.0335 1.25 2 1.25H5.375V2.75H2C1.86193 2.75 1.75 2.86193 1.75 3V5.42857H0.25V3ZM14 2.75H10.625V1.25H14C14.9665 1.25 15.75 2.0335 15.75 3V5.42857H14.25V3C14.25 2.86193 14.1381 2.75 14 2.75ZM1.75 10.5714V13C1.75 13.1381 1.86193 13.25 2 13.25H5.375V14.75H2C1.0335 14.75 0.25 13.9665 0.25 13V10.5714H1.75ZM14.25 13V10.5714H15.75V13C15.75 13.9665 14.9665 14.75 14 14.75H10.625V13.25H14C14.1381 13.25 14.25 13.1381 14.25 13Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    ),
    children: [
      {
        index: true,
        element: <App />,
      },
    ],
  },
]);

createRoot(document.body!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
