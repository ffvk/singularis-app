import axios from "axios";
import { API_BASE_URL } from "../../../service/config/ApiConfig";

export const loginWithEmailAPI = async (payload: {
  email: string;
  password: string;
  realm: string;
}) => {

    const { realm, ...body } = payload;
  const { data } = await axios.post(
    `${API_BASE_URL}auth/tokens/${realm}/login`,
    body
  );
  return data; // { token, role }
};
