import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import { AppLayout } from "./layouts/app-layout.tsx";
import { HomePage } from "./features/home/pages/home-page.tsx";
import { AlbumPage } from "./features/album/pages/album-page.tsx";
import { NotFoundPage } from "./features/error/pages/not-found-page.tsx";

import "./styles/main.css";
import "overlayscrollbars/overlayscrollbars.css";
import { LayoutProvider } from "./layouts/components/layout-provider.tsx";

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
        element: <div>Browse</div>,
      },
      {
        path: "/search/:query",
        element: (
          <div>
            Search results for <span className="font-bold">{":query"}</span>
          </div>
        ),
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
