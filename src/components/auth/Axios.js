import axios from "axios";
import { useSelector } from "react-redux";

export const instance = axios.create({
  baseURL: "https://some-domain.com/api/",
  headers: { Authorization: `bearer ${token}` },
});
