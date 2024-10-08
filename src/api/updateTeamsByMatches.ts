import axios from "axios";
import config from "../config";
import { getSessionToken } from "../utils";
import { Match2Player } from "../utils/schema";

const apiUrl = config.API_ENDPOINT;

const updateTeamsByMatchesApi = async (
  teams: any,
  matches: Array<Match2Player>
) => {
  // Format date registered if needed
  let teamDataToUpdate = teams.map((team: any) => {
    if (typeof team.date_registered === "string") {
      let [date, month] = team.date_registered.split("/");
      return {
        ...team,
        date_registered: new Date(`${month}/${date}/2024`).getTime(),
      };
    }
    return team;
  });

  let r = await axios
    .post(
      `${apiUrl}/updateTeamsByMatches`,
      {
        teams: teamDataToUpdate,
        matches,
      },
      {
        headers: {
          Authorization: await getSessionToken(),
        },
      }
    )
    .then((r) => {
      return r;
    })
    .catch((e) => {
      return {
        success: false,
        data: e,
      };
    });
  return r;
};

export default updateTeamsByMatchesApi;
