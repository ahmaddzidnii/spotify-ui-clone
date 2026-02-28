import { useRef, useCallback, useEffect, type ReactNode } from "react";
import { EncoreIconChevronLeft } from "@/components/encore/icons/encore-icon-chevron-left";
import { cn } from "@/utils/cn";
import "@/styles/shelf-carousel.css";

interface CarouselProps {
  /**
   * Custom header content (title, actions, etc.)
   */
  header?: ReactNode;
  /**
   * Children elements (carousel items)
   */
  children: ReactNode;
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * Carousel component with horizontal scrolling and navigation buttons.
 *
 * Features:
 * - Flexible header content
 * - Previous/Next buttons with boundary detection
 * - Edge fade gradients based on scroll position
 * - Smooth scroll behavior
 * - Responsive to container width
 */
export const Carousel = ({ header, children, className = "" }: CarouselProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  /**
   * Update button states and edge fade based on scroll position
   */
  const updateScrollState = useCallback(() => {
    const scroller = scrollerRef.current;
    const container = containerRef.current;
    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;

    if (!scroller || !container) return;

    const { scrollLeft, scrollWidth, clientWidth } = scroller;

    // Check if we can scroll in each direction
    const canScrollPrev = scrollLeft > 1; // Small threshold for rounding
    const canScrollNext = scrollLeft + clientWidth < scrollWidth - 1;

    // Update CSS variables for edge gradients
    container.style.setProperty("--fade-prev", canScrollPrev ? "1" : "0");
    container.style.setProperty("--fade-next", canScrollNext ? "1" : "0");

    // Update button visibility and interaction
    if (prevBtn) {
      prevBtn.style.opacity = canScrollPrev ? "" : "0";
      prevBtn.style.pointerEvents = canScrollPrev ? "" : "none";
    }
    if (nextBtn) {
      nextBtn.style.opacity = canScrollNext ? "" : "0";
      nextBtn.style.pointerEvents = canScrollNext ? "" : "none";
    }
  }, []);

  // Initial state check on mount and children change
  useEffect(() => {
    updateScrollState();
  }, [updateScrollState, children]);

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
      {/* Header */}
      {header && <div className="mb-2">{header}</div>}

      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="carousel-container relative group/carousel"
      >
        {/* Scrollable Area */}
        <div
          ref={scrollerRef}
          className="carousel-scroller"
          role="presentation"
          data-testid="carousel-scroller"
          onScroll={updateScrollState}
        >
          <div className="carousel-grid">{children}</div>
        </div>

        {/* Navigation Buttons */}
        <div className="carousel-nav">
          <button
            ref={prevBtnRef}
            onClick={handlePrevClick}
            aria-label="Previous"
            className="carousel-button carousel-button-prev"
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
