export type TeamColorConfig = {
  base: string;
};

export type TeamColorsConfig = Record<string, TeamColorConfig>;

const STORAGE_KEY = "team-colors-config";

const defaultBaseColors = ["red", "blue", "emerald", "yellow", "purple", "orange"];

export const createDefaultTeamColorsConfig = (teamCount = 6): TeamColorsConfig => {
  return Object.fromEntries(
    Array.from({ length: teamCount }).map((_, index) => [
      `team_${index}`,
      { base: defaultBaseColors[index % defaultBaseColors.length] },
    ])
  );
};

export const defaultTeamColorsConfig: TeamColorsConfig = createDefaultTeamColorsConfig();

const mergeWithDefault = (partial?: Partial<TeamColorsConfig> | null): TeamColorsConfig => {
  const merged: TeamColorsConfig = { ...defaultTeamColorsConfig };

  for (const [key, value] of Object.entries(partial ?? {})) {
    if (value?.base) merged[key] = { base: value.base };
  }

  return merged;
};

export const generateTeamStyles = (base: string) => {
  if (base === "white") {
    return {
      bg: "bg-gray-100",
      border: "border-gray-300",
      text: "text-gray-800",
      accent: "bg-gray-200",
    };
  }

  if (base === "black") {
    return {
      bg: "bg-gray-900/80",
      border: "border-gray-700",
      text: "text-gray-100",
      accent: "bg-gray-800",
    };
  }

  return {
    bg: `bg-${base}-500/10`,
    border: `border-${base}-500/30`,
    text: `text-${base}-400`,
    accent: `bg-${base}-500`,
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
