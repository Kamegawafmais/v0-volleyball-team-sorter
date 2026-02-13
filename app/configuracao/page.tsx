"use client";

import { useState } from "react";
import { RotateCcw, Search, Users } from "lucide-react";
import { Header } from "@/components/header";
import { PlayerCard } from "@/components/player-card";
import { AddPlayerForm } from "@/components/add-player-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePlayersStore } from "@/lib/use-players-store";
import { levelLabels } from "@/lib/players-data";
import type { PlayerLevel } from "@/lib/players-data";

export default function ConfiguracaoPage() {
  const {
    players,
    activePlayers,
    addPlayer,
    removePlayer,
    togglePlayerActive,
    updatePlayerLevel,
    resetToDefault,
  } = usePlayersStore();

  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState<PlayerLevel | "all">("all");

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = filterLevel === "all" || player.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold uppercase tracking-wide text-foreground">
            Configuracao
          </h1>
          <p className="mt-1 text-muted-foreground">
            Gerencie os jogadores e seus niveis
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{activePlayers.length}</p>
                <p className="text-xs text-muted-foreground">Jogadores Ativos</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-primary/30 bg-primary/10 p-4">
            <p className="text-2xl font-bold text-primary">{countByLevel.peso1}</p>
            <p className="text-xs text-muted-foreground">S</p>
          </div>

          <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
            <p className="text-2xl font-bold text-blue-400">{countByLevel.peso2}</p>
            <p className="text-xs text-muted-foreground">A</p>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
            <p className="text-2xl font-bold text-emerald-400">{countByLevel.peso3}</p>
            <p className="text-xs text-muted-foreground">B</p>
          </div>
        </div>

        {/* Teams possible info */}
        <div className="mb-8 rounded-xl border border-border bg-card p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Times possiveis com jogadores ativos</p>
              <p className="text-3xl font-bold text-primary">{possibleTeams} times</p>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <p>Necessario por time:</p>
              <p>1 S + 3 A + 2 B</p>
            </div>
          </div>
        </div>

        {/* Add Player Form */}
        <div className="mb-8 rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Adicionar Jogador</h2>
          <AddPlayerForm onAdd={addPlayer} />
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar jogador..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-secondary pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={filterLevel === "all" ? "default" : "secondary"}
              size="sm"
              onClick={() => setFilterLevel("all")}
            >
              Todos
            </Button>
            {(["peso1", "peso2", "peso3"] as PlayerLevel[]).map((level) => (
              <Button
                key={level}
                variant={filterLevel === level ? "default" : "secondary"}
                size="sm"
                onClick={() => setFilterLevel(level)}
              >
                {levelLabels[level]}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={resetToDefault}
              className="ml-2 gap-2 bg-transparent"
            >
              <RotateCcw className="h-3 w-3" />
              Resetar
            </Button>
          </div>
        </div>

        {/* Players List */}
        <div className="space-y-3">
          {filteredPlayers.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
              <p className="text-muted-foreground">Nenhum jogador encontrado</p>
            </div>
          ) : (
            filteredPlayers.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                onToggleActive={togglePlayerActive}
                onRemove={removePlayer}
                onUpdateLevel={updatePlayerLevel}
              />
            ))
          )}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {players.length} jogadores no total, {activePlayers.length} ativos
        </p>
      </main>
    </div>
  );
}
