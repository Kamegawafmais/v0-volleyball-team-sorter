"use client";

import { Crown, Star, User } from "lucide-react";
import type { Team } from "@/lib/players-data";
import { teamColorLabels, levelLabels } from "@/lib/players-data";
import { cn } from "@/lib/utils";

interface TeamCardProps {
  team: Team;
  index: number;
}

const colorStyles: Record<string, { bg: string; border: string; text: string; accent: string }> = {
  rosa: {
    bg: "bg-pink-500/10",
    border: "border-pink-500/30",
    text: "text-pink-400",
    accent: "bg-pink-500",
  },
  amarelo: {
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    text: "text-yellow-400",
    accent: "bg-yellow-500",
  },
  laranja: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    text: "text-orange-400",
    accent: "bg-orange-500",
  },
  magenta: {
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-500/30",
    text: "text-fuchsia-400",
    accent: "bg-fuchsia-500",
  },
  verde: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    accent: "bg-emerald-500",
  },
  azul: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-400",
    accent: "bg-blue-500",
  },
};

const levelIcons = {
  peso1: Crown,
  peso2: Star,
  peso3: User,
};

export function TeamCard({ team, index }: TeamCardProps) {
  const styles = colorStyles[team.color];

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
