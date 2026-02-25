import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import { AppLayout } from "./layouts/app-layout.tsx";

import "./styles/main.css";
import "./styles/sass.scss";
import "overlayscrollbars/overlayscrollbars.css";
import { LayoutProvider } from "./layouts/components/layout-provider.tsx";

const HomePage = lazy(() => import("./features/home/pages/home-page.tsx").then((m) => ({ default: m.HomePage })));
const AlbumPage = lazy(() => import("./features/album/pages/album-page.tsx").then((m) => ({ default: m.AlbumPage })));
const BrowsePage = lazy(() => import("./features/browse/pages/browse-page.tsx").then((m) => ({ default: m.BrowsePage })));
const NotFoundPage = lazy(() => import("./features/error/pages/not-found-page.tsx").then((m) => ({ default: m.NotFoundPage })));
const LyricsPage = lazy(() => import("./features/song/pages/lyrics-page.tsx").then((m) => ({ default: m.LyricsPage })));
const ArtistPage = lazy(() => import("./features/artist/pages/artist-page.tsx").then((m) => ({ default: m.ArtistPage })));
const PlaylistPage = lazy(() => import("./features/playlist/pages/playlist-page.tsx").then((m) => ({ default: m.PlaylistPage })));

const PageLoader = () => null;

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
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/album/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <AlbumPage />
          </Suspense>
        ),
      },
      {
        path: "/search",
        element: (
          <Suspense fallback={<PageLoader />}>
            <BrowsePage />
          </Suspense>
        ),
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
        element: (
          <Suspense fallback={<PageLoader />}>
            <LyricsPage />
          </Suspense>
        ),
      },
      {
        path: "/playlist/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <PlaylistPage />
          </Suspense>
        ),
      },
      {
        path: "/artist/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ArtistPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<PageLoader />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);

createRoot(document.body!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
