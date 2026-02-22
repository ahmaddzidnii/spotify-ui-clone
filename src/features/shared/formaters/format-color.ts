export const hexToRgb = (hex: string) => {
  let clean = hex.replace("#", "");

  if (clean.length === 8) clean = clean.slice(0, 6); // buang alpha
  if (clean.length === 3)
    clean = clean
      .split("")
      .map((c) => c + c)
      .join("");

  const bigint = parseInt(clean, 16);

  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
};
