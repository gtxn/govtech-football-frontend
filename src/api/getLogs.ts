import axios from "axios";
import config from "../config";
import getSessionToken from "../utils/getSessionToken";

const apiUrl = config.API_ENDPOINT;

const getLogs = async () => {
  let r = await axios
    .get(`${apiUrl}/getLogs`, {
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

export default getLogs;
