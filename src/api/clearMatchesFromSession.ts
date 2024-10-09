import axios from "axios";
import config from "../config";
import { getSessionToken } from "../utils";

const apiUrl = config.API_ENDPOINT;

const clearMatchesBySession = async (sessionId: string) => {
  let r = await axios
    .post(
      `${apiUrl}/clearMatchesBySessionId`,
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

export default clearMatchesBySession;
