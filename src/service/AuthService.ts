import axios from "axios";
import { API_BASE_URL } from "./config/ApiConfig";
import { headers } from "./config/base";



  export const getAllOrganizations = async () => {
    return axios.get(
      `https://devapi.singulariswow.com/auth/tenants`,
      // { headers: headers() }
    );
  };