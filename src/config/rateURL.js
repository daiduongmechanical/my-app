import axios from "axios";
import { serverURL } from "./serverURL";

const rateURL = axios.create({
  baseURL: serverURL + "/rate",
});

export default rateURL;
