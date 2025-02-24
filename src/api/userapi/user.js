import { getApi } from "../api";

export const getUserProfileDetails = async () => {
  try {
    const result = await getApi("https://api.upstox.com/v2/user/profile");
    return result;
  } catch (e) {
  } finally {
  }
};

export const getFundAvailablity = async () => {
  try {
    const result = await getApi(
      "https://api.upstox.com/v2/user/get-funds-and-margin"
    );
    return result;
  } catch (e) {
  } finally {
  }
};
