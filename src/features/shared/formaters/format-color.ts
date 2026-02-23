import chroma from "chroma-js";

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

export const generateDarkenHex = (sourceHex: string) => {
  // Buang alpha channel 'FF' di akhir string agar chroma-js fokus ke warna dasar
  const cleanHex = sourceHex.replace(/FF$/i, "");

  const color = chroma(cleanHex);

  // Manipulasi HSL secara presisi
  const baseDarkHex = color
    .set("hsl.h", color.get("hsl.h") - 2.86) // Geser hue ke titik target
    .set("hsl.s", 1) // Paksa saturasi mentok ke 100%
    .set("hsl.l", 0.1608) // Gelapkan lightness presisi ke 16.08%
    .hex()
    .toUpperCase(); // Format output ke huruf besar

  return `${baseDarkHex}FF`;
};
