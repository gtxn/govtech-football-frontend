import { Match2Player, Team } from "./schema";

// Extract matches from team data
export const getMatches = (teams: Array<Team>) => {
  let matches: Array<Match2Player> = [];

  let teamsTmp = [...teams];
  teamsTmp
    .sort((teama, teamb) =>
      teama.team_name.localeCompare(teamb.team_name, "en")
    )
    .forEach((team) => {
      team.match_history?.forEach(
        ({ goals_scored, goals_opponent_scored, opponent_name }) => {
          let match = {
            team1_name: team.team_name,
            team2_name: opponent_name,
            team1_goals: goals_scored,
            team2_goals: goals_opponent_scored,
          };

          if (
            !matches.find(
              (matchA) =>
                matchA.team1_name === match.team2_name &&
                matchA.team2_name === match.team1_name
            )
          ) {
            matches.push(match);
          }
        }
      );
    });

  return matches.sort((match1, match2) =>
    match1.team1_name.localeCompare(match2.team1_name, "en", { numeric: true })
  );
};

// Get matches from text
export const matchTextToData = (matchText: string) => {
  let matchDataText = matchText.split("\n");
  let matchData: Array<Match2Player> = matchDataText.map((text: string) => {
    let [team1, team2, team1Goals, team2Goals] = text.trim().split(" ");
    return {
      team1_name: team1,
      team2_name: team2,
      team1_goals: parseInt(team1Goals),
      team2_goals: parseInt(team2Goals),
    };
  });

  return matchData;
};
