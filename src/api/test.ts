import axios from "axios";
import config from "../config";
import { getSessionToken } from "../utils";

const apiUrl = config.API_ENDPOINT;

const testApi = async () => {
  await axios
    .get(`${apiUrl}/logged`, {
      headers: {
        Authorization: await getSessionToken(),
      },
    })
    .then((r) => {
      console.log(r);
    })
    .catch((e) => {
      console.log("err");
      console.log();
    });
};

export default testApi;
