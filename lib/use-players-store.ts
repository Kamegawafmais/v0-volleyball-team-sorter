"use client";

import { useSyncExternalStore } from "react";
import type { Player, PlayerLevel, Team } from "./players-data";
import { initialPlayersDatabase } from "./players-data";
import { sortTeams } from "./team-sorter";

const STORAGE_KEY = "volei-players";
const TEAMS_KEY = "volei-teams";

type Listener = () => void;

// Cached snapshots to avoid infinite loops with useSyncExternalStore
let playersSnapshot: Player[] = initialPlayersDatabase;
let teamsSnapshot: Team[] = [];
let activePlayersSnapshot: Player[] = initialPlayersDatabase.filter((p) => p.active);

class PlayersStore {
  private players: Player[] = initialPlayersDatabase;
  private teams: Team[] = [];
  private listeners = new Set<Listener>();
  private initialized = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.loadFromStorage();
    }
  }

  private loadFromStorage() {
    if (this.initialized) return;
    this.initialized = true;
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.players = JSON.parse(stored);
      } else {
        this.players = initialPlayersDatabase;
        this.saveToStorage();
      }

      const storedTeams = localStorage.getItem(TEAMS_KEY);
      if (storedTeams) {
        this.teams = JSON.parse(storedTeams);
      }
      
      this.updateSnapshots();
    } catch {
      this.players = initialPlayersDatabase;
      this.updateSnapshots();
    }
  }

  private updateSnapshots() {
    playersSnapshot = this.players;
    teamsSnapshot = this.teams;
    activePlayersSnapshot = this.players.filter((p) => p.active);
  }

  private saveToStorage() {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.players));
    }
  }

  private saveTeamsToStorage() {
    if (typeof window !== "undefined") {
      localStorage.setItem(TEAMS_KEY, JSON.stringify(this.teams));
    }
  }

  private emit() {
    this.updateSnapshots();
    for (const listener of this.listeners) {
      listener();
    }
  }

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getPlayersSnapshot = () => playersSnapshot;
  getTeamsSnapshot = () => teamsSnapshot;
  getActivePlayersSnapshot = () => activePlayersSnapshot;

  addPlayer(name: string, level: PlayerLevel) {
    const newPlayer: Player = {
      id: Date.now().toString(),
      name,
      level,
      active: true,
    };
    this.players = [...this.players, newPlayer];
    this.saveToStorage();
    this.emit();
  }

  removePlayer(id: string) {
    this.players = this.players.filter((p) => p.id !== id);
    this.saveToStorage();
    this.emit();
  }

  togglePlayerActive(id: string) {
    this.players = this.players.map((p) =>
      p.id === id ? { ...p, active: !p.active } : p
    );
    this.saveToStorage();
    this.emit();
  }

  updatePlayerLevel(id: string, level: PlayerLevel) {
    this.players = this.players.map((p) =>
      p.id === id ? { ...p, level } : p
    );
    this.saveToStorage();
    this.emit();
  }

  sortTeams() {
    const activePlayers = this.players.filter((p) => p.active);
    const result = sortTeams(activePlayers);

    if ("error" in result) {
      return result;
    }

    this.teams = result;
    this.saveTeamsToStorage();
    this.emit();
    return { teams: result };
  }

  clearTeams() {
    this.teams = [];
    this.saveTeamsToStorage();
    this.emit();
  }

  resetToDefault() {
    this.players = initialPlayersDatabase;
    this.teams = [];
    this.saveToStorage();
    this.saveTeamsToStorage();
    this.emit();
  }
}

const store = new PlayersStore();

const serverSnapshot = {
  players: initialPlayersDatabase,
  teams: [] as Team[],
  activePlayers: initialPlayersDatabase.filter((p) => p.active),
};

export function usePlayersStore() {
  const players = useSyncExternalStore(
    store.subscribe,
    store.getPlayersSnapshot,
    () => serverSnapshot.players
  );

  const teams = useSyncExternalStore(
    store.subscribe,
    store.getTeamsSnapshot,
    () => serverSnapshot.teams
  );

  const activePlayers = useSyncExternalStore(
    store.subscribe,
    store.getActivePlayersSnapshot,
    () => serverSnapshot.activePlayers
  );

  return {
    players,
    teams,
    activePlayers,
    addPlayer: (name: string, level: PlayerLevel) => store.addPlayer(name, level),
    removePlayer: (id: string) => store.removePlayer(id),
    togglePlayerActive: (id: string) => store.togglePlayerActive(id),
    updatePlayerLevel: (id: string, level: PlayerLevel) => store.updatePlayerLevel(id, level),
    sortTeams: () => store.sortTeams(),
    clearTeams: () => store.clearTeams(),
    resetToDefault: () => store.resetToDefault(),
  };
}
