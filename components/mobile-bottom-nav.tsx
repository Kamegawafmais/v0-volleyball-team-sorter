"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shuffle, Settings, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Sorteio", icon: Shuffle },
  { href: "/configuracao", label: "Configuração", icon: Settings },
  { href: "/times", label: "Times", icon: Users },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex h-14 items-stretch">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground active:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
