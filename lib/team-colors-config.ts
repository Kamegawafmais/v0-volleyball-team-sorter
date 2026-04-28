import type { TeamColor } from "@/lib/players-data";

export type TeamBaseColorName =
  | "rosa"
  | "amarelo"
  | "laranja"
  | "magenta"
  | "verde"
  | "azul"
  | "vermelho"
  | "roxo"
  | "ciano"
  | "preto"
  | "branco";

export type TeamColorConfig = {
  base: TeamBaseColorName;
};

export type TeamColorsConfig = Record<TeamColor, TeamColorConfig>;

const STORAGE_KEY = "team-colors-config";

const baseColorMap: Record<TeamBaseColorName, string> = {
  rosa: "pink",
  amarelo: "yellow",
  laranja: "orange",
  magenta: "fuchsia",
  verde: "emerald",
  azul: "blue",
  vermelho: "red",
  roxo: "purple",
  ciano: "cyan",
  preto: "black",
  branco: "white",
};

export const teamBaseColorOptions: TeamBaseColorName[] = [
  "rosa",
  "amarelo",
  "laranja",
  "magenta",
  "verde",
  "azul",
  "vermelho",
  "roxo",
  "ciano",
  "preto",
  "branco",
];

export const defaultTeamColorsConfig: TeamColorsConfig = {
  rosa: { base: "rosa" },
  amarelo: { base: "amarelo" },
  laranja: { base: "laranja" },
  magenta: { base: "magenta" },
  verde: { base: "verde" },
  azul: { base: "azul" },
};

const resolveBaseColor = (base: string): TeamBaseColorName => {
  const lower = base.toLowerCase() as TeamBaseColorName;
  return teamBaseColorOptions.includes(lower) ? lower : "azul";
};

export const generateTeamStyles = (baseColorName: string) => {
  const resolvedBase = resolveBaseColor(baseColorName);
  const base = baseColorMap[resolvedBase];

  if (base === "black") {
    return {
      bg: "bg-black/20",
      border: "border-black/40",
      text: "text-neutral-200",
      accent: "bg-black",
    };
  }

  if (base === "white") {
    return {
      bg: "bg-white/20",
      border: "border-white/40",
      text: "text-white",
      accent: "bg-white",
    };
  }

  return {
    bg: `bg-${base}-500/10`,
    border: `border-${base}-500/30`,
    text: `text-${base}-400`,
    accent: `bg-${base}-500`,
  };
};

const mergeWithDefault = (partial?: Partial<TeamColorsConfig> | null): TeamColorsConfig => {
  const base = defaultTeamColorsConfig;

  return {
    rosa: { base: resolveBaseColor(partial?.rosa?.base ?? base.rosa.base) },
    amarelo: { base: resolveBaseColor(partial?.amarelo?.base ?? base.amarelo.base) },
    laranja: { base: resolveBaseColor(partial?.laranja?.base ?? base.laranja.base) },
    magenta: { base: resolveBaseColor(partial?.magenta?.base ?? base.magenta.base) },
    verde: { base: resolveBaseColor(partial?.verde?.base ?? base.verde.base) },
    azul: { base: resolveBaseColor(partial?.azul?.base ?? base.azul.base) },
  };
};

export const getTeamColorsConfig = (): TeamColorsConfig => {
  if (typeof window === "undefined") return defaultTeamColorsConfig;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultTeamColorsConfig;

  try {
    return mergeWithDefault(JSON.parse(raw) as Partial<TeamColorsConfig>);
  } catch {
    return defaultTeamColorsConfig;
  }
};

export const saveTeamColorsConfig = (config: TeamColorsConfig): void => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mergeWithDefault(config)));
};
