import React, { useMemo } from "react";
import { Link } from "react-router";
import { Image } from "@/components/image";
import { formatDuration } from "@/features/shared/formaters/format.duration";
import { transformAlbumType } from "@/features/shared/utils/transformers";
import { useAlbumInfo, useAlbumArtists, useAlbumCoverArt, useAlbumTracks } from "../context/album-page-context";
import type { ImageSource } from "../model/shared.types";

interface AlbumHeroProps {
  backgroundColor: string;
  backgroundColorMinContrast: string;
}

const buildSrcSet = (sources: ImageSource[]) => {
  return sources
    .filter((source) => source.width)
    .sort((a, b) => (a.width || 0) - (b.width || 0))
    .map((source) => `${source.url} ${source.width}w`)
    .join(", ");
};

export const AlbumHero: React.FC<AlbumHeroProps> = ({ backgroundColor, backgroundColorMinContrast }) => {
  const info = useAlbumInfo();
  const artists = useAlbumArtists();
  const coverArt = useAlbumCoverArt();
  const tracks = useAlbumTracks();

  const totalDuration = useMemo(() => {
    return tracks.reduce((acc, track) => acc + track.duration.totalSeconds, 0);
  }, [tracks]);

  const coverArtSrcSet = buildSrcSet(coverArt.sources);
  const coverArtUrl = coverArt.url;
  const releaseYear = info.releaseDate.isoString?.split("-")[0] || String(info.releaseDate.year);
  return (
    <div
      style={
        {
          "--main-view-grid-width": "100cqw",
          "--fluid-height": "clamp(186px, 186px + (var(--main-view-grid-width) - 600px) / 424 * 150, 336px)",
          "--min-fluid-height": "clamp(186px, 186px + (var(--main-view-grid-width) - 600px) / 424 * 90, 276px)",

          minHeight: "var(--min-fluid-height)",
          height: "min(30vh, var(--fluid-height))",
          maxHeight: "336px",
        } as React.CSSProperties
      }
      className="flex items-end relative w-full pb-6 z-10"
    >
      <div
        style={
          {
            "--background-base": backgroundColor,
            "--background-base-min-contrast": backgroundColorMinContrast,
            backgroundColor: "var(--background-base)",
            backgroundImage: `linear-gradient(to bottom, var(--background-base-min-contrast), transparent)`,
          } as React.CSSProperties
        }
        className="absolute top-0 left-0 w-full h-full -z-1"
      ></div>

      <div className="flex px-6 z-10 flex-1 w-full items-end">
        <div
          style={{
            boxShadow: "0 4px 60px #00000080",
            width: "clamp(120px, 120px + (var(--main-view-grid-width) - 600px) / 424 * 80, 240px)",
            height: "clamp(120px, 120px + (var(--main-view-grid-width) - 600px) / 424 * 80, 240px)",
          }}
          className="relative rounded-xl overflow-hidden me-5 shrink-0"
        >
          <Image
            src={coverArtUrl}
            srcSet={coverArtSrcSet}
            sizes="(min-width: 1024px) 240px, 120px"
            alt="Album cover"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>

        <div className="flex-col flex justify-end">
          <p className="font-medium text-sm">{transformAlbumType(info.type)}</p>

          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(30px, 30px + (var(--main-view-grid-width) - 600px) / 424 * 26, 76px)",
              lineHeight: "clamp(54px, 54px + (var(--main-view-grid-width) - 600px) / 424 * 28, 82px)",
            }}
            className="font-extrabold tracking-tight mt-1 mb-2"
          >
            {info.name}
          </p>

          <div className="flex items-center gap-2">
            <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              {artists.length > 1 ? (
                <div className="flex flex-wrap items-center min-w-0">
                  {artists.map((artist, index) => (
                    <React.Fragment key={artist.id}>
                      <Link
                        to={artist.path}
                        className="font-bold wrap-break-word"
                      >
                        {artist.name}
                      </Link>

                      {index < artists.length - 1 && <span className="mx-1 text-text-subdued">•</span>}
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                artists.map((artist) => (
                  <div
                    key={artist.id}
                    className="flex items-center min-w-0"
                  >
                    <Image
                      alt="Artist avatar"
                      src={artist.avatarUrl}
                      srcSet={buildSrcSet(artist.avatarSources)}
                      sizes="24px"
                      className="me-2 size-6 shrink-0 rounded-full"
                    />
                    <Link
                      to={artist.path}
                      className="font-semibold wrap-break-word"
                    >
                      {artist.name}
                    </Link>
                  </div>
                ))
              )}

              <span className="text-text-subdued wrap-break-word">
                • {releaseYear} • {info.totalTracks} songs, {formatDuration(totalDuration, { compact: false })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
