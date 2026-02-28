import { useRef, useCallback, useEffect, type ReactNode } from "react";

import "@/styles/shelf-carousel.css";
import { cn } from "@/utils/cn";
import { EncoreIconChevronLeft } from "@/components/encore/icons";

interface CarouselProps {
  title: string;
  showAll?: boolean;
  onShowAll?: () => void;
  children: ReactNode;
  className?: string;
}

export const Carousel = ({ title, showAll = false, onShowAll, children, className = "" }: CarouselProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const canPrev = scrollLeft > 0;
    const canNext = scrollLeft + clientWidth < scrollWidth - 1;

    container.style.setProperty("--fade-prev", canPrev ? "1" : "0");
    container.style.setProperty("--fade-next", canNext ? "1" : "0");

    if (prevBtnRef.current) {
      prevBtnRef.current.style.opacity = canPrev ? "" : "0";
      prevBtnRef.current.style.pointerEvents = canPrev ? "" : "none";
    }
    if (nextBtnRef.current) {
      nextBtnRef.current.style.opacity = canNext ? "" : "0";
      nextBtnRef.current.style.pointerEvents = canNext ? "" : "none";
    }
  }, []);

  useEffect(() => {
    updateScrollState();
  }, [updateScrollState]);

  const handlePrevClick = () => {
    if (!scrollerRef.current) return;
    const scrollAmount = scrollerRef.current.clientWidth * 0.8;
    scrollerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const handleNextClick = () => {
    if (!scrollerRef.current) return;
    const scrollAmount = scrollerRef.current.clientWidth * 0.8;
    scrollerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section
      className={cn("carousel-shelf", className)}
      data-shelf="carousel"
    >
      <div className="flex justify-between items-baseline mb-6">
        <h2 className="text-2xl font-semibold hover:underline cursor-pointer">{title}</h2>
        {showAll && (
          <button
            onClick={onShowAll}
            className="text-sm font-semibold text-text-subdued hover:underline cursor-pointer"
          >
            Show all
          </button>
        )}
      </div>

      <div
        ref={containerRef}
        className="carousel-container relative group/carousel"
      >
        <div
          ref={scrollerRef}
          className="carousel-scroller"
          role="presentation"
          data-testid="carousel-scroller"
          onScroll={updateScrollState}
        >
          <div className="carousel-grid">{children}</div>
        </div>

        <div className="carousel-nav">
          <button
            ref={prevBtnRef}
            onClick={handlePrevClick}
            aria-label="Previous"
            className="carousel-button carousel-button-prev"
            style={{ opacity: 0, pointerEvents: "none" }} // initial state sebelum mount
            data-testid="carousel-previous-button"
          >
            <EncoreIconChevronLeft size={16} />
          </button>
          <button
            ref={nextBtnRef}
            onClick={handleNextClick}
            aria-label="Next"
            className="carousel-button carousel-button-next"
            data-testid="carousel-next-button"
          >
            <EncoreIconChevronLeft
              className="rotate-180"
              size={16}
            />
          </button>
        </div>
      </div>
    </section>
  );
};
