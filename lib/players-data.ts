export type PlayerLevel = "peso1" | "peso2" | "peso3" | "peso4";

export type TeamColor = "rosa" | "amarelo" | "laranja" | "magenta" | "verde" | "azul";

export interface Player {
  id: string;
  name: string;
  level: PlayerLevel;
  active: boolean;
}

export interface Team {
  color: TeamColor;
  players: Player[];
}

// Base de dados inicial de jogadores
export const initialPlayersDatabase: Player[] = [];


export const teamColors: TeamColor[] = ["rosa", "amarelo", "laranja", "magenta", "verde", "azul"];

export const levelLabels: Record<PlayerLevel, string> = {
  peso1: "S",
  peso2: "A",
  peso3: "B",
  peso4: "C",
};

export const teamColorLabels: Record<TeamColor, string> = {
  rosa: "Rosa",
  amarelo: "Amarelo",
  laranja: "Laranja",
  magenta: "Magenta",
  verde: "Verde",
  azul: "Azul",
};

export const teamColorClasses: Record<TeamColor, { bg: string; border: string; text: string }> = {
  rosa: { bg: "bg-team-rosa", border: "border-team-rosa", text: "text-team-rosa" },
  amarelo: { bg: "bg-team-amarelo", border: "border-team-amarelo", text: "text-team-amarelo" },
  laranja: { bg: "bg-team-laranja", border: "border-team-laranja", text: "text-team-laranja" },
  magenta: { bg: "bg-team-magenta", border: "border-team-magenta", text: "text-team-magenta" },
  verde: { bg: "bg-team-verde", border: "border-team-verde", text: "text-team-verde" },
  azul: { bg: "bg-team-azul", border: "border-team-azul", text: "text-team-azul" },
};
