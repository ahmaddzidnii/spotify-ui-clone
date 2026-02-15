import { Link } from "react-router";
import { FaHome, FaSearch } from "react-icons/fa";

import { SpotifyLogo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export const GlobalNav = () => {
  return (
    <nav className="global-nav">
      <div className="relative flex items-center justify-between w-full h-12 text-white pl-7 pr-2">
        <div>
          <Link to="/">
            <SpotifyLogo />
          </Link>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 flex w-1/2 min-w-[350px] max-w-[546px] items-center">
          <button className="ml-2 bg-background-elevated-base rounded-full w-12 h-12 flex items-center shrink-0 justify-center hover:bg-white/20 transition-colors">
            <FaHome className="text-white size-6" />
          </button>
          <div className="mx-2 w-full">
            <form className="bg-background-elevated-base h-12 w-full rounded-[500px] px-2 flex">
              <div className="w-12 h-12 flex items-center justify-center shrink-0">
                <FaSearch className="text-white size-5" />
              </div>
              <input
                type="text"
                name=""
                placeholder="What do you want to play?"
                className="flex-1"
              />
              <div className="w-13 border-s-2 border-essential-subdued">
                <button className="ml-2 flex items-center justify-center w-12 h-12 hover:bg-white/20 rounded-full transition-colors">
                  <svg
                    data-encore-id="icon"
                    role="img"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 fill-white"
                  >
                    <path d="M15 15.5c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2"></path>
                    <path d="M1.513 9.37A1 1 0 0 1 2.291 9h19.418a1 1 0 0 1 .979 1.208l-2.339 11a1 1 0 0 1-.978.792H4.63a1 1 0 0 1-.978-.792l-2.339-11a1 1 0 0 1 .201-.837zM3.525 11l1.913 9h13.123l1.913-9zM4 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4h-2V3H6v3H4z"></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <Button
            variant="tertiary"
            className="p-2 h-8"
          >
            <svg
              data-encore-id="icon"
              role="img"
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="size-4 fill-current"
            >
              <path d="M4.995 8.745a.75.75 0 0 1 1.06 0L7.25 9.939V4a.75.75 0 0 1 1.5 0v5.94l1.195-1.195a.75.75 0 1 1 1.06 1.06L8 12.811l-.528-.528-.005-.005-2.472-2.473a.75.75 0 0 1 0-1.06"></path>
              <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13"></path>
            </svg>
            <span className="ml-2 font-bold text-[13px]">Install App</span>
          </Button>
          <div className="flex gap-4 px-2 h-8">
            <Button
              variant="tertiary"
              className="p-2 h-8"
            >
              <svg
                data-encore-id="icon"
                role="img"
                aria-hidden="true"
                className="size-4 fill-current"
                viewBox="0 0 16 16"
              >
                <path d="M8 1.5a4 4 0 0 0-4 4v3.27a.75.75 0 0 1-.1.373L2.255 12h11.49L12.1 9.142a.75.75 0 0 1-.1-.374V5.5a4 4 0 0 0-4-4m-5.5 4a5.5 5.5 0 0 1 11 0v3.067l2.193 3.809a.75.75 0 0 1-.65 1.124H10.5a2.5 2.5 0 0 1-5 0H.957a.75.75 0 0 1-.65-1.124L2.5 8.569zm4.5 8a1 1 0 1 0 2 0z"></path>
              </svg>
            </Button>
            <Button
              variant="tertiary"
              className="p-2 h-8"
            >
              <svg
                data-encore-id="icon"
                role="img"
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="size-4 fill-current"
              >
                <path d="M3.849 10.034c-.021-.465.026-.93.139-1.381H1.669c.143-.303.375-.556.665-.724l.922-.532a1.63 1.63 0 0 0 .436-2.458 1.8 1.8 0 0 1-.474-1.081q-.014-.287.057-.563a1.12 1.12 0 0 1 .627-.7 1.2 1.2 0 0 1 .944 0q.225.1.392.281c.108.12.188.263.237.417q.074.276.057.561a1.8 1.8 0 0 1-.475 1.084 1.6 1.6 0 0 0-.124 1.9c.36-.388.792-.702 1.272-.927v-.015c.48-.546.768-1.233.821-1.958a3.2 3.2 0 0 0-.135-1.132 2.657 2.657 0 0 0-5.04 0c-.111.367-.157.75-.135 1.133.053.724.341 1.41.821 1.955A.13.13 0 0 1 2.565 6a.13.13 0 0 1-.063.091l-.922.532A3.2 3.2 0 0 0-.004 9.396v.75h3.866c.001-.033-.01-.071-.013-.112m10.568-3.4-.922-.532a.13.13 0 0 1-.064-.091.12.12 0 0 1 .028-.1c.48-.546.768-1.233.821-1.958a3.3 3.3 0 0 0-.135-1.135A2.64 2.64 0 0 0 12.7 1.233a2.67 2.67 0 0 0-3.042.64 2.65 2.65 0 0 0-.554.948c-.11.367-.156.75-.134 1.133.053.724.341 1.41.821 1.955.005.006 0 .011 0 .018.48.225.911.54 1.272.927a1.6 1.6 0 0 0-.125-1.907 1.8 1.8 0 0 1-.474-1.081q-.015-.287.057-.563a1.12 1.12 0 0 1 .627-.7 1.2 1.2 0 0 1 .944 0q.225.1.392.281.162.182.236.413c.05.184.07.375.058.565a1.8 1.8 0 0 1-.475 1.084 1.633 1.633 0 0 0 .438 2.456l.922.532c.29.169.52.421.664.724h-2.319c.113.452.16.918.139 1.383 0 .04-.013.078-.017.117h3.866v-.75a3.2 3.2 0 0 0-1.58-2.778v.004zm-3.625 6-.922-.532a.13.13 0 0 1-.061-.144.1.1 0 0 1 .025-.047 3.33 3.33 0 0 0 .821-1.958 3.2 3.2 0 0 0-.135-1.132 2.657 2.657 0 0 0-5.041 0c-.11.367-.156.75-.134 1.133.053.724.341 1.41.821 1.955a.13.13 0 0 1 .028.106.13.13 0 0 1-.063.091l-.922.532a3.2 3.2 0 0 0-1.584 2.773v.75h8.75v-.75a3.2 3.2 0 0 0-1.583-2.781zm-5.5 2.023c.143-.303.375-.556.665-.724l.922-.532a1.63 1.63 0 0 0 .436-2.458 1.8 1.8 0 0 1-.474-1.081q-.015-.287.057-.563a1.12 1.12 0 0 1 .627-.7 1.2 1.2 0 0 1 .944 0q.225.1.392.281c.108.12.188.263.237.417q.073.276.057.561a1.8 1.8 0 0 1-.475 1.084 1.632 1.632 0 0 0 .438 2.456l.922.532c.29.169.52.421.664.724z"></path>
              </svg>
            </Button>
          </div>
          <button
            onClick={() => {
              window.open("https://github.com/ahmaddzidnii", "_blank", "noopener,noreferrer");
            }}
            className="size-12 flex items-center justify-center"
          >
            <span className="bg-[#f573a0] w-8 h-8 text-semibold rounded-full flex items-center justify-center text-background-elevated-base font-bold">
              A
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};
