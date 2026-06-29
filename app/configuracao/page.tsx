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
  { value: "red", label: "Vermelho" },
  { value: "blue", label: "Azul" },
  { value: "emerald", label: "Verde" },
  { value: "yellow", label: "Amarelo" },
  { value: "purple", label: "Roxo" },
  { value: "orange", label: "Laranja" },
  { value: "pink", label: "Rosa" },
  { value: "cyan", label: "Ciano" },
  { value: "lime", label: "Lima" },
  { value: "amber", label: "Âmbar" },
  { value: "indigo", label: "Índigo" },
  { value: "teal", label: "Verde-azulado" },
  { value: "white", label: "Branco" },
  { value: "black", label: "Preto" },
];

export default function ConfiguracaoPage() {
  const { players, activePlayers, addPlayer, removePlayer, togglePlayerActive, updatePlayerLevel, resetToDefault } = usePlayersStore();

  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState<PlayerLevel | "all">("all");
  const [teamColorsConfig, setTeamColorsConfig] = useState<TeamColorsConfig>({});
  const [showColors, setShowColors] = useState(false);

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
      return teamColorsConfig[teamKey]?.base ?? AVAILABLE_COLORS[index % AVAILABLE_COLORS.length].value;
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
    <div className="min-h-dvh bg-background">
      <Header />
      <main className="px-4 py-5">
        <div className="mx-auto max-w-lg">
          {/* Page Title */}
          <div className="mb-5">
            <h1 className="text-2xl font-bold uppercase tracking-wide text-foreground">Configuração</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">Jogadores, níveis e cores</p>
          </div>

          {/* Stats Row */}
          <div className="mb-4 flex gap-2 overflow-x-auto">
            <div className="flex shrink-0 items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-lg font-bold text-foreground leading-tight">{activePlayers.length}</p>
                <p className="text-[10px] text-muted-foreground">Ativos</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3 py-2">
              <p className="text-lg font-bold text-primary leading-tight">{countByLevel.peso1}</p>
              <p className="text-[10px] text-muted-foreground">S</p>
            </div>
            <div className="flex shrink-0 items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 px-3 py-2">
              <p className="text-lg font-bold text-blue-400 leading-tight">{countByLevel.peso2}</p>
              <p className="text-[10px] text-muted-foreground">A</p>
            </div>
            <div className="flex shrink-0 items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2">
              <p className="text-lg font-bold text-emerald-400 leading-tight">{countByLevel.peso3}</p>
              <p className="text-[10px] text-muted-foreground">B</p>
            </div>
            <div className="flex shrink-0 items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-3 py-2">
              <p className="text-lg font-bold text-purple-400 leading-tight">{countByLevel.peso4}</p>
              <p className="text-[10px] text-muted-foreground">C</p>
            </div>
          </div>

          {/* Possible Teams + Distribution */}
          <div className="mb-5 rounded-xl border border-border bg-card px-4 py-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Necessário por time: 1S + 2A + 1B + 2C</p>
              <p className="text-xl font-bold text-primary">{possibleTeams} {possibleTeams === 1 ? 'time' : 'times'}</p>
            </div>
          </div>

          {/* Add Player — Compact Card */}
          <div className="mb-5 rounded-xl border border-border bg-card p-4">
            <h2 className="mb-3 text-sm font-semibold text-foreground">Adicionar Jogador</h2>
            <AddPlayerForm onAdd={addPlayer} />
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar jogador..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 bg-secondary pl-10"
            />
          </div>

          {/* Level Filter Chips */}
          <div className="mb-4 flex gap-2 overflow-x-auto">
            <Button
              variant={filterLevel === "all" ? "default" : "secondary"}
              size="sm"
              onClick={() => setFilterLevel("all")}
              className="h-9 shrink-0 px-4"
            >
              Todos
            </Button>
            {(["peso1", "peso2", "peso3", "peso4"] as PlayerLevel[]).map((level) => (
              <Button
                key={level}
                variant={filterLevel === level ? "default" : "secondary"}
                size="sm"
                onClick={() => setFilterLevel(level)}
                className="h-9 shrink-0 px-4"
              >
                {levelLabels[level]}
              </Button>
            ))}
          </div>

          {/* Player List */}
          <div className="space-y-2">
            {filteredPlayers.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-card/50 p-8 text-center">
                <p className="text-sm text-muted-foreground">Nenhum jogador encontrado</p>
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

          {/* Team Colors — Collapsible */}
          <div className="mt-6 rounded-xl border border-border bg-card">
            <button
              type="button"
              onClick={() => setShowColors(!showColors)}
              className="flex w-full items-center justify-between p-4 text-left active:bg-secondary/50"
            >
              <h2 className="text-sm font-semibold text-foreground">Cores dos Times</h2>
              <svg
                className={cn("h-4 w-4 text-muted-foreground transition-transform", showColors && "rotate-180")}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showColors && (
              <div className="border-t border-border px-4 pb-4 pt-3">
                <div className="space-y-3">
                  {Array.from({ length: possibleTeams }).map((_, index) => {
                    const teamKey = `team_${index}`;
                    const config = teamColorsConfig[teamKey] ?? { base: AVAILABLE_COLORS[index % AVAILABLE_COLORS.length].value };
                    const styles = generateTeamStyles(config.base);

                    return (
                      <div key={teamKey} className="rounded-lg border border-border/80 bg-background/40 p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-foreground">Time {index + 1}</h3>
                          <div className={cn("rounded-md border px-2 py-0.5 text-xs font-medium", styles.border, styles.bg, styles.text)}>
                            Preview
                          </div>
                        </div>
                        <select
                          value={AVAILABLE_COLORS.some((color) => color.value === config.base) ? config.base : AVAILABLE_COLORS[0].value}
                          onChange={(e) => handleBaseColorChange(teamKey, e.target.value)}
                          className="h-11 w-full rounded-lg border bg-secondary px-3"
                        >
                          {AVAILABLE_COLORS.map((color) => (
                            <option key={color.value} value={color.value}>{color.label}</option>
                          ))}
                        </select>
                      </div>
                    );
                  })}
                </div>
                <Button onClick={handleSaveTeamColors} className="mt-3 h-11 w-full gap-2">
                  <Save className="h-4 w-4" />
                  Salvar Cores
                </Button>
              </div>
            )}
          </div>

          {/* Reset Button */}
          <div className="mt-6 mb-4">
            <Button
              variant="outline"
              onClick={resetToDefault}
              className="h-11 w-full gap-2 bg-transparent text-muted-foreground"
            >
              <RotateCcw className="h-4 w-4" />
              Resetar Lista de Jogadores
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
