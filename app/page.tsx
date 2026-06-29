"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shuffle, AlertCircle, Users, ChevronRight, Settings } from "lucide-react";
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
    peso4: activePlayers.filter((p) => p.level === "peso4").length,
  };

  const possibleTeams = Math.min(
    countByLevel.peso1,
    Math.floor(countByLevel.peso2 / 2),
    countByLevel.peso3,
    Math.floor(countByLevel.peso4 / 2)
  );

  const handleSort = async () => {
    setError(null);
    setIsAnimating(true);

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
    <div className="min-h-dvh bg-background">
      <Header />

      <main className="px-4 py-6">
        <div className="mx-auto max-w-lg">
          {/* Compact Hero */}
          <div className="mb-6 flex items-center gap-3">
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-primary/20" />
              <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary">
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
            </div>
            <div>
              <h1 className="text-2xl font-bold uppercase tracking-wider text-foreground">
                Volei Sort
              </h1>
              <p className="text-sm text-muted-foreground">
                Sorteie times equilibrados
              </p>
            </div>
          </div>

          {/* Level Stats — Compact Pills */}
          <div className="mb-4 grid grid-cols-4 gap-2">
            <div className="rounded-xl border border-primary/30 bg-primary/10 px-3 py-3 text-center">
              <p className="text-2xl font-bold text-primary">{countByLevel.peso1}</p>
              <p className="text-xs font-medium text-muted-foreground">S</p>
            </div>
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-3 py-3 text-center">
              <p className="text-2xl font-bold text-blue-400">{countByLevel.peso2}</p>
              <p className="text-xs font-medium text-muted-foreground">A</p>
            </div>
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-3 text-center">
              <p className="text-2xl font-bold text-emerald-400">{countByLevel.peso3}</p>
              <p className="text-xs font-medium text-muted-foreground">B</p>
            </div>
            <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 px-3 py-3 text-center">
              <p className="text-2xl font-bold text-purple-400">{countByLevel.peso4}</p>
              <p className="text-xs font-medium text-muted-foreground">C</p>
            </div>
          </div>

          {/* Possible Teams — Highlighted */}
          <div className="mb-4 rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <Users className="h-7 w-7 shrink-0 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Times possíveis</p>
                <p className="text-3xl font-bold text-foreground">{possibleTeams}</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Cada time: 1 S + 2 A + 1 B + 2 C
            </p>
          </div>

          {/* Active Players Summary */}
          <div className="mb-6 rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{activePlayers.length} jogadores ativos</p>
                  <p className="text-xs text-muted-foreground">{activePlayers.length - (possibleTeams * 6)} na reserva se sortear</p>
                </div>
              </div>
              <Link
                href="/configuracao"
                className="flex h-9 items-center gap-1 rounded-lg px-3 text-xs font-medium text-primary active:bg-primary/10"
              >
                Editar
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Sort Button — Large CTA */}
          <Button
            size="lg"
            onClick={handleSort}
            disabled={possibleTeams === 0 || isAnimating}
            className={cn(
              "h-14 w-full gap-3 text-base font-bold uppercase tracking-wider transition-all",
              isAnimating && "animate-pulse"
            )}
          >
            <Shuffle className={cn("h-5 w-5", isAnimating && "animate-spin")} />
            {isAnimating ? "Sorteando..." : "Sortear Times"}
          </Button>

          {/* Not enough players — CTA to config */}
          {possibleTeams === 0 && (
            <div className="mt-4 rounded-xl border border-dashed border-border bg-card/50 p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Settings className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="mb-1 text-sm font-medium text-foreground">
                Jogadores insuficientes
              </p>
              <p className="mb-4 text-xs text-muted-foreground">
                Adicione ou ative jogadores para formar pelo menos 1 time
              </p>
              <Button asChild variant="outline" className="gap-2">
                <Link href="/configuracao">
                  <Settings className="h-4 w-4" />
                  Ir para Configuração
                </Link>
              </Button>
            </div>
          )}

          {/* View Teams Link */}
          {teams.length > 0 && !isAnimating && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push("/times")}
              className="mt-3 h-12 w-full gap-2 bg-transparent"
            >
              Ver último sorteio
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
