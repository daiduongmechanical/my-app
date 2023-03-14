import axios from "axios";
import { serverURL } from "./serverURL";

const adminURL = axios.create({
  baseURL: serverURL + "/admin",
});

export default adminURL;
