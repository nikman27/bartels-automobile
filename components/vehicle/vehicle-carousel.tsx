"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Vehicle } from "@/lib/types";
import { VehicleCard } from "./vehicle-card";

interface VehicleCarouselProps {
  vehicles: Vehicle[];
}

export function VehicleCarousel({ vehicles }: VehicleCarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const recalc = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    const p = Math.round(el.scrollLeft / Math.max(1, el.clientWidth));
    const count = Math.max(1, Math.ceil(el.scrollWidth / Math.max(1, el.clientWidth)));
    setPage(p);
    setPageCount(count);
  }, []);

  useEffect(() => {
    recalc();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", recalc, { passive: true });
    window.addEventListener("resize", recalc);
    return () => {
      el.removeEventListener("scroll", recalc);
      window.removeEventListener("resize", recalc);
    };
  }, [recalc]);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  const scrollToPage = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:gap-6 sm:px-6 lg:px-8"
        role="list"
      >
        {vehicles.map((v, i) => (
          <div
            key={v.id}
            role="listitem"
            className="w-[min(85%,20rem)] shrink-0 snap-start sm:w-80 lg:w-[22rem]"
          >
            <VehicleCard vehicle={v} priority={i < 2} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Zu Seite ${i + 1} springen`}
              onClick={() => scrollToPage(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === page ? "w-8 bg-foreground" : "w-1.5 bg-border",
              )}
            />
          ))}
        </div>
        <div className="flex gap-1.5">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => scroll(-1)}
            disabled={atStart}
            aria-label="Vorheriges Fahrzeug"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => scroll(1)}
            disabled={atEnd}
            aria-label="Nächstes Fahrzeug"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
