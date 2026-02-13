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

  // Calcular quantos times completos podemos formar
  // Cada time precisa: 1 capitão, 3 intermediários, 2 iniciantes
  const maxTeamsBycapitaes = capitaes.length;
  const maxTeamsByIntermediarios = Math.floor(intermediarios.length / 3);
  const maxTeamsByIniciantes = Math.floor(iniciantes.length / 2);

  const numberOfTeams = Math.min(
    maxTeamsBycapitaes,
    maxTeamsByIntermediarios,
    maxTeamsByIniciantes,
    teamColors.length // Máximo de 6 times (cores disponíveis)
  );

  if (numberOfTeams === 0) {
    return {
      error: `Jogadores insuficientes para formar times. 
      Necessário por time: 1 S, 3 A, 2 B.
      Disponíveis: ${capitaes.length} S, ${intermediarios.length} A, ${iniciantes.length} B.`,
    };
  }

  // Embaralhar jogadores
  const shuffledcapitaes = shuffleArray(capitaes);
  const shuffledIntermediarios = shuffleArray(intermediarios);
  const shuffledIniciantes = shuffleArray(iniciantes);

  // Embaralhar cores
  const shuffledColors = shuffleArray(teamColors).slice(0, numberOfTeams);

  // Formar times
  const teams: Team[] = [];

  for (let i = 0; i < numberOfTeams; i++) {
    const teamPlayers: Player[] = [
      shuffledcapitaes[i],
      shuffledIntermediarios[i * 3],
      shuffledIntermediarios[i * 3 + 1],
      shuffledIntermediarios[i * 3 + 2],
      shuffledIniciantes[i * 2],
      shuffledIniciantes[i * 2 + 1],
    ];

    teams.push({
      color: shuffledColors[i],
      players: teamPlayers,
    });
  }

  return teams;
}

export function getPlayersNotInTeams(activePlayers: Player[], teams: Team[]): Player[] {
  const playersInTeams = new Set(teams.flatMap((t) => t.players.map((p) => p.id)));
  return activePlayers.filter((p) => !playersInTeams.has(p.id));
}
