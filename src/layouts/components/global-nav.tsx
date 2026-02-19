import { Link, useLocation, useNavigate } from "react-router";
import { useRef, useState, useCallback, useEffect, type KeyboardEvent } from "react";
import { FaSearch } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

import { SpotifyLogo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { Image } from "@/components/image";
import { ScrollArea } from "@/components/scroll-area";

const GITHUB_URL = "https://github.com/ahmaddzidnii";
const DROPDOWN_BLUR_DELAY_MS = 150;

interface RecentSearch {
  id: string;
  type: "Song" | "artist" | "album" | "playlist" | "podcast" | "show" | "episode" | "genre";
  name: string;
  artists?: {
    artistId: string;
    name: string;
    artistUrl: string;
  }[];

  imageBannerUrl?: string;
}

function getStoredRecentSearches(): RecentSearch[] {
  return [
    {
      id: "1",
      type: "Song",
      name: "Cerito Loro",
      artists: [
        {
          artistId: "123",
          name: "Happy Asmara",
          artistUrl: "/artist/123",
        },
        {
          artistId: "1232",
          name: "Royal Music",
          artistUrl: "/artist/123",
        },
      ],
      imageBannerUrl: "https://i.scdn.co/image/ab67616d000011eb7f434994802d189dfc66a626",
    },
    {
      id: "2",
      type: "Song",
      name: "Orang Yang Salah",
      artists: [
        {
          artistId: "124",
          name: "Luvia Band",
          artistUrl: "/artist/1232",
        },
      ],
      imageBannerUrl: "https://i.scdn.co/image/ab67616d000011eb54d720b4d7c49a432192747f",
    },
  ];
}

function saveRecentSearches(_searches: RecentSearch[]): void {
  //  Implement actual storage logic here, e.g. localStorage or IndexedDB
}

function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(() => getStoredRecentSearches());

  const addSearch = useCallback((_query: string) => {
    // Implement actual search result fetching logic here, e.g. call your search API with the query and get the result item
  }, []);

  const removeSearch = useCallback((id: string) => {
    setRecentSearches((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      saveRecentSearches(updated);
      return updated;
    });
  }, []);

  const clearAll = useCallback(() => {
    setRecentSearches([]);
    saveRecentSearches([]);
  }, []);

  return { recentSearches, addSearch, removeSearch, clearAll };
}

function useDebounce<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);

  return debounced;
}

const SearchInput = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const blurTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedSearchValue = useDebounce(searchValue, 300);

  const { recentSearches, addSearch, removeSearch, clearAll } = useRecentSearches();

  const showDropdown = isFocused;

  // Dismiss dropdown on outside click
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  // Sync debounced value – hook point for real API calls
  useEffect(() => {
    // Replace this with your search API call, e.g.:
    // if (debouncedSearchValue) fetchSearchResults(debouncedSearchValue);
    void debouncedSearchValue;
  }, [debouncedSearchValue]);

  const handleFocus = useCallback(() => {
    if (blurTimerRef.current) clearTimeout(blurTimerRef.current);
    setIsFocused(true);
    setActiveIndex(-1);
  }, []);

  const handleBlur = useCallback(() => {
    blurTimerRef.current = setTimeout(() => setIsFocused(false), DROPDOWN_BLUR_DELAY_MS);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchValue("");
    setActiveIndex(-1);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  const handleSubmit = useCallback(
    (query?: string) => {
      const q = (query ?? searchValue).trim();
      if (!q) return;
      // addSearch(q);
      setSearchValue(q);
      setIsFocused(false);
      navigate(`/search/${encodeURIComponent(q)}`);
    },
    [searchValue, addSearch, navigate],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (!showDropdown) return;

      const itemCount = recentSearches.length;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) => (prev + 1) % itemCount);
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) => (prev - 1 + itemCount) % itemCount);
          break;
        case "Enter":
          e.preventDefault();
          if (activeIndex >= 0 && recentSearches[activeIndex]) {
            // handleSubmit(recentSearches[activeIndex].query);
          } else {
            handleSubmit();
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsFocused(false);
          inputRef.current?.blur();
          break;
        default:
          setActiveIndex(-1);
      }
    },
    [showDropdown, recentSearches, activeIndex, handleSubmit],
  );

  const dropdownId = "search-dropdown";
  const activeDescendant = activeIndex >= 0 ? `search-item-${activeIndex}` : undefined;

  const hasRecentSearches = recentSearches.length > 0;

  return (
    <div className="mx-2 w-full relative">
      {/* Search form */}
      <form
        role="search"
        aria-label="Site search"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className={`bg-background-elevated-base h-12 w-full rounded-[500px] px-2 flex transition-all ${
          isFocused ? "outline outline-2 outline-white" : ""
        }`}
      >
        {/* Search icon / toggle */}
        <div className="w-12 h-12 flex items-center justify-center shrink-0">
          <Tooltip
            content="Search"
            side="bottom"
          >
            <button
              type="submit"
              aria-label="Submit search"
            >
              <FaSearch className="text-white size-5" />
            </button>
          </Tooltip>
        </div>

        {/* Text input */}
        <input
          ref={inputRef}
          type="text"
          name="q"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="What do you want to play?"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          aria-label="Search"
          aria-autocomplete="list"
          aria-controls={dropdownId}
          aria-expanded={showDropdown}
          aria-activedescendant={activeDescendant}
          className="flex-1 focus-visible:outline-none"
        />

        {/* Clear button */}
        {searchValue && (
          <Button
            variant="tertiary"
            type="button"
            aria-label="Clear search"
            onClick={handleClearSearch}
          >
            <IoCloseSharp className="size-8 mx-2" />
          </Button>
        )}

        <div
          className="border-s-2 border-essential-subdued h-7 my-auto"
          aria-hidden="true"
        />

        {/* Browse button */}
        <div className="w-13">
          <Tooltip content="Browse">
            <button
              type="button"
              aria-label="Browse categories"
              onClick={() => navigate("/search")}
              className="ml-2 flex items-center justify-center w-12 h-12 hover:bg-white/20 rounded-full transition-colors"
            >
              {location.pathname.startsWith("/search") ? (
                <svg
                  role="img"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="size-6 fill-white"
                >
                  <path d="M4 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4H4zM1.513 9.37A1 1 0 0 1 2.291 9H21.71a1 1 0 0 1 .978 1.208l-2.17 10.208A2 2 0 0 1 18.562 22H5.438a2 2 0 0 1-1.956-1.584l-2.17-10.208a1 1 0 0 1 .201-.837zM12 17.834c1.933 0 3.5-1.044 3.5-2.333s-1.567-2.333-3.5-2.333S8.5 14.21 8.5 15.5s1.567 2.333 3.5 2.333z"></path>
                </svg>
              ) : (
                <svg
                  role="img"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="size-6 fill-white"
                >
                  <path d="M15 15.5c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2" />
                  <path d="M1.513 9.37A1 1 0 0 1 2.291 9h19.418a1 1 0 0 1 .979 1.208l-2.339 11a1 1 0 0 1-.978.792H4.63a1 1 0 0 1-.978-.792l-2.339-11a1 1 0 0 1 .201-.837zM3.525 11l1.913 9h13.123l1.913-9zM4 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4h-2V3H6v3H4z" />
                </svg>
              )}
            </button>
          </Tooltip>
        </div>
      </form>

      {/* Dropdown */}
      <div
        ref={dropdownRef}
        id={dropdownId}
        role="listbox"
        aria-label="Recent searches"
        onMouseDown={(e) => e.preventDefault()}
        style={{
          zIndex: "var(--above-everything-grid-area-z-index)",
          visibility: showDropdown ? "visible" : "hidden",
          opacity: showDropdown ? 1 : 0,
          width: "100%",
          minHeight: "398px",
          position: "absolute",
        }}
        className="top-full mt-2 bg-background-elevated-highlight rounded-lg shadow-2xl transition-opacity duration-300 overflow-hidden"
      >
        <ScrollArea>
          <div className="text-white  p-4">
            {hasRecentSearches ? (
              <>
                {/* HEADER */}
                <div className="flex items-center justify-between mb-2">
                  <p className="text-base font-bold">Recent searches</p>

                  <button
                    type="button"
                    onClick={clearAll}
                    className="text-xs text-white/60 hover:text-white underline underline-offset-2 transition-colors"
                    aria-label="Clear all recent searches"
                  >
                    Clear all
                  </button>
                </div>

                {/* LIST */}
                <ul className="space-y-1 h-[398px]">
                  {recentSearches.map((item, index) => (
                    <li
                      key={item.id}
                      id={`search-item-${item.id}`}
                      role="option"
                      aria-selected={index === activeIndex}
                      className={`group flex items-center justify-between p-2 rounded transition-colors ${
                        index === activeIndex ? "bg-white/20" : "hover:bg-white/10"
                      }`}
                    >
                      {/* CLICKABLE AREA ONLY LEFT SIDE */}
                      <div
                        // onClick={() => handleSubmit(item.id)}
                        className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer"
                      >
                        {/* IMAGE */}
                        <div className="relative size-12 shrink-0">
                          <Image
                            src={item.imageBannerUrl || "https://via.placeholder.com/48?text=No+Image"}
                            alt={`${item.name} cover`}
                            className="size-12 rounded object-cover transition group-hover:brightness-50"
                          />

                          {/* PLAY BUTTON */}
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                            variant="tertiary"
                          >
                            <svg
                              role="img"
                              viewBox="0 0 16 16"
                              className="size-5 fill-white"
                            >
                              <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z" />
                            </svg>
                          </Button>
                        </div>

                        {/* TEXT */}
                        <div className="flex flex-col min-w-0">
                          <Link
                            to="/bc"
                            onClick={(e) => e.stopPropagation()}
                            className="text-sm truncate hover:underline  font-medium"
                          >
                            {item.name}
                          </Link>

                          <span className="text-sm truncate text-text-subdued">
                            {item.type} •{" "}
                            {item.artists?.map((a, i) => (
                              <span key={a.artistId}>
                                {i > 0 && ", "}
                                <Link
                                  to={a.artistUrl}
                                  onClick={(e) => e.stopPropagation()}
                                  className="hover:underline"
                                >
                                  {a.name}
                                </Link>
                              </span>
                            ))}
                          </span>
                        </div>
                      </div>

                      {/* REMOVE BUTTON */}
                      <button
                        type="button"
                        aria-label={`Remove "${item.id}" from recent searches`}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSearch(item.id);
                        }}
                        className="ml-2 shrink-0 text-white/40 hover:text-white transition-colors"
                      >
                        <IoCloseSharp className="size-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-sm font-semibold mb-2">Recent searches</p>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export const GlobalNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGithubClick = useCallback(() => {
    window.open(GITHUB_URL, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <nav
      className="global-nav"
      aria-label="Main navigation"
    >
      <div className="relative flex items-center justify-between w-full h-12 text-white pl-7 pr-2">
        {/* Logo */}
        <div>
          <Link
            to="/"
            aria-label="Go to home"
          >
            <SpotifyLogo />
          </Link>
        </div>

        {/* Center – Home + Search */}
        <div className="absolute left-1/2 -translate-x-1/2 flex w-1/2 min-w-[350px] max-w-[546px] items-center">
          <Tooltip
            content="Home"
            side="bottom"
          >
            <button
              aria-label="Home"
              onClick={() => navigate("/")}
              className="ml-2 bg-background-elevated-base rounded-full w-12 h-12 flex items-center shrink-0 justify-center hover:bg-white/20 transition-colors"
            >
              {location.pathname === "/" ? (
                <svg
                  role="img"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="size-6 fill-white"
                >
                  <path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732z"></path>
                </svg>
              ) : (
                <svg
                  role="img"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="size-6 fill-white"
                >
                  <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732z"></path>
                </svg>
              )}
            </button>
          </Tooltip>
          <SearchInput />
        </div>

        {/* Right – Actions */}
        <div className="flex gap-2 items-center">
          <Button
            variant="tertiary"
            className="p-2 h-8"
          >
            <svg
              role="img"
              aria-label="Install App"
              viewBox="0 0 16 16"
              className="size-4 fill-current"
            >
              <path d="M4.995 8.745a.75.75 0 0 1 1.06 0L7.25 9.939V4a.75.75 0 0 1 1.5 0v5.94l1.195-1.195a.75.75 0 1 1 1.06 1.06L8 12.811l-.528-.528-.005-.005-2.472-2.473a.75.75 0 0 1 0-1.06" />
              <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13" />
            </svg>
            <span className="ml-2 font-bold text-[13px]">Install App</span>
          </Button>

          <div className="flex gap-4 px-2 h-8">
            <Tooltip
              content="What's new"
              side="bottom"
            >
              <Button
                variant="tertiary"
                className="p-2 h-8"
                aria-label="What's new"
              >
                <svg
                  role="img"
                  aria-hidden="true"
                  className="size-4 fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1.5a4 4 0 0 0-4 4v3.27a.75.75 0 0 1-.1.373L2.255 12h11.49L12.1 9.142a.75.75 0 0 1-.1-.374V5.5a4 4 0 0 0-4-4m-5.5 4a5.5 5.5 0 0 1 11 0v3.067l2.193 3.809a.75.75 0 0 1-.65 1.124H10.5a2.5 2.5 0 0 1-5 0H.957a.75.75 0 0 1-.65-1.124L2.5 8.569zm4.5 8a1 1 0 1 0 2 0z" />
                </svg>
              </Button>
            </Tooltip>

            <Tooltip
              content="Friend Activity"
              side="bottom"
            >
              <Button
                variant="tertiary"
                className="p-2 h-8"
                aria-label="Friend Activity"
              >
                <svg
                  role="img"
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="size-4 fill-current"
                >
                  <path d="M3.849 10.034c-.021-.465.026-.93.139-1.381H1.669c.143-.303.375-.556.665-.724l.922-.532a1.63 1.63 0 0 0 .436-2.458 1.8 1.8 0 0 1-.474-1.081q-.014-.287.057-.563a1.12 1.12 0 0 1 .627-.7 1.2 1.2 0 0 1 .944 0q.225.1.392.281c.108.12.188.263.237.417q.074.276.057.561a1.8 1.8 0 0 1-.475 1.084 1.6 1.6 0 0 0-.124 1.9c.36-.388.792-.702 1.272-.927v-.015c.48-.546.768-1.233.821-1.958a3.2 3.2 0 0 0-.135-1.132 2.657 2.657 0 0 0-5.04 0c-.111.367-.157.75-.135 1.133.053.724.341 1.41.821 1.955A.13.13 0 0 1 2.565 6a.13.13 0 0 1-.063.091l-.922.532A3.2 3.2 0 0 0-.004 9.396v.75h3.866c.001-.033-.01-.071-.013-.112m10.568-3.4-.922-.532a.13.13 0 0 1-.064-.091.12.12 0 0 1 .028-.1c.48-.546.768-1.233.821-1.958a3.3 3.3 0 0 0-.135-1.135A2.64 2.64 0 0 0 12.7 1.233a2.67 2.67 0 0 0-3.042.64 2.65 2.65 0 0 0-.554.948c-.11.367-.156.75-.134 1.133.053.724.341 1.41.821 1.955.005.006 0 .011 0 .018.48.225.911.54 1.272.927a1.6 1.6 0 0 0-.125-1.907 1.8 1.8 0 0 1-.474-1.081q-.015-.287.057-.563a1.12 1.12 0 0 1 .627-.7 1.2 1.2 0 0 1 .944 0q.225.1.392.281.162.182.236.413c.05.184.07.375.058.565a1.8 1.8 0 0 1-.475 1.084 1.633 1.633 0 0 0 .438 2.456l.922.532c.29.169.52.421.664.724h-2.319c.113.452.16.918.139 1.383 0 .04-.013.078-.017.117h3.866v-.75a3.2 3.2 0 0 0-1.58-2.778v.004zm-3.625 6-.922-.532a.13.13 0 0 1-.061-.144.1.1 0 0 1 .025-.047 3.33 3.33 0 0 0 .821-1.958 3.2 3.2 0 0 0-.135-1.132 2.657 2.657 0 0 0-5.041 0c-.11.367-.156.75-.134 1.133.053.724.341 1.41.821 1.955a.13.13 0 0 1 .028.106.13.13 0 0 1-.063.091l-.922.532a3.2 3.2 0 0 0-1.584 2.773v.75h8.75v-.75a3.2 3.2 0 0 0-1.583-2.781zm-5.5 2.023c.143-.303.375-.556.665-.724l.922-.532a1.63 1.63 0 0 0 .436-2.458 1.8 1.8 0 0 1-.474-1.081q-.015-.287.057-.563a1.12 1.12 0 0 1 .627-.7 1.2 1.2 0 0 1 .944 0q.225.1.392.281c.108.12.188.263.237.417q.073.276.057.561a1.8 1.8 0 0 1-.475 1.084 1.632 1.632 0 0 0 .438 2.456l.922.532c.29.169.52.421.664.724z" />
                </svg>
              </Button>
            </Tooltip>
          </div>

          {/* User avatar */}
          <Tooltip content="ahmaddzidnii">
            <button
              type="button"
              onClick={handleGithubClick}
              aria-label="Open GitHub profile for ahmaddzidnii"
              className="size-12 flex items-center justify-center"
            >
              <span
                className="bg-[#f573a0] w-8 h-8 text-semibold rounded-full flex items-center justify-center text-background-elevated-base font-bold"
                aria-hidden="true"
              >
                A
              </span>
            </button>
          </Tooltip>
        </div>
      </div>
    </nav>
  );
};
