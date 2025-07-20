import { useRef, useEffect, useState } from "react";

interface HoverScrollContainerProps {
  children: React.ReactNode;
  className?: string;
  scrollSpeed?: number;
}

export default function HoverScrollContainer({
  children,
  className = "",
  scrollSpeed = 2,
}: HoverScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const animationRef = useRef<number>();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mouseX = 0;
    let containerRect = container.getBoundingClientRect();

    const handleMouseMove = (e: MouseEvent) => {
      containerRect = container.getBoundingClientRect();
      mouseX = e.clientX - containerRect.left;

      const containerWidth = containerRect.width;
      const scrollableWidth = container.scrollWidth - containerWidth;

      if (scrollableWidth <= 0) return;

      // Determine scroll direction based on mouse position
      const leftZone = containerWidth * 0.2;
      const rightZone = containerWidth * 0.8;

      if (mouseX < leftZone) {
        // Scroll left
        setIsScrolling(true);
        const intensity = (leftZone - mouseX) / leftZone;
        const scrollAmount = -scrollSpeed * intensity;

        const scroll = () => {
          container.scrollLeft = Math.max(
            0,
            container.scrollLeft + scrollAmount,
          );
          if (container.scrollLeft > 0) {
            animationRef.current = requestAnimationFrame(scroll);
          }
        };

        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        animationRef.current = requestAnimationFrame(scroll);
      } else if (mouseX > rightZone) {
        // Scroll right
        setIsScrolling(true);
        const intensity = (mouseX - rightZone) / (containerWidth - rightZone);
        const scrollAmount = scrollSpeed * intensity;

        const scroll = () => {
          container.scrollLeft = Math.min(
            scrollableWidth,
            container.scrollLeft + scrollAmount,
          );
          if (container.scrollLeft < scrollableWidth) {
            animationRef.current = requestAnimationFrame(scroll);
          }
        };

        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        animationRef.current = requestAnimationFrame(scroll);
      } else {
        // Stop scrolling
        setIsScrolling(false);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      }
    };

    const handleMouseLeave = () => {
      setIsScrolling(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [scrollSpeed]);

  return (
    <div
      ref={containerRef}
      className={`overflow-x-auto scrollbar-hide relative ${className}`}
      style={{ scrollBehavior: "auto" }}
    >
      {/* Scroll indicators */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 opacity-30 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center">
          <div className="w-0 h-0 border-t-4 border-b-4 border-r-6 border-transparent border-r-white transform rotate-180"></div>
        </div>
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 opacity-30 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center">
          <div className="w-0 h-0 border-t-4 border-b-4 border-r-6 border-transparent border-r-white"></div>
        </div>
      </div>

      {children}
    </div>
  );
}
