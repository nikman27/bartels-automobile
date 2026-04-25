"use client";

import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX, Maximize } from "lucide-react";

export function HeroVideoControls() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    // Video-Element im DOM finden (das background-video im selben section-Container)
    const video = document.querySelector<HTMLVideoElement>(
      "[data-hero-video]"
    );
    if (video) videoRef.current = video;
  }, []);

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  function toggleFullscreen() {
    const video = videoRef.current;
    if (!video) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  }

  return (
    <div className="absolute bottom-14 right-6 z-20 flex items-center gap-2">
      <button
        onClick={toggleMute}
        aria-label={muted ? "Ton einschalten" : "Ton ausschalten"}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/65 hover:border-white/50"
      >
        {muted ? (
          <VolumeX className="size-4" />
        ) : (
          <Volume2 className="size-4" />
        )}
      </button>
      <button
        onClick={toggleFullscreen}
        aria-label="Vollbild"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/65 hover:border-white/50"
      >
        <Maximize className="size-4" />
      </button>
    </div>
  );
}
