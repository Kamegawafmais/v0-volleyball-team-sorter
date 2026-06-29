"use client";

import Link from "next/link";
import { Shuffle, Settings, Users } from "lucide-react";
import { Header } from "@/components/header";
import { TeamCard } from "@/components/team-card";
import { Button } from "@/components/ui/button";
import { usePlayersStore } from "@/lib/use-players-store";
import { getPlayersNotInTeams } from "@/lib/team-sorter";
import { levelLabels } from "@/lib/players-data";

export default function TimesPage() {
  const { teams, activePlayers, clearTeams } = usePlayersStore();

  const playersNotInTeams = teams.length > 0 ? getPlayersNotInTeams(activePlayers, teams) : [];

  if (teams.length === 0) {
    return (
      <div className="min-h-dvh bg-background">
        <Header />

        <main className="flex min-h-[calc(100dvh-3rem)] flex-col items-center justify-center px-4 py-12">
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h1 className="mb-2 text-xl font-bold text-foreground">Nenhum time sorteado</h1>
            <p className="mb-6 text-sm text-muted-foreground">
              Faça um sorteio para ver os times aqui
            </p>
            <div className="flex flex-col gap-3">
              <Button asChild size="lg" className="h-12 gap-2">
                <Link href="/">
                  <Shuffle className="h-5 w-5" />
                  Sortear Times
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 gap-2 bg-transparent">
                <Link href="/configuracao">
                  <Settings className="h-5 w-5" />
                  Configuração
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background">
      <Header />

      <main className="px-4 py-5">
        <div className="mx-auto max-w-lg">
          {/* Page Header */}
          <div className="mb-5">
            <h1 className="text-2xl font-bold uppercase tracking-wide text-foreground">
              Times Sorteados
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {teams.length} {teams.length === 1 ? 'time formado' : 'times formados'} com {teams.length * 6} jogadores
            </p>
          </div>

          {/* Teams — Vertical list on mobile */}
          <div className="space-y-4">
            {teams.map((team, index) => (
              <TeamCard key={`${team.color}-${index}`} team={team} index={index} />
            ))}
          </div>

          {/* Players not in teams */}
          {playersNotInTeams.length > 0 && (
            <div className="mt-6">
              <h2 className="mb-3 text-base font-semibold text-foreground">
                Reserva ({playersNotInTeams.length})
              </h2>
              <div className="rounded-xl border border-border bg-card p-3">
                <div className="flex flex-wrap gap-2">
                  {playersNotInTeams.map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-2"
                    >
                      <span className="text-sm font-medium text-foreground">{player.name}</span>
                      <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {levelLabels[player.level]}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Jogadores ativos não incluídos nos times por falta de vagas balanceadas.
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 mb-4 flex gap-3">
            <Button asChild variant="outline" className="h-12 flex-1 gap-2 bg-transparent">
              <Link href="/">
                <Shuffle className="h-4 w-4" />
                Novo Sorteio
              </Link>
            </Button>
            <Button variant="secondary" onClick={clearTeams} className="h-12 flex-1 gap-2">
              Limpar Times
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
