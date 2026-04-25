"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VehiclePlaceholder } from "./vehicle-placeholder";
import type { Vehicle } from "@/lib/types";

interface VehicleGalleryProps {
  vehicle: Vehicle;
}

export function VehicleGallery({ vehicle }: VehicleGalleryProps) {
  const images = vehicle.images;
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  const next = () => setActive((i) => (i + 1) % Math.max(1, images.length));
  const prev = () =>
    setActive((i) => (i - 1 + Math.max(1, images.length)) % Math.max(1, images.length));

  if (images.length === 0) {
    return (
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border bg-muted">
        <VehiclePlaceholder category={vehicle.category} label={vehicle.brand} />
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-3 md:grid-cols-[3fr_1fr]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border bg-muted transition-all hover:shadow-lg"
        >
          <Image
            src={images[active]}
            alt={`${vehicle.title} – Bild ${active + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover"
            priority
          />
        </button>
        <div className="grid grid-cols-4 gap-2 md:grid-cols-1 md:grid-rows-4">
          {images.slice(0, 4).map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-md border transition-all",
                i === active ? "ring-2 ring-primary" : "hover:opacity-80",
              )}
              aria-label={`Bild ${i + 1} anzeigen`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="10rem"
                className="object-cover"
              />
              {i === 3 && images.length > 4 && (
                <span className="absolute inset-0 flex items-center justify-center bg-foreground/60 text-sm font-semibold text-background">
                  +{images.length - 4}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl p-0">
          <DialogTitle className="sr-only">
            {vehicle.title} – Bildergalerie
          </DialogTitle>
          <div className="relative aspect-video w-full bg-foreground">
            <Image
              src={images[active]}
              alt={`${vehicle.title} – Bild ${active + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
            />
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 hover:bg-background"
              aria-label="Vorheriges Bild"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 hover:bg-background"
              aria-label="Nächstes Bild"
            >
              <ChevronRight className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 rounded-full bg-background/80 p-2 hover:bg-background"
              aria-label="Schließen"
            >
              <X className="size-5" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
