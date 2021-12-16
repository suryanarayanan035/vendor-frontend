import axios, { AxiosRequestConfig } from "axios";
export const BASE_URL = "http://localhost:9999/api/";
const commonHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
};
export const getRequest = async (
  url: string,
  config: AxiosRequestConfig<any> = {}
) => {
  try {
    const response = await axios.get(url, {
      ...config,
      headers: { ...config?.headers, ...commonHeaders },
    });
    if (!response) {
      return null;
    }
    return response;
  } catch (error) {
    console.error(`Error occured in get request Url:${url}`);
    return null;
  }
};

export const postRequest = async (
  url: string,
  data: any,
  config: AxiosRequestConfig<any> = {}
) => {
  try {
    const response = await axios.post(url, data, {
      ...config,
      headers: { ...config?.headers, ...commonHeaders },
    });
    if (!response) {
      return null;
    }
    return response;
  } catch (error) {
    console.error(`Error occured in post request Url:${url}`, error);

    return null;
  }
};
