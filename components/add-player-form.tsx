"use client";

import React from "react"

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
  const [level, setLevel] = useState<PlayerLevel>("peso3");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), level);
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <Input
        placeholder="Nome do jogador"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 bg-secondary"
      />
      <Select value={level} onValueChange={(v) => setLevel(v as PlayerLevel)}>
        <SelectTrigger className="w-full bg-secondary sm:w-44">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="peso1">S</SelectItem>
          <SelectItem value="peso2">A</SelectItem>
          <SelectItem value="peso3">B</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" disabled={!name.trim()} className="gap-2">
        <Plus className="h-4 w-4" />
        Adicionar
      </Button>
    </form>
  );
}
