import { transformCopyrightType } from "@/features/shared/utils/transformers";
import React from "react";

interface Copyright {
  type: string;
  text: string;
}

interface AlbumCopyrightProps {
  releaseDate: string;
  copyrights: Copyright[];
}

export const AlbumCopyright: React.FC<AlbumCopyrightProps> = ({ releaseDate, copyrights }) => {
  return (
    <div className="mt-8 text-text-subdued leading-tight">
      <p className="text-sm">
        {new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(releaseDate))}
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
