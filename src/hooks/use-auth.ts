import request from "../config/request";
import { API_ENDPOINTS } from "../constants/endpoints";
import useGlobalMutation from "./useGlobalMutation";

type LogInCred = {
  username: string;
  password: string;
};

export const useLogIn = () => {
  return useGlobalMutation({
    mutationFn: (credentials: LogInCred) =>
      request({
        url: API_ENDPOINTS.login,
        method: "POST",
        data: credentials,
      }),
  });
};

export const useLogOut = () => {
  return useGlobalMutation({
    mutationFn: () =>
      request({
        url: API_ENDPOINTS.logout,
      }),
  });
};
