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
      <div className="min-h-screen bg-background">
        <Header />

        <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col items-center justify-center px-4 py-12">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Users className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-foreground">Nenhum time sorteado</h1>
            <p className="mb-8 text-muted-foreground">
              Faca um sorteio para ver os times aqui
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link href="/">
                  <Shuffle className="h-5 w-5" />
                  Sortear Times
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 bg-transparent">
                <Link href="/configuracao">
                  <Settings className="h-5 w-5" />
                  Configuracao
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-wide text-foreground">
              Times Sorteados
            </h1>
            <p className="mt-1 text-muted-foreground">
              {teams.length} times formados com {teams.length * 6} jogadores
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" className="gap-2 bg-transparent">
              <Link href="/">
                <Shuffle className="h-4 w-4" />
                Novo Sorteio
              </Link>
            </Button>
            <Button variant="secondary" onClick={clearTeams} className="gap-2">
              Limpar Times
            </Button>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team, index) => (
            <TeamCard key={`${team.color}-${index}`} team={team} index={index} />
          ))}
        </div>

        {/* Players not in teams */}
        {playersNotInTeams.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              Jogadores na Reserva ({playersNotInTeams.length})
            </h2>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex flex-wrap gap-2">
                {playersNotInTeams.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2"
                  >
                    <span className="font-medium text-foreground">{player.name}</span>
                    <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      {levelLabels[player.level]}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Estes jogadores estavam ativos mas nao foram incluidos nos times por falta de
                vagas balanceadas.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
