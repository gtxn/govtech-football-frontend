import axios from "axios";
import config from "../config";
import getSessionToken from "../utils/getSessionToken";
import { Team } from "../utils/schema";

const apiUrl = config.API_ENDPOINT;

const updateTeamsApi = async (teamsToAdd: any) => {
  let formattedTeams: Array<Team>;
  try {
    formattedTeams = teamsToAdd.map((team: any) => {
      let [dateTmp, monthTmp] = team.date_registered.split("/");

      let date = parseInt(dateTmp);
      let month = parseInt(monthTmp);
      if (date > 31 || month > 12 || month < 1 || date < 1) {
        throw `Invalid date ${date}/${month} for team ${team.team_name}`;
      }

      return {
        ...team,
        date_registered: new Date(`${month}/${date}/2024`).getTime(),
      };
    });
  } catch (e) {
    return {
      success: false,
      data: e,
    };
  }

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
