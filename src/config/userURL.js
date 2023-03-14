import axios from "axios";
import { serverURL } from "./serverURL";

const userURL = axios.create({
  baseURL: serverURL,
});

export default userURL;
