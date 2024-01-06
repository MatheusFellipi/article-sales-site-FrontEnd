import axios, { AxiosResponse } from "axios";
import { parseCookies } from "nookies";

export type ResponseType<T> = Promise<AxiosResponse<T>>;

const BASE_URL = "http://localhost:3333/";

const Api = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
  });

  instance.interceptors.request.use(async function (config) {
    const { ["togdesign:token"]: token } = parseCookies();
    config.headers.Authorization = "Bearer " + token;
    return config;
  });

  instance.interceptors.response.use(
    (config) => config,
    (error) => {
      const message = error.response.data.message;
      if (!message) return;
      return Promise.reject(error);
    }
  );

  return instance;
};

export default Api();
