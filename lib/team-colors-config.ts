import type { TeamColor } from "@/lib/players-data";

export type TeamColorConfig = {
  base: string;
};

export type TeamColorsConfig = Record<TeamColor, TeamColorConfig>;

const STORAGE_KEY = "team-colors-config";

export const defaultTeamColorsConfig: TeamColorsConfig = {
  rosa: { base: "pink" },
  amarelo: { base: "yellow" },
  laranja: { base: "orange" },
  magenta: { base: "fuchsia" },
  verde: { base: "emerald" },
  azul: { base: "blue" },
};

export const generateTeamStyles = (base: string) => {
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
    rosa: { ...base.rosa, ...(partial?.rosa ?? {}) },
    amarelo: { ...base.amarelo, ...(partial?.amarelo ?? {}) },
    laranja: { ...base.laranja, ...(partial?.laranja ?? {}) },
    magenta: { ...base.magenta, ...(partial?.magenta ?? {}) },
    verde: { ...base.verde, ...(partial?.verde ?? {}) },
    azul: { ...base.azul, ...(partial?.azul ?? {}) },
  };
};

export const getTeamColorsConfig = (): TeamColorsConfig => {
  if (typeof window === "undefined") {
    return defaultTeamColorsConfig;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return defaultTeamColorsConfig;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<TeamColorsConfig>;
    return mergeWithDefault(parsed);
  } catch {
    return defaultTeamColorsConfig;
  }
};

export const saveTeamColorsConfig = (config: TeamColorsConfig): void => {
  if (typeof window === "undefined") {
    return;
  }

  const mergedConfig = mergeWithDefault(config);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedConfig));
};
