import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "overlayscrollbars/overlayscrollbars.css";
import "./styles/main.css";
import { createBrowserRouter, RouterProvider, useParams } from "react-router";
import { GlobalNav } from "./components/global-nav.tsx";
import { RightSidebar } from "./components/right-sidebar.tsx";
import { LeftSidebar } from "./components/left-sidebar.tsx";
import { NowPlayingBar } from "./components/now-playing-bar.tsx";
import { MainView } from "./components/main-view.tsx";

const Layout = () => {
  const [leftSidebarWidth, setLeftSidebarWidth] = useState(420);
  const [rightSidebarWidth, setRightSidebarWidth] = useState(420);
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);

  const handleLeftCollapse = () => {
    setIsLeftCollapsed(true);
    setLeftSidebarWidth(72);
  };

  const handleLeftExpand = () => {
    setIsLeftCollapsed(false);
    setLeftSidebarWidth(420);
  };

  return (
    <div
      className="app-shell"
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <GlobalNav />
      <LeftSidebar
        width={leftSidebarWidth}
        onWidthChange={setLeftSidebarWidth}
        isCollapsed={isLeftCollapsed}
        onCollapse={handleLeftCollapse}
        onExpand={handleLeftExpand}
      />
      <MainView
        onLeftResize={setLeftSidebarWidth}
        onRightResize={setRightSidebarWidth}
        onLeftCollapse={handleLeftCollapse}
      />
      <RightSidebar
        width={rightSidebarWidth}
        onWidthChange={setRightSidebarWidth}
      />
      <NowPlayingBar />
    </div>
  );
};

const AlbumIdPage = () => {
  const params = useParams();
  return <div>Album ID Page {JSON.stringify(params)}</div>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/album/:id",
        element: <AlbumIdPage />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <div className="my-auto flex justify-center items-center flex-col gap-6 h-screen">
        <img
          src="https://open.spotifycdn.com/cdn/images/error-page-logo.24aca703.svg"
          alt=""
        />
        <h1 className="text-3xl font-bold">Page Not Found</h1>
        <p className="text-text-subdued">The page you are looking for does not exist.</p>
        <button>
          <a
            href="/"
            className="px-4 py-2 bg-[#1ed760] text-black font-bold rounded-full hover:bg-green-600 transition-colors"
          >
            Go to Home
          </a>
        </button>
      </div>
    ),
  },
]);

createRoot(document.body!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
