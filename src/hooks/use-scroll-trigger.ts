import { useEffect, useState, type RefObject } from "react";
import type { ScrollAreaRef } from "../components/scroll-area";

export function useScrollTrigger(ref: RefObject<ScrollAreaRef | null>, threshold = 200) {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (!ref?.current) return;

    const osInstance = ref.current.getOsInstance();
    if (!osInstance) return;

    // Use OverlayScrollbars event API
    const handleScroll = () => {
      const viewport = osInstance.elements().viewport;
      const isPast = viewport.scrollTop >= threshold;
      setTriggered((prev) => (prev !== isPast ? isPast : prev));
    };

    // Register scroll event using OverlayScrollbars API
    osInstance.on("scroll", handleScroll);

    return () => {
      osInstance.off("scroll", handleScroll);
    };
  }, [ref, threshold]);

  return triggered;
}
