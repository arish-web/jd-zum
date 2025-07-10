import axios from "./axiosInstance";

export const resetPassword = (token: string | undefined, password: string) => {
  return axios.post("/reset-password", { token, password });
};
