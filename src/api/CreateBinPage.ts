import { BASE_URL, postRequest } from "./common";

export const createBin = async (data: any) => {
  const url = `${BASE_URL}bins`;
  const response = await postRequest(url, data);
  if (!response) {
    return false;
  }

  return response;
};
