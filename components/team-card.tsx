"use client";

import { Crown, Star, User } from "lucide-react";
import type { Team } from "@/lib/players-data";
import { levelLabels } from "@/lib/players-data";
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
  peso4: User,
};

const levelBadgeColors = {
  peso1: "bg-primary/20 text-primary",
  peso2: "bg-blue-500/20 text-blue-400",
  peso3: "bg-emerald-500/20 text-emerald-400",
  peso4: "bg-purple-500/20 text-purple-400",
};

export function TeamCard({ team, index }: TeamCardProps) {
  const config = getTeamColorsConfig();
  const teamKey = `team_${index}`;
  const base = config[teamKey]?.base ?? defaultTeamColorsConfig[teamKey]?.base ?? "blue";
  const styles = generateTeamStyles(base);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border-2",
        styles.border,
        styles.bg
      )}
    >
      {/* Header */}
      <div className={cn("flex items-center gap-3 p-4", styles.accent)}>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/20 text-lg font-bold text-white">
          {index + 1}
        </span>
        <div>
          <h3 className={cn("text-lg font-bold uppercase tracking-wide", styles.text)}>
            Time {index + 1}
          </h3>
          <p className={cn("text-sm opacity-80", styles.text)}>{team.players.length} jogadores</p>
        </div>
      </div>

      {/* Players */}
      <div className="divide-y divide-border/30 px-2 pb-2">
        {team.players.map((player) => {
          const Icon = levelIcons[player.level];
          return (
            <div
              key={player.id}
              className="flex items-center gap-3 px-2 py-3"
            >
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                  levelBadgeColors[player.level]
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-foreground">{player.name}</p>
              </div>
              <span className={cn(
                "shrink-0 rounded-md px-2 py-0.5 text-xs font-bold",
                levelBadgeColors[player.level]
              )}>
                {levelLabels[player.level]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
