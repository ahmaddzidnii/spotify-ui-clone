import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import { AppLayout } from "./layouts/app-layout.tsx";
import { HomePage } from "./features/home/pages/home-page.tsx";
import { AlbumPage } from "./features/album/pages/album-page.tsx";
import { NotFoundPage } from "./features/error/pages/not-found-page.tsx";

import "./styles/main.css";
import "overlayscrollbars/overlayscrollbars.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/album/:id",
        element: <AlbumPage />,
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
