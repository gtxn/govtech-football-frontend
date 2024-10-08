import axios from "axios";
import config from "../config";
import { getSessionToken } from "../utils";

const apiUrl = config.API_ENDPOINT;

const clearTeamsBySession = async (sessionId: string) => {
  let r = await axios
    .post(
      `${apiUrl}/clearTeamsBySession`,
      {
        session_id: sessionId,
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

export default clearTeamsBySession;
