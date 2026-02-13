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
        "group flex items-center justify-between gap-3 rounded-xl border bg-card p-4 transition-all",
        player.active
          ? "border-border"
          : "border-border/50 opacity-50"
      )}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onToggleActive(player.id)}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg border-2 transition-colors",
            player.active
              ? "border-primary bg-primary/10 text-primary"
              : "border-muted bg-muted text-muted-foreground"
          )}
        >
          <User className="h-5 w-5" />
        </button>
        <div className="flex flex-col">
          <span className={cn("font-medium", !player.active && "line-through")}>
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

      <div className="flex items-center gap-2">
        <Select
          value={player.level}
          onValueChange={(value) => onUpdateLevel(player.id, value as PlayerLevel)}
        >
          <SelectTrigger className="w-36 bg-secondary">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="peso1">S</SelectItem>
            <SelectItem value="peso2">A</SelectItem>
            <SelectItem value="peso3">B</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(player.id)}
          className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Remover jogador</span>
        </Button>
      </div>
    </div>
  );
}
