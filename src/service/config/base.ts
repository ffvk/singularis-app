import axios from "axios";
import { getCookie } from "../../utils/CookieHelper";

// import { getCookie } from "../utils/CookieHelper";



export const axiosInstance = axios.create({
  timeout: 40000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const headers = () => {
  console.log("access token")
  const token = getCookie("access_token");
  console.log("access token", token)


  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};
