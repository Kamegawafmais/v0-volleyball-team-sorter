"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-12 items-center px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 text-primary-foreground"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10" />
              <path d="M2 12h20" />
              <path d="M12 2c2.5 3 4 6.5 4 10s-1.5 7-4 10" />
              <path d="M12 2c-2.5 3-4 6.5-4 10s1.5 7 4 10" />
            </svg>
          </div>
          <span className="text-base font-bold uppercase tracking-wider text-foreground">
            Volei Sort
          </span>
        </Link>
      </div>
    </header>
  );
}
