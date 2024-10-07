import { Team } from "./schema";

export const formatTeamsForDisplay = (teams: Array<Team>) => {
  return teams.map((team: any) => ({
    ...team,
    date_registered: `${new Date(team.date_registered).getDate()}/${
      new Date(team.date_registered).getMonth() + 1
    }`,
  }));
};

const teamArrToTeamObj = (teams: Array<Team>) => {
  let teamsObj: any = {};
  teams.forEach((team) => {
    teamsObj[team.team_name] = {
      rank: -1,
      ...team,
      num_wins: 0,
      num_losses: 0,
      num_draws: 0,
      total_goals: 0,
    };
  });

  return teamsObj;
};

const teamObjToTeamArray = (teams: any) => {
  return Object.values(teams);
};

export const updateTeamsBasedOnMatches = (
  teams: Array<Team>,
  matchDataText: any
) => {
  // Convert array to an object for more efficient algorithm
  let teamsObj = teamArrToTeamObj(teams);
  let teamsObjTmp = { ...teamsObj };

  // Go through each match and update the teams status accordingly
  matchDataText.forEach((text: string) => {
    let [team1, team2, team1Goals, team2Goals] = text.trim().split(" ");

    // Update match data
    teamsObjTmp[team1].match_history = [
      ...(teamsObjTmp[team1].match_history || []),
      {
        opponent_name: team2,
        goals_scored: team1Goals,
        goals_opponent_scored: team2Goals,
      },
    ];
    teamsObjTmp[team2].match_history = [
      ...(teamsObjTmp[team2].match_history || []),
      {
        opponent_name: team1,
        goals_scored: team2Goals,
        goals_opponent_scored: team1Goals,
      },
    ];

    // Update total goals
    teamsObjTmp[team1].total_goals += parseInt(team1Goals);
    teamsObjTmp[team2].total_goals += parseInt(team2Goals);

    // Update win loss draw count
    if (team1Goals > team2Goals) {
      teamsObjTmp[team1].num_wins += 1;
      teamsObjTmp[team2].num_losses += 1;
    } else if (team1Goals < team2Goals) {
      teamsObjTmp[team1].num_losses += 1;
      teamsObjTmp[team2].num_wins += 1;
    } else {
      teamsObjTmp[team1].num_draws += 1;
      teamsObjTmp[team2].num_draws += 1;
    }
  });

  // Convert object back to array
  return teamObjToTeamArray(teamsObjTmp);
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
          console.log(teamBPoints, teamAPoints);
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
