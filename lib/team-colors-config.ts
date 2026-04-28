import type { TeamColor } from "@/lib/players-data";

export type TeamColorStyleConfig = {
  bg: string;
  border: string;
  text: string;
  accent: string;
};

export type TeamColorsConfig = Record<TeamColor, TeamColorStyleConfig>;

const STORAGE_KEY = "team-colors-config";

export const defaultTeamColorsConfig: TeamColorsConfig = {
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
