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
export const initialPlayersDatabase: Player[] = [
  { id: "1", name: "Lucas K.", level: "peso1", active: true },
  { id: "2", name: "Vinícius R.", level: "peso1", active: true },
  { id: "3", name: "Alexsander", level: "peso1", active: true },
  { id: "4", name: "Vinícius D.", level: "peso1", active: true },
  { id: "5", name: "João C.", level: "peso1", active: true },
  { id: "6", name: "Lara", level: "peso1", active: true },
  { id: "7", name: "João V.", level: "peso1", active: true },
  
  { id: "8", name: "Reinaldo", level: "peso2", active: true },
  { id: "9", name: "Bianca R.", level: "peso2", active: true },
  { id: "10", name: "Tais", level: "peso2", active: true },
  { id: "11", name: "Wilson", level: "peso2", active: true },
  { id: "12", name: "Erika", level: "peso2", active: true },
  { id: "13", name: "Camille", level: "peso2", active: true },
  { id: "14", name: "Yasmin", level: "peso2", active: true },
  { id: "15", name: "Leandro", level: "peso2", active: true },
  { id: "16", name: "Richard", level: "peso2", active: true },
  { id: "17", name: "Mateus", level: "peso2", active: true },
  { id: "18", name: "Vitor", level: "peso2", active: true },
  { id: "19", name: "Nathan", level: "peso2", active: true },
  { id: "20", name: "Sandra", level: "peso2", active: true },
  { id: "21", name: "Thomas", level: "peso2", active: true },
  { id: "22", name: "Helio", level: "peso2", active: true },
  { id: "23", name: "Thyago", level: "peso2", active: true },
  { id: "24", name: "Otávio", level: "peso2", active: true },
  { id: "25", name: "Natan", level: "peso2", active: true },
  { id: "26", name: "Leo", level: "peso2", active: true },
  { id: "27", name: "Cris", level: "peso2", active: true },
  { id: "28", name: "Loruan", level: "peso2", active: true },
  { id: "29", name: "Gabriel", level: "peso2", active: true },
  
  { id: "30", name: "Louise", level: "peso3", active: true },
  { id: "31", name: "Gaby", level: "peso3", active: true },
  { id: "32", name: "Ana", level: "peso3", active: true },
  { id: "33", name: "Adriano", level: "peso3", active: true },
  { id: "34", name: "Beah", level: "peso3", active: true },
  { id: "35", name: "Bianca", level: "peso3", active: true },
  { id: "36", name: "Katia", level: "peso3", active: true },
  { id: "37", name: "Isaque", level: "peso3", active: true },
  { id: "38", name: "Edna", level: "peso3", active: true },
  { id: "39", name: "Rafael", level: "peso3", active: true },
  { id: "40", name: "Daniel", level: "peso3", active: true },
  { id: "41", name: "Nicole", level: "peso3", active: true },
  { id: "42", name: "Barbara", level: "peso3", active: true },

  { id: "43", name: "Marina", level: "peso4", active: true },
  { id: "44", name: "Carlos", level: "peso4", active: true },
  { id: "45", name: "Fernanda", level: "peso4", active: true },
  { id: "46", name: "Igor", level: "peso4", active: true },
  { id: "47", name: "Patricia", level: "peso4", active: true },
  { id: "48", name: "Renan", level: "peso4", active: true },
];

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
