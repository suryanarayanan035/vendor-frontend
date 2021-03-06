import { BASE_URL, getRequest } from "./common";

export const fetchOrganizations = async (abortController?: AbortSignal) => {
  const url = `${BASE_URL}organizations`;
  const response = await getRequest(url, {}, abortController);
  console.log(response);
  if (!response) {
    return null;
  }
  return response.data;
};
