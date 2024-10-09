import axios from "axios";
import config from "../config";
import getSessionToken from "../utils/getSessionToken";

const apiUrl = config.API_ENDPOINT;

const getAllSessionsInfo = async () => {
  let r = await axios
    .get(`${apiUrl}/getAllSessionInfo`, {
      headers: {
        Authorization: await getSessionToken(),
      },
    })
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

export default getAllSessionsInfo;
