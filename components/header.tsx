"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Sorteio" },
  { href: "/configuracao", label: "Configuracao" },
  { href: "/times", label: "Times" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6 text-primary-foreground"
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
          <div className="flex flex-col">
            <span className="text-lg font-bold uppercase tracking-wider text-foreground">
              Volei Sort
            </span>
            <span className="text-xs text-muted-foreground">Sorteador de Times</span>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
