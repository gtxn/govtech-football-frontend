import { Team } from "./schema";

export const formatTeamsForDisplay = (teams: Array<Team>) => {
  return teams.map((team: any) => {
    const { date_registered, ...teamWithoutDate } = team;

    return {
      rank: team.rank,
      team_name: team.team_name,
      group_number: team.group_number,
      date_registered: `${new Date(team.date_registered).getDate()}/${
        new Date(team.date_registered).getMonth() + 1
      }`,
      ...teamWithoutDate,
    };
  });
};

export const sortTeams = (teamsArr: Array<Team>) => {
  let sortedTeamsArr = [...teamsArr];

  // If already processed matches
  if (teamsArr[0] && (teamsArr[0].num_wins === 0 || teamsArr[0].num_wins)) {
    sortedTeamsArr.sort((teamA, teamB) => {
      // 1st test
      if (
        (teamA?.num_wins === 0 || teamA?.num_wins) &&
        (teamA?.num_draws === 0 || teamA?.num_draws) &&
        (teamB?.num_draws === 0 || teamB.num_draws) &&
        (teamB?.num_wins === 0 || teamB.num_wins)
      ) {
        let teamAPoints = teamA.num_wins * 3 + teamA.num_draws;
        let teamBPoints = teamB.num_wins * 3 + teamB.num_draws;

        if (teamAPoints !== teamBPoints) {
          return teamBPoints - teamAPoints;
        }
      }

      // 2nd test
      if (
        (teamA?.total_goals || teamA?.total_goals === 0) &&
        (teamB?.total_goals || teamB?.total_goals === 0)
      ) {
        if (teamA?.total_goals - teamB?.total_goals != 0) {
          return teamB?.total_goals - teamA?.total_goals;
        }
      }

      // 3rd test
      if (
        (teamA?.num_wins === 0 || teamA?.num_wins) &&
        (teamA?.num_draws === 0 || teamA?.num_draws) &&
        (teamA?.num_losses === 0 || teamA?.num_losses) &&
        (teamB?.num_wins === 0 || teamB.num_wins) &&
        (teamB?.num_draws === 0 || teamB.num_draws) &&
        (teamB?.num_losses === 0 || teamB?.num_losses)
      ) {
        let teamAPoints =
          teamA?.num_wins * 5 + teamA?.num_draws * 3 - teamA?.num_losses;
        let teamBPoints =
          teamB?.num_wins * 5 + teamB?.num_draws * 3 - teamB?.num_losses;

        if (teamAPoints !== teamBPoints) {
          return teamBPoints - teamAPoints;
        }
      }

      // 4th test
      return teamA.date_registered - teamB.date_registered;
    });

    return sortedTeamsArr.map((team, i) => ({
      ...team,
      rank: i + 1,
    }));
  } else {
    return teamsArr;
  }
};
