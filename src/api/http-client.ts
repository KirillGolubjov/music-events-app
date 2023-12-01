import axios, { AxiosResponse } from "axios";

export type HttpResponseType<T> = Promise<AxiosResponse<T>>;

export const httpCommon = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
  params: {
    apikey: import.meta.env.VITE_API_KEY,
  },
});
