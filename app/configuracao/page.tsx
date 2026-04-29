"use client";

import { useEffect, useState } from "react";
import { RotateCcw, Save, Search, Users } from "lucide-react";
import { Header } from "@/components/header";
import { PlayerCard } from "@/components/player-card";
import { AddPlayerForm } from "@/components/add-player-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePlayersStore } from "@/lib/use-players-store";
import { levelLabels } from "@/lib/players-data";
import type { PlayerLevel } from "@/lib/players-data";
import {
  generateTeamStyles,
  getTeamColorsConfig,
  saveTeamColorsConfig,
  type TeamColorsConfig,
} from "@/lib/team-colors-config";
import { cn } from "@/lib/utils";

const AVAILABLE_COLORS = [
  "red",
  "blue",
  "emerald",
  "yellow",
  "purple",
  "orange",
  "pink",
  "cyan",
  "lime",
  "amber",
  "indigo",
  "teal",
  "white",
  "black",
];

export default function ConfiguracaoPage() {
  const { players, activePlayers, addPlayer, removePlayer, togglePlayerActive, updatePlayerLevel, resetToDefault } = usePlayersStore();

  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState<PlayerLevel | "all">("all");
  const [teamColorsConfig, setTeamColorsConfig] = useState<TeamColorsConfig>({});

  useEffect(() => {
    setTeamColorsConfig(getTeamColorsConfig());
  }, []);

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = filterLevel === "all" || player.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

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

  const handleBaseColorChange = (teamKey: string, value: string) => {
    setTeamColorsConfig((prev) => ({ ...prev, [teamKey]: { base: value } }));
  };

  const handleSaveTeamColors = () => {
    const selectedColors = Array.from({ length: possibleTeams }).map((_, index) => {
      const teamKey = `team_${index}`;
      return teamColorsConfig[teamKey]?.base ?? AVAILABLE_COLORS[index % AVAILABLE_COLORS.length];
    });

    const hasDuplicates = new Set(selectedColors).size !== selectedColors.length;
    if (hasDuplicates) {
      window.alert("Cores não podem se repetir");
      return;
    }

    saveTeamColorsConfig(teamColorsConfig);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold uppercase tracking-wide text-foreground">Configuracao</h1>
          <p className="mt-1 text-muted-foreground">Gerencie os jogadores, niveis e cores dos times</p>
        </div>

        <div className="mb-8 rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-foreground">Cores dos Times</h2>
            <Button onClick={handleSaveTeamColors} className="gap-2"><Save className="h-4 w-4" />Salvar</Button>
          </div>
          <div className="space-y-4">
            {Array.from({ length: possibleTeams }).map((_, index) => {
              const teamKey = `team_${index}`;
              const config = teamColorsConfig[teamKey] ?? { base: AVAILABLE_COLORS[index % AVAILABLE_COLORS.length] };
              const styles = generateTeamStyles(config.base);

              return (
                <div key={teamKey} className="rounded-lg border border-border/80 bg-background/40 p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-foreground">Time {index + 1}</h3>
                    <div className={cn("rounded-md border px-3 py-1 text-sm font-medium", styles.border, styles.bg, styles.text)}>Preview</div>
                  </div>
                  <select
                    value={config.base}
                    onChange={(e) => handleBaseColorChange(teamKey, e.target.value)}
                    className="w-full rounded-md border bg-secondary px-3 py-2"
                  >
                    {AVAILABLE_COLORS.map((color) => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
          <div className="rounded-xl border border-border bg-card p-4"><p className="text-2xl font-bold text-foreground">{activePlayers.length}</p><p className="text-xs text-muted-foreground">Ativos</p></div>
          <div className="rounded-xl border border-primary/30 bg-primary/10 p-4"><p className="text-2xl font-bold text-primary">{countByLevel.peso1}</p><p className="text-xs text-muted-foreground">S</p></div>
          <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4"><p className="text-2xl font-bold text-blue-400">{countByLevel.peso2}</p><p className="text-xs text-muted-foreground">A</p></div>
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4"><p className="text-2xl font-bold text-emerald-400">{countByLevel.peso3}</p><p className="text-xs text-muted-foreground">B</p></div>
          <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-4"><p className="text-2xl font-bold text-purple-400">{countByLevel.peso4}</p><p className="text-xs text-muted-foreground">C</p></div>
        </div>

        <div className="mb-8 rounded-xl border border-border bg-card p-4"><p>Necessario por time: 1 S + 2 A + 1 B + 2 C</p><p className="text-3xl font-bold text-primary">{possibleTeams} times</p></div>

        <div className="mb-8 rounded-xl border border-border bg-card p-6"><h2 className="mb-4 text-lg font-semibold text-foreground">Adicionar Jogador</h2><AddPlayerForm onAdd={addPlayer} /></div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar jogador..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-secondary pl-10" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant={filterLevel === "all" ? "default" : "secondary"} size="sm" onClick={() => setFilterLevel("all")}>Todos</Button>
            {(["peso1", "peso2", "peso3", "peso4"] as PlayerLevel[]).map((level) => (
              <Button key={level} variant={filterLevel === level ? "default" : "secondary"} size="sm" onClick={() => setFilterLevel(level)}>{levelLabels[level]}</Button>
            ))}
            <Button variant="outline" size="sm" onClick={resetToDefault} className="ml-2 gap-2 bg-transparent"><RotateCcw className="h-3 w-3" />Resetar</Button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredPlayers.length === 0 ? <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center"><p className="text-muted-foreground">Nenhum jogador encontrado</p></div> : filteredPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} onToggleActive={togglePlayerActive} onRemove={removePlayer} onUpdateLevel={updatePlayerLevel} />
          ))}
        </div>
      </main>
    </div>
  );
}
