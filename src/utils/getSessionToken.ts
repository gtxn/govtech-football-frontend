import { fetchAuthSession } from "aws-amplify/auth";

const getSessionToken = async () => {
  const session = await fetchAuthSession();
  const bearer = session.tokens?.accessToken.toString();

  return bearer;
};

export default getSessionToken;
