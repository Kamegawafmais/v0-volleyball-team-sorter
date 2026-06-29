"use client";

import { Trash2, User } from "lucide-react";
import type { Player, PlayerLevel } from "@/lib/players-data";
import { levelLabels } from "@/lib/players-data";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface PlayerCardProps {
  player: Player;
  onToggleActive: (id: string) => void;
  onRemove: (id: string) => void;
  onUpdateLevel: (id: string, level: PlayerLevel) => void;
}

const levelColors: Record<PlayerLevel, string> = {
  peso1: "bg-primary/20 text-primary border-primary/30",
  peso2: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  peso3: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  peso4: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

export function PlayerCard({
  player,
  onToggleActive,
  onRemove,
  onUpdateLevel,
}: PlayerCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-3 transition-all",
        player.active
          ? "border-border"
          : "border-border/50 opacity-50"
      )}
    >
      {/* Top Row: Toggle + Name + Level Badge */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onToggleActive(player.id)}
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 transition-colors active:scale-95",
            player.active
              ? "border-primary bg-primary/10 text-primary"
              : "border-muted bg-muted text-muted-foreground"
          )}
        >
          <User className="h-5 w-5" />
        </button>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className={cn("truncate font-medium", !player.active && "line-through")}>
            {player.name}
          </span>
          <span
            className={cn(
              "inline-flex w-fit rounded-md border px-2 py-0.5 text-xs font-medium",
              levelColors[player.level]
            )}
          >
            {levelLabels[player.level]}
          </span>
        </div>
      </div>

      {/* Bottom Row: Level Select + Delete */}
      <div className="mt-2 flex items-center gap-2 pl-14">
        <Select
          value={player.level}
          onValueChange={(value) => onUpdateLevel(player.id, value as PlayerLevel)}
        >
          <SelectTrigger className="h-10 flex-1 bg-secondary">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="peso1">S</SelectItem>
            <SelectItem value="peso2">A</SelectItem>
            <SelectItem value="peso3">B</SelectItem>
            <SelectItem value="peso4">C</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(player.id)}
          className="h-10 w-10 shrink-0 text-muted-foreground active:bg-destructive/10 active:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Remover jogador</span>
        </Button>
      </div>
    </div>
  );
}
