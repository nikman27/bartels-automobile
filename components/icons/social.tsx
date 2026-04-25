import type { SVGProps } from "react";

export function TikTokIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M19.321 5.562a5.122 5.122 0 0 1-3.414-1.267 5.22 5.22 0 0 1-1.537-3.295h-3.35v13.67a2.77 2.77 0 0 1-5.003 1.63 2.77 2.77 0 0 1 3.03-4.33V8.58a6.25 6.25 0 1 0 5.323 6.17v-6.78a8.47 8.47 0 0 0 4.951 1.58V5.562Z" />
    </svg>
  );
}

export function InstagramIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" />
    </svg>
  );
}
