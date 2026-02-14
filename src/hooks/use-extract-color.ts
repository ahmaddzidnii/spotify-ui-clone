import { useCallback } from "react";
import { FastAverageColor } from "fast-average-color";
import { useThemeStore } from "@/stores/use-theme-store";

/**
 * Hook untuk extract dominant color dari image dengan akurasi lebih baik
 * Mengembalikan function yang bisa dipanggil dengan image URL atau element
 */
export const useExtractColor = () => {
  const setDominantColor = useThemeStore((state) => state.setDominantColor);

  /**
   * Calculate perceptual brightness (luminance) dari RGB
   * Menggunakan formula ITU-R BT.709
   */
  const getLuminance = (r: number, g: number, b: number): number => {
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  /**
   * Convert RGB to HSL untuk manipulasi saturation dan lightness
   */
  const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return [h * 360, s * 100, l * 100];
  };

  /**
   * Convert HSL back to RGB
   */
  const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  };

  /**
   * Enhance color untuk gradient (lebih vibrant dan bright)
   */
  const enhanceColor = (r: number, g: number, b: number): [number, number, number] => {
    let [h, s, l] = rgbToHsl(r, g, b);

    // Boost saturation jika terlalu rendah (min 40%, max 85%)
    if (s < 40) {
      s = Math.min(s * 1.8, 85);
    } else if (s > 85) {
      s = 85;
    }

    // Adjust lightness untuk visibility yang baik (40-70% range)
    if (l < 40) {
      l = Math.min(l * 1.3, 55);
    } else if (l > 70) {
      l = 65;
    }

    return hslToRgb(h, s, l);
  };

  /**
   * Create dark version untuk navbar dengan kontras yang baik
   */
  const darkenColor = (r: number, g: number, b: number): [number, number, number] => {
    let [h, s, l] = rgbToHsl(r, g, b);

    // Maintain saturation tapi reduce lightness
    // Target lightness: 15-25% untuk navbar yang gelap tapi masih punya character
    const targetLightness = 20;
    l = Math.max(15, Math.min(targetLightness, l * 0.3));

    // Slight saturation boost untuk dark version agar tidak terlalu muted
    s = Math.min(s * 1.1, 70);

    return hslToRgb(h, s, l);
  };

  const extractColorFromImage = useCallback(
    async (imageUrlOrElement: string | HTMLImageElement) => {
      const fac = new FastAverageColor();

      try {
        let color;

        if (typeof imageUrlOrElement === "string") {
          // Extract dari URL
          color = await fac.getColorAsync(imageUrlOrElement, {
            algorithm: "sqrt", // Lebih balanced daripada 'dominant'
            ignoredColor: [
              // Ignore white-ish colors
              [255, 255, 255, 255, 50],
              // Ignore black-ish colors
              [0, 0, 0, 255, 50],
              // Ignore light gray
              [200, 200, 200, 255, 50],
              // Ignore dark gray
              [50, 50, 50, 255, 50],
            ],
            silent: true, // Suppress errors di console
          });
        } else {
          // Extract dari element
          color = fac.getColor(imageUrlOrElement, {
            algorithm: "sqrt",
            ignoredColor: [
              [255, 255, 255, 255, 50],
              [0, 0, 0, 255, 50],
              [200, 200, 200, 255, 50],
              [50, 50, 50, 255, 50],
            ],
            silent: true,
          });
        }

        // Get RGB values
        const [r, g, b] = color.value;

        // Check if color is too gray/desaturated
        const luminance = getLuminance(r, g, b);
        const [, saturation] = rgbToHsl(r, g, b);

        // Fallback to default if color is too muted or problematic
        if (saturation < 10 || luminance < 20 || luminance > 235) {
          console.warn("Extracted color is too muted or extreme, using fallback");
          const fallbackBright = "rgb(59, 130, 246)"; // Blue-500
          const fallbackDark = "rgb(30, 58, 138)"; // Blue-900
          setDominantColor(fallbackBright, fallbackDark);
          return { brightColor: fallbackBright, darkColor: fallbackDark };
        }

        // Enhance color untuk gradient (vibrant version)
        const [enhancedR, enhancedG, enhancedB] = enhanceColor(r, g, b);
        const brightColor = `rgb(${enhancedR}, ${enhancedG}, ${enhancedB})`;

        // Create darker version untuk navbar
        const [darkR, darkG, darkB] = darkenColor(r, g, b);
        const darkColor = `rgb(${darkR}, ${darkG}, ${darkB})`;

        // Update store
        setDominantColor(brightColor, darkColor);

        return { brightColor, darkColor };
      } catch (error) {
        console.error("Error extracting color:", error);

        // Return fallback colors
        const fallbackBright = "rgb(59, 130, 246)";
        const fallbackDark = "rgb(30, 58, 138)";
        setDominantColor(fallbackBright, fallbackDark);
        return { brightColor: fallbackBright, darkColor: fallbackDark };
      } finally {
        fac.destroy();
      }
    },
    [setDominantColor],
  );

  return { extractColorFromImage };
};
