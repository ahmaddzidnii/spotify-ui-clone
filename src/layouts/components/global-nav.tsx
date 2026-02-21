import { Link, useLocation, useNavigate } from "react-router";
import { useRef, useState, useCallback, useEffect, type KeyboardEvent } from "react";
import { FaSearch } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

import { SpotifyLogo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { Image } from "@/components/image";
import { ScrollArea } from "@/components/scroll-area";
import {
  EncoreIconPlay,
  EncoreIconHomeFilled,
  EncoreIconHomeOutline,
  EncoreIconBrowseFilled,
  EncoreIconBrowseOutline,
  EncoreIconInstallApp,
  EncoreIconBell,
  EncoreIconUserGroup,
} from "@/components/encore/icons";

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
                <EncoreIconBrowseFilled className="size-6" />
              ) : (
                <EncoreIconBrowseOutline className="size-6" />
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
                            <EncoreIconPlay className="size-5 fill-white" />
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
              {location.pathname === "/" ? <EncoreIconHomeFilled className="size-6" /> : <EncoreIconHomeOutline className="size-6" />}
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
            <EncoreIconInstallApp className="size-4" />
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
                <EncoreIconBell className="size-4" />
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
                <EncoreIconUserGroup className="size-4" />
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
