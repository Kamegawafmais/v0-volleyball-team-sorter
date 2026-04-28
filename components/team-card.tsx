"use client";

import { Crown, Star, User } from "lucide-react";
import type { Team } from "@/lib/players-data";
import { teamColorLabels, levelLabels } from "@/lib/players-data";
import { defaultTeamColorsConfig, generateTeamStyles, getTeamColorsConfig } from "@/lib/team-colors-config";
import { cn } from "@/lib/utils";

interface TeamCardProps {
  team: Team;
  index: number;
}

const levelIcons = {
  peso1: Crown,
  peso2: Star,
  peso3: User,
};

export function TeamCard({ team, index }: TeamCardProps) {
  const config = getTeamColorsConfig();
  const base = config[team.color]?.base ?? defaultTeamColorsConfig[team.color].base;
  const styles = generateTeamStyles(base);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border-2 transition-all hover:scale-[1.02]",
        styles.border,
        styles.bg
      )}
    >
      {/* Header */}
      <div className={cn("flex items-center justify-between p-4", styles.accent)}>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-lg font-bold text-white">
            {index + 1}
          </span>
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wide text-white">
              Time {teamColorLabels[team.color]}
            </h3>
            <p className="text-sm text-white/80">{team.players.length} jogadores</p>
          </div>
        </div>
      </div>

      {/* Players */}
      <div className="divide-y divide-border/50 p-2">
        {team.players.map((player) => {
          const Icon = levelIcons[player.level];
          return (
            <div
              key={player.id}
              className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-white/5"
            >
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg",
                  player.level === "peso1"
                    ? "bg-primary/20 text-primary"
                    : player.level === "peso2"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-emerald-500/20 text-emerald-400"
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{player.name}</p>
                <p className="text-xs text-muted-foreground">{levelLabels[player.level]}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
