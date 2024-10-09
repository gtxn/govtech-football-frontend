import axios from "axios";
import config from "../config";
import getSessionToken from "../utils/getSessionToken";

const apiUrl = config.API_ENDPOINT;

const newTeamsApi = async (teamsToAdd: any) => {
  let r = await axios
    .post(
      `${apiUrl}/newTeams`,
      {
        teamsToAdd,
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

export default newTeamsApi;
