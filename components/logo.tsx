"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "inverted";
  imgClassName?: string;
}

export function Logo({
  className,
  variant = "default",
  imgClassName,
}: LogoProps) {
  const src =
    variant === "inverted" ? "/brand/logo-weiss.svg" : "/brand/logo-dunkel.svg";
  return (
    <Link
      href="/"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "inline-flex shrink-0 items-center transition-opacity hover:opacity-85",
        className,
      )}
      aria-label="Bartels-Automobile.de Startseite"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Bartels-Automobile.de"
        className={cn(
          "h-8 w-auto sm:h-9 md:h-10",
          imgClassName,
        )}
        loading="eager"
        decoding="async"
      />
    </Link>
  );
}
