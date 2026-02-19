import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import { AppLayout } from "./layouts/app-layout.tsx";
import { HomePage } from "./features/home/pages/home-page.tsx";
import { AlbumPage } from "./features/album/pages/album-page.tsx";
import { BrowsePage } from "./features/browse/pages/browse-page.tsx";
import { NotFoundPage } from "./features/error/pages/not-found-page.tsx";

import "./styles/main.css";
import "overlayscrollbars/overlayscrollbars.css";
import { LayoutProvider } from "./layouts/components/layout-provider.tsx";
import { LyricsPage } from "./features/song/pages/lyrics-page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LayoutProvider>
        <AppLayout />
      </LayoutProvider>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/album/:id",
        element: <AlbumPage />,
      },
      {
        path: "/search",
        element: <BrowsePage />,
      },
      {
        path: "/search/:query",
        element: (
          <div>
            Search results for <span className="font-bold">{":query"}</span>
          </div>
        ),
      },
      {
        path: "/lyrics",
        element: <LyricsPage />,
      },
      {
        path: "/playlist/:id",
        element: <div>Playlist ID page</div>,
      },
      {
        path: "/artist/:id",
        element: <div>Artist ID page</div>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

createRoot(document.body!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
