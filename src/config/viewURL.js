import axios from "axios";
import { serverURL } from "./serverURL";

const viewURL = axios.create({
  baseURL: serverURL + "/view",
});

export default viewURL;
