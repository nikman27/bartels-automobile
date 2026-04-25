"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function RevealOnScrollProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const elements = document.querySelectorAll<HTMLElement>(
      ".reveal, .reveal-left, .reveal-right",
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    elements.forEach((el) => {
      if (!el.classList.contains("is-visible")) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
