"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { PlayerLevel } from "@/lib/players-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddPlayerFormProps {
  onAdd: (name: string, level: PlayerLevel) => void;
}

export function AddPlayerForm({ onAdd }: AddPlayerFormProps) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState<PlayerLevel>("peso4");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), level);
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        placeholder="Nome do jogador"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="h-11 bg-secondary"
      />
      <div className="flex gap-2">
        <Select value={level} onValueChange={(v) => setLevel(v as PlayerLevel)}>
          <SelectTrigger className="h-11 flex-1 bg-secondary">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="peso1">S</SelectItem>
            <SelectItem value="peso2">A</SelectItem>
            <SelectItem value="peso3">B</SelectItem>
            <SelectItem value="peso4">C</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" disabled={!name.trim()} className="h-11 gap-2 px-5">
          <Plus className="h-4 w-4" />
          Adicionar
        </Button>
      </div>
    </form>
  );
}
