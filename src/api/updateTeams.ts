import axios from "axios";
import config from "../config";
import { getSessionToken } from "../utils";
import { Team } from "../utils/schema";

const apiUrl = config.API_ENDPOINT;

const updateTeamsApi = async (teamsToAdd: any) => {
  let formattedTeams: Array<Team> = teamsToAdd.map((team: any) => {
    let [date, month] = team.date_registered.split("/");
    return {
      ...team,
      date_registered: new Date(`${month}/${date}/2024`).getTime(),
    };
  });

  let r = await axios
    .post(
      `${apiUrl}/updateTeams`,
      {
        teamsToAdd: formattedTeams,
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

export default updateTeamsApi;
