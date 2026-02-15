import { MainView } from "./components/main-view";
import { GlobalNav } from "./components/global-nav";
import { LeftSidebar } from "./components/left-sidebar";
import { RightSidebar } from "./components/right-sidebar";
import { NowPlayingBar } from "./components/now-playing-bar";

export const AppLayout = () => {
  return (
    <div
      className="app-shell select-none"
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <GlobalNav />
      <LeftSidebar />
      <MainView />
      <RightSidebar />
      <NowPlayingBar />
    </div>
  );
};
