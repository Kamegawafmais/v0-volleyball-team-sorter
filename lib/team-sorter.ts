import type { Player, Team, TeamColor } from "./players-data";
import { teamColors } from "./players-data";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function sortTeams(activePlayers: Player[]): Team[] | { error: string } {
  // Separar jogadores por nível
  const capitaes = activePlayers.filter((p) => p.level === "peso1");
  const intermediarios = activePlayers.filter((p) => p.level === "peso2");
  const iniciantes = activePlayers.filter((p) => p.level === "peso3");
  const avancados = activePlayers.filter((p) => p.level === "peso4");

  // Calcular quantos times completos podemos formar
  // Cada time precisa: 1 capitão, 2 intermediários, 1 iniciante, 2 avançados
  const maxTeamsBycapitaes = capitaes.length;
  const maxTeamsByIntermediarios = Math.floor(intermediarios.length / 2);
  const maxTeamsByIniciantes = iniciantes.length;
  const maxTeamsByAvancados = Math.floor(avancados.length / 2);

  const numberOfTeams = Math.min(
    maxTeamsBycapitaes,
    maxTeamsByIntermediarios,
    maxTeamsByIniciantes,
    maxTeamsByAvancados
  );

  if (numberOfTeams === 0) {
    return {
      error: `Jogadores insuficientes para formar times. 
      Necessário por time: 1 S, 2 A, 1 B, 2 C.
      Disponíveis: ${capitaes.length} S, ${intermediarios.length} A, ${iniciantes.length} B, ${avancados.length} C.`,
    };
  }

  // Embaralhar jogadores
  const shuffledcapitaes = shuffleArray(capitaes);
  const shuffledIntermediarios = shuffleArray(intermediarios);
  const shuffledIniciantes = shuffleArray(iniciantes);
  const shuffledAvancados = shuffleArray(avancados);

  // Embaralhar cores
  const shuffledColors = shuffleArray(teamColors);

  // Formar times
  const teams: Team[] = [];

  for (let i = 0; i < numberOfTeams; i++) {
    const teamPlayers: Player[] = [
      shuffledcapitaes[i],
      shuffledIntermediarios[i * 2],
      shuffledIntermediarios[i * 2 + 1],
      shuffledIniciantes[i],
      shuffledAvancados[i * 2],
      shuffledAvancados[i * 2 + 1],
    ];

    teams.push({
      color: shuffledColors[i % shuffledColors.length],
      players: teamPlayers,
    });
  }

  return teams;
}

export function getPlayersNotInTeams(activePlayers: Player[], teams: Team[]): Player[] {
  const playersInTeams = new Set(teams.flatMap((t) => t.players.map((p) => p.id)));
  return activePlayers.filter((p) => !playersInTeams.has(p.id));
}
