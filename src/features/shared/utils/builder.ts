interface ImageSource {
  url: string;
  width?: number;
  height?: number;
}

export const buildSrcSet = (sources: ImageSource[]) => {
  return sources
    .filter((source) => source.width)
    .sort((a, b) => (a.width || 0) - (b.width || 0))
    .map((source) => `${source.url} ${source.width}w`)
    .join(", ");
};
