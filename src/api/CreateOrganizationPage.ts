import { IOrganization } from "../interfaces/Organizations";
import { BASE_URL, postRequest } from "./common";

export const createOrganization = async (organization: IOrganization) => {
  const url = `${BASE_URL}organizations`;
  const response = await postRequest(url, organization);
  if (!response) {
    return null;
  }
  return response;
};
