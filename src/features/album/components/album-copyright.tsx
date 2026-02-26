import { transformCopyrightType } from "@/features/shared/utils/transformers";
import React from "react";
import { useAlbumInfo, useAlbumCopyright } from "../context/album-page-context";

export const AlbumCopyright: React.FC = () => {
  const info = useAlbumInfo();
  const copyrights = useAlbumCopyright();
  return (
    <div className="mt-8 text-text-subdued leading-tight">
      <p className="text-sm">
        {info.releaseDate.isoString &&
          new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(info.releaseDate.isoString))}
      </p>
      {copyrights.map((c, i) => (
        <p
          key={i}
          className="text-xs"
        >
          {transformCopyrightType(c.type)} {c.text.replace(/[©℗]/g, "")}
        </p>
      ))}
    </div>
  );
};
