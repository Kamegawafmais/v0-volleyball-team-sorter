"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shuffle, AlertCircle, Users, ChevronRight } from "lucide-react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { usePlayersStore } from "@/lib/use-players-store";
import { cn } from "@/lib/utils";

export default function SortPage() {
  const router = useRouter();
  const { activePlayers, sortTeams, teams } = usePlayersStore();
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const countByLevel = {
    peso1: activePlayers.filter((p) => p.level === "peso1").length,
    peso2: activePlayers.filter((p) => p.level === "peso2").length,
    peso3: activePlayers.filter((p) => p.level === "peso3").length,
  };

  const possibleTeams = Math.min(
    countByLevel.peso1,
    Math.floor(countByLevel.peso2 / 3),
    Math.floor(countByLevel.peso3 / 2)
  );

  const handleSort = async () => {
    setError(null);
    setIsAnimating(true);

    // Animation delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const result = sortTeams();

    if ("error" in result) {
      setError(result.error);
      setIsAnimating(false);
    } else {
      setIsAnimating(false);
      router.push("/times");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl text-center">
          {/* Main Icon */}
          <div className="relative mx-auto mb-8 flex h-32 w-32 items-center justify-center">
            <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20" />
            <div className="absolute inset-4 rounded-full bg-primary/30" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-10 w-10 text-primary-foreground"
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
          </div>

          <h1 className="mb-2 text-4xl font-bold uppercase tracking-wider text-foreground">
            Volei Sort
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Sorteie times equilibrados para sua partida
          </p>

          {/* Stats */}
          <div className="mb-8 grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-primary/30 bg-primary/10 p-4">
              <p className="text-3xl font-bold text-primary">{countByLevel.peso1}</p>
              <p className="text-sm text-muted-foreground">S</p>
            </div>
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
              <p className="text-3xl font-bold text-blue-400">{countByLevel.peso2}</p>
              <p className="text-sm text-muted-foreground">A</p>
            </div>
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
              <p className="text-3xl font-bold text-emerald-400">{countByLevel.peso3}</p>
              <p className="text-sm text-muted-foreground">B</p>
            </div>
          </div>

          {/* Possible Teams Info */}
          <div className="mb-8 rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-center gap-4">
              <Users className="h-8 w-8 text-primary" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Times possiveis</p>
                <p className="text-4xl font-bold text-foreground">{possibleTeams}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Cada time: 1 Pessoa S + 3 Pessoa A + 2 Pessoa B
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-left">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Sort Button */}
          <Button
            size="lg"
            onClick={handleSort}
            disabled={possibleTeams === 0 || isAnimating}
            className={cn(
              "h-16 w-full gap-3 text-lg font-bold uppercase tracking-wider transition-all",
              isAnimating && "animate-pulse"
            )}
          >
            <Shuffle className={cn("h-6 w-6", isAnimating && "animate-spin")} />
            {isAnimating ? "Sorteando..." : "Sortear Times"}
          </Button>

          {possibleTeams === 0 && (
            <p className="mt-4 text-sm text-muted-foreground">
              Adicione mais jogadores na{" "}
              <a href="/configuracao" className="text-primary underline">
                configuracao
              </a>
            </p>
          )}

          {/* View Teams Link */}
          {teams.length > 0 && !isAnimating && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push("/times")}
              className="mt-4 w-full gap-2"
            >
              Ver ultimo sorteio
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
